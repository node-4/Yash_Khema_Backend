const UserService = require('../Service/UserService.js');
const User = require('../Models/User');
const { sendSms } = require("../Helpers/Sms.js");
const { generateOTP, verifyOTP } = require("../Helpers/Otp.js");
const wallet = require("../Models/Wallet");
const transactionModel = require("../Models/transactionModel");

exports.userMobileRegister = async (req, res, next) => {
	try {
		let Data = await UserService.userMobileRegister(req.body.phoneNumber, req.body.refferalCode);
		return res.status(201).json(Data)
	} catch (error) {
		next(error);
	}
}
exports.userCompleteRegistration = async (req, res, next) => {
	try {
		let Data = await UserService.userCompleteRegistration(req.body.phoneNumber, req.body.name, req.body.location, req.body.email);
		return res.status(201).json({ msg: `otp sent to ${req.body.phoneNumber}`, data: Data })
	} catch (error) {
		next(error);
	}
}
exports.userRegister = async (req, res, next) => {
	try {
		let Data = await UserService.userRegister(req.body.phoneNumber, req.body.name, req.body.password, req.body.location, req.body.vechicle);
		return res.status(201).json({ msg: `otp sent to ${req.body.phoneNumber}`, data: Data.otp.magnitude })
	} catch (error) {
		next(error);
	}
}
exports.registrationOtpVerification = async (req, res, next) => {
	try {
		const result = await UserService.registrationOtpVerification(req.body.phoneNumber, req.body.otp);
		return res.status(200).json({ msg: 'registration otp successfuly verified', data: result })
	} catch (error) {
		next(error);
	}
}
exports.userSignin = async (req, res, next) => {
	try {
		const payload = req.body;
		let result = await UserService.userSignin(payload)
		if (result.success) {
			return res.status(result.status).json({ success: result.success, message: result.message, token: result.access_token })
		} else {
			return res.status(result.status).json({ success: false, message: result.message })
		}
	} catch (error) {
		throw error
	}
}
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
		return res.json({ message: "OTP sent successfully", otp: otp });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ errors: error.message });
	}
};
exports.resetPasswordOTP = async (req, res) => {
	const { phone_number, otp, password } = req.body;
	console.log(req.body);

	try {
		const user = await User.findOne({ phone_number, otp: otp });
		if (!user) {
			return res.status(404).json({ message: "Invalid OTP or mobile number" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.otp = undefined;
		await user.save();

		return res.json({
			message: "Password reset successful",
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
exports.getAllUser = async (req, res) => {
	try {
		const result = await UserService.getAllUser()
		if (result.success) {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
		} else {
			return res.status(res.status).json({ message: result.message, status: result.status, success: result.success })
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.getUser = async (req, res) => {
	try {
		let userId = req.user
		const result = await UserService.getUser(userId)
		if (result.success) {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
		} else {
			return res.status(res.status).json({ message: result.message, status: result.status, success: result.success })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.updateUser = async (req, res) => {
	try {
		let userId = req.user._id
		console.log(req.user)
		const result = await User.findOne({ _id: userId })
		if (result) {
			let profile;
			if (req.file) {
				profile = req.file.path
			} else {
				profile = result.profile
			}
			let obj = {
				name: req.body.name ?? result.name,
				phone_number: req.body.phone_number ?? result.phone_number,
				society: req.body.society ?? result.society,
				flatNo: req.body.flatNo ?? result.flatNo,
				carNo: req.body.carNo ?? result.carNo,
				carModel: req.body.carModel ?? result.carModel,
				parkingNo: req.body.parkingNo ?? result.parkingNo,
				email: req.body.email ?? result.email,
				profile: profile
			}
			let result1 = await User.findByIdAndUpdate({ _id: userId }, { $set: obj }, { new: true })
			if (result1) {
				return res.status(200).json({ success: true, message: 'Successfully updated', data: result1 })
			}
		} else {
			return res.status(400).json({ success: false, message: 'Something Went Wrong' })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ success: false, message: 'Something Went Wrong' })
	}
}
exports.sendOtp = async (req, res) => {
	try {
		let payload = req.body
		let result = await UserService.sendOtp(payload)
		console.log(result)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success, message: result.message,
				userId: result.data._id,
				otp: result.otp
			})
		}
		else {
			return res.status(result.status).json({ success: false, message: result.message })
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.DeleteUser = async (req, res) => {
	let userId = req.params.userId
	let result = await UserService.DeleteUser(userId)
	if (result.success) {
		return res.status(result.status).json({ success: result.success, status: result.status, message: result.message, data: result.data })
	} else {
		return res.status(result.status).json({ success: result.success, status: result.status, message: result.error })
	}
}
exports.changePassword = async (req, res) => {
	try {
		const payload = req.body
		let result = await UserService.changePassword(payload)
		if (result.success) {
			return res.status(result.status).json({ success: result.success, message: result.message, data: result.data })
		} else {
			return res.status(result.status).json({ success: false, message: result.message })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.createPaymentCard = async (req, res, next) => {
	try {
		console.log("-------------------", req.user);
		const data = await User.findOne({ _id: req.user._id, });
		if (data) {
			let obj = {
				user: req.user._id,
				name: req.body.name,
				number: req.body.number,
				month: req.body.month,
				year: req.body.year,
				cvv: req.body.cvv
			}
			const saved = await UserService.createPaymentCard(obj);
			return res.status(200).json(saved)
		} else {
			return res.status(404).json({ status: 404, message: "No data found", data: {} });
		}
	} catch (err) {
		console.log(err);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.getPaymentCard = async (req, res, next) => {
	try {
		const data = await User.findOne({ _id: req.user._id, });
		if (data) {
			let user = req.user._id;
			const getData = await UserService.getPaymentCard(user)
			return res.status(200).json(getData)
		} else {
			return res.status(404).json({ status: 404, message: "No data found", data: {} });
		}
	} catch (err) {
		console.log(err);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.updatePaymentCard = async (req, res, next) => {
	try {
		const data = await User.findOne({ _id: req.user._id, });
		if (data) {
			let name = req.body.name;
			let number = req.body.number;
			let month = req.body.month;
			let year = req.body.year;
			let cvv = req.body.cvv;
			let id = req.params.id;
			const getData = await UserService.updatePaymentCard({ id, name, number, month, year, cvv })
			return res.status(200).json(getData)
		} else {
			return res.status(404).json({ status: 404, message: "No data found", data: {} });
		}
	} catch (err) {
		console.log(err);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.DeletePaymentCard = async (req, res, next) => {
	try {
		const data = await User.findOne({ _id: req.user._id, });
		if (data) {
			let id = req.params.id;
			const data = await UserService.DeletePaymentCard(id);
			return res.status(200).json(data)
		} else {
			return res.status(404).json({ status: 404, message: "No data found", data: {} });
		}

	} catch (err) {
		console.log(err);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.getWallet = async (req, res) => {
	try {
		let findSkill1 = await wallet.findOne({ user: req.user._id, });
		if (!findSkill1) {
			return res.status(404).send({ status: 404, msg: "Wallet not found successfully.", data: 0 });
		} else {
			return res.status(200).send({ status: 200, msg: "Wallet get successfully.", data: findSkill1 });
		}
	} catch (err) {
		console.log(err.message);
		return res.status(500).send({ msg: "internal server error ", error: err.message, });
	}
};
exports.allTransactionUser = async (req, res) => {
	try {
		const data = await transactionModel.find({ user: req.user._id })
		if (data.length > 0) {
			return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
		} else {
			return res.status(404).json({ status: 404, message: "Data not found.", data: {} });
		}

	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};
exports.removeMoney = async (req, res) => {
	try {
		let findSkill1 = await wallet.findOne({ user: req.user._id, });
		if (!findSkill1) {
			return res.status(404).send({ status: 404, msg: "Wallet not found successfully.", data: 0 });
		} else {
			if (findSkill1.balance >= parseInt(req.body.balance)) {
				let update = await wallet.findByIdAndUpdate({ _id: findSkill1._id }, { $set: { balance: findSkill1.balance - parseInt(req.body.balance) } }, { new: true });
				if (update) {
					const date = new Date();
					let month = date.getMonth() + 1;
					let obj = {
						user: req.user._id,
						date: date,
						month: month,
						orderId: req.body.orderId,
						amount: req.body.balance,
						type: "Debit",
					};
					const data1 = await transactionModel.create(obj);
					if (data1) {
						return res.status(200).json({ status: 200, message: "Money has been deducted.", data: data1, });
					}
				}
			} else {
				return res.status(404).send({ status: 404, msg: "Low balance.", data: 0 });
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.addMoney = async (req, res) => {
	try {
		let findSkill1 = await wallet.findOne({ user: req.user._id, });
		if (!findSkill1) {
			return res.status(404).send({ status: 404, msg: "Wallet not found successfully.", data: 0 });
		} else {
			let update = await wallet.findByIdAndUpdate({ _id: findSkill1._id }, { $set: { balance: findSkill1.balance + parseInt(req.body.balance) } }, { new: true });
			if (update) {
				const date = new Date();
				let month = date.getMonth() + 1;
				let obj = {
					user: req.user._id,
					date: date,
					month: month,
					amount: req.body.balance,
					type: "Credit",
				};
				const data1 = await transactionModel.create(obj);
				if (data1) {
					return res.status(200).json({ status: 200, message: "Money has been deducted.", data: data1, });
				}
			}
		}
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.allEarn = async (req, res) => {
	try {
		const data = await transactionModel.find({ user: req.user._id, type: "Earn" })
		if (data.length > 0) {
			return res.status(200).json({ status: 200, message: "Data found successfully.", data: data });
		} else {
			return res.status(404).json({ status: 404, message: "Data not found.", data: {} });
		}
	} catch (err) {
		return res.status(400).json({ message: err.message });
	}
};