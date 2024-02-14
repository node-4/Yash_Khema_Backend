const User = require('../Models/User.js');
const wallet = require('../Models/Wallet.js');
const otp = require('../Models/Otp.js');
const userCard = require('../Models/Card.js');
const { generateToken } = require('../Helpers/Token');
const passwordHelper = require('../Helpers/Password');
const { generateOTP, verifyOTP } = require('../Helpers/Otp.js');
const { sendSms } = require('../Helpers/Sms.js');
const { ValidationError } = require('../Errors');
const emailHelper = require('../Helpers/Email');
exports.userMobileRegister = async (phoneNumber) => {
	try {
		const userExist = await User.findOne({ phone_number: phoneNumber, userType: "user" });
		if (userExist) {
			const otp = await generateOTP(4);
			userExist.otp = { magnitude: otp, type: 'registration' }
			await userExist.save();
			return userExist
		}
		const user = new User({ phone_number: phoneNumber, userType: "user" });
		const otp = await generateOTP(4);
		user.otp = { magnitude: otp, type: 'registration' };
		await user.save();
		await wallet.create({ user: user._id, user_type: "user" })
		return user
	} catch (error) {
		throw error;
	}
}
exports.userRegister = async (phoneNumber, name, password, location, vechicle) => {
	try {
		password = await passwordHelper.hashPassword(password, 10)
		const userExist = await User.findOne({ phone_number: phoneNumber, userType: "user" });
		if (userExist) {
			throw new ValidationError('user with phone number already exists');
		}
		const user = new User({ phone_number: phoneNumber, name: name, password: password, location: location, vechicle: vechicle, userType: "user" });
		const otp = await generateOTP(4);
		user.otp = { magnitude: otp, type: 'registration' }
		console.log("otp", otp)
		await user.save();
		await wallet.create({ user: user._id, user_type: "user" })
		// await sendSms({
		// 	body: `otp is: ${otp}`,
		// 	phoneNumber: `${user.country_code}${user.phone_number}`
		// })
		return user
	} catch (error) {
		throw error;
	}
}
exports.registrationOtpVerification = async (phoneNumber, otp) => {
	try {
		const user = await User.findOne({ phone_number: phoneNumber, userType: "user", "otp.magnitude": otp }).select("+otp");
		if (!user) {
			throw new ValidationError('invalid otp');
		}
		const isValidOtp = await verifyOTP({
			created: user.otp.created,
			magnitude: user.otp.magnitude,
			type: user.otp.type,
			reqOTPType: 'registration',
			userOTP: otp
		})
		if (!isValidOtp) {
			throw new ValidationError('invalid otp');
		}
		const token = await generateToken(user, 'login');
		return {
			loginToken: token,
			signupProcessCompleted: user.signup_process_complete,
			deliveryprefrencesCompleted: user.delivery_prefrences_completed
		};
	} catch (error) {
		throw error;
	}
}
exports.userCompleteRegistration = async (phoneNumber, name, location, email) => {
	try {
		const userExist = await User.findOne({ phone_number: phoneNumber, userType: "user" });
		if (userExist) {
			let result = await User.findOneAndUpdate({ _id: userExist._id }, { $set: { name: name, location: location, email: email, signup_process_complete: true } }, { new: true })
			if (result) {
				return result
			}
		} else {
			throw new ValidationError('user with phone number doest not exists');
		}
	} catch (error) {
		throw error;
	}
}
exports.userSignin = async (payload) => {
	try {
		const result = await User.findOne({ phone_number: payload.phone_number, userType: "user" });
		if (result) {
			const isValid = await passwordHelper.isValidPassword(
				payload.password,
				result.password
			);
			if (isValid) {
				const newToken = await generateToken(result._id, "login");
				console.log("result", result);
				return {
					success: true,
					status: 200,
					message: "Login successfully",
					data: result,
					access_token: newToken,
				};
			} else {
				return {
					success: false,
					status: 400,
					message: "Email or password is incorrect",
				};
			}
		} else {
			return {
				success: false,
				status: 404,
				message: "User Not Found",
			};
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};
exports.ForgetPassword = async (req, res) => {
	const { phone_number } = req.body;
	try {
		const user = await User.findOne({ phone_number }, { new: true });
		if (!user) {
			return res.status(404).json({ message: "Number not found" });
		}


		const otp = await generateOTP(6);

		user.otp = {
			magnitude: otp,
			type: "password_reset",
		};
		// user.otp = otp;
		await user.save();
		await sendSms({
			body: `otp is: ${otp}`,
			phoneNumber: `${user.country_code}${user.phone_number}`,
		});
		res.json({ message: "OTP sent successfully", otp: otp });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: error });
	}
};
exports.resetPasswordOTP = async (req, res) => {
	const { phone_number, otp, password } = req.body;

	try {
		const user = await User.findOne({ phone_number, otp: otp });

		if (!user) {
			return res.status(404).json({ message: "Invalid OTP or mobile number" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.otp = undefined;
		await user.save();

		res.json({
			message: "Password reset successful",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
exports.getAllUser = async () => {
	try {
		const result = await User.find({})
		if (result) {
			return {
				success: true,
				status: 200,
				data: result,
				message: "Successfully get"
			}
		} else {
			return {
				success: false,
				status: 400,
				message: "Something Went Wrong"
			}
		}

	} catch (error) {
		console.log(error)
		throw error
	}

}
exports.getUser = async (userId) => {
	try {
		console.log("userid", userId)
		const result = await User.findOne({ _id: userId })
		if (result) {
			return {
				success: true,
				status: 200,
				data: result,
				message: "Successfully get"
			}
		} else {
			return {
				success: false,
				status: 400,
				message: "Something Went Wrong"
			}
		}

	} catch (error) {
		console.log(error)
		throw error
	}

}
exports.updateUser = async (userId, payload) => {
	try {
		let result = await User.findOneAndUpdate({ _id: userId }, payload)
		if (result) {
			return {
				success: true,
				data: result,
				code: 200,
				message: 'Successfully updated'
			}
		} else {
			return {
				success: false,
				code: 404,
				error: 'Record Not Found!!!'
			}
		}

	} catch (error) {
		throw error
	}
}
exports.sendOtp = async (payload) => {
	try {
		console.log("hwllo")
		const result = await User.findOne({ phone_number: payload.phoneNumber })
		if (result) {
			const otp = await generateOTP(4);
			result.otp = { magnitude: otp, type: 'registration' }
			await result.save();
			await sendSms(result.phone_number, `Otp is: ${otp}`, payload.phoneNumber)
			return {
				success: true,
				status: 200,
				message: 'Otp send SuccesFully Your Phone number',
				data: result,
				otp: otp
			}

		} else {
			return {
				success: false,
				status: 400,
				message: 'Phone number not found'
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.changePassword = async (payload) => {
	try {
		console.log(payload)
		const result = await otp.findOne({ code: payload.code, phone_number: payload.phoneNumber });
		if (result !== null) {
			let currentTime = new Date().getTime();
			let diff = result.expireIn - currentTime
			if (diff < 0) {
				return {
					success: false,
					status: 400,
					message: "otp expires"
				}
			} else {
				let _user = await User.findOne({ phone_number: payload.phoneNumber });
				if (_user) {
					payload.password = await passwordHelper.hashPassword(payload.password, 10);
					_user.password = payload.password
					await otp.deleteOne({
						phone_number: result.phoneNumber,
					});
					_user.save()
					return {
						success: true,
						status: 200,
						message: "Password Change succefully"
					}
				}
			}
		} else {
			return {
				success: false,
				status: 400,
				message: 'Something went wrong'
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.DeleteUser = async (userId) => {
	let result = await User.findOneAndDelete({ _id: userId })
	if (result) {
		return {
			success: true,
			data: result,
			status: 200,
			message: 'Successfully Deleted'

		}
	} else {
		return {
			success: false,
			status: 404,
			error: 'Record Not Found!!!'
		}
	}
}
exports.createPaymentCard = async (payload) => {
	try {
		const saved = await userCard.create(payload);
		return { status: 200, message: "Card details saved.", data: saved }
	} catch (err) {
		console.log(err);
		return { status: 501, message: "server error.", data: {}, }
	}
};
exports.getPaymentCard = async (userId) => {
	try {
		const getData = await userCard.find({ user: userId });
		return { status: 200, message: "Card details fetch.", data: getData }
	} catch (err) {
		console.log(err);
		return { status: 501, message: "server error.", data: {}, }
	}
};
exports.updatePaymentCard = async (payload) => {
	try {
		const payment = await userCard.findById({ _id: payload.id });
		if (!payment) {
			return { status: 404, message: "Card details not fetch", data: {} }
		} else {
			let obj = {
				name: payload.name || payment.name,
				number: payload.number || payment.number,
				month: payload.month || payment.month,
				year: payload.year || payment.year,
				cvv: payload.cvv || payment.cvv,
				user: payment.user,
			}
			let saved = await userCard.findByIdAndUpdate(payment._id, { obj }, { new: true });
			return { status: 200, message: "Card details Updated Successfully.", data: saved }
		}

	} catch (err) {
		console.log(err);
		return { status: 501, message: "server error.", data: {}, }
	}
};
exports.DeletePaymentCard = async (id) => {
	try {
		const payment = await userCard.findById(id);
		if (!payment) {
			return { status: 404, message: "Card details not fetch", data: {} }
		} else {
			const data = await userCard.findByIdAndDelete({ _id: payment._id, });
			return { status: 200, message: "Card details Delete Successfully.", data: {} }
		}
	} catch (err) {
		console.log(err);
		return { status: 501, message: "server error.", data: {}, }
	}
};
