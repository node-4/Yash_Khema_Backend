const admin = require('../Models/User');
const passwordHelper = require('../Helpers/Password');
const bcrypt = require('bcryptjs');
const tokenHelper = require('../Helpers/Token');
const emailHelper = require('../Helpers/Email');

exports.adminSignup = async (payload) => {
	try {
		payload.password = await passwordHelper.hashPassword(payload.password, 10);
		console.log(payload.password)
		let user = await admin.findOne({ email: payload.email, userType: "admin" });
		if (!user) {
			payload.userType = "admin";
			const result = await new admin(payload)
			result.save()
			if (result) {
				const token = await tokenHelper.generateToken(result, 'login');
				return { success: true, status: 200, data: result, access_token: token, message: 'You Are Successfully Signup' }
			} else {
				return { success: false, status: 400, message: "Somethng Went Wrong" }
			}
		} else {
			return { success: false, status: 409, data: user, message: 'Email already exit' }
		}
	} catch (error) {
		console.log(error)
		throw error
	}

}
exports.adminSignin = async (payload) => {
	try {
		console.log(payload.email)
		const result = await admin.findOne({ email: payload.email, userType: "admin" });
		console.log(result)
		if (result) {
			const isValid = await passwordHelper.isValidPassword(payload.password, result.password);
			if (isValid) {
				const token = await tokenHelper.generateToken(result, 'login');
				console.log(result);
				return {
					success: true,
					status: 200,
					message: "Login successfully",
					data: result,
					access_token: token
				}
			} else {
				return {
					success: false,
					status: 400,
					message: "Email or password is incorrect"
				};
			}
		} else {
			return {
				success: false,
				status: 404,
				message: 'User Not Found'
			}
		}


	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.sendMail = async (payload) => {
	try {
		const result = await admin.findOne({ email: payload.email, userType: "admin" })
		if (result) {
			const code = Math.floor(100000 + Math.random() * 900000);
			let otpData = await otp.findOne({ email: payload.email });
			if (!otpData) {
				otpData = new otp();
			}
			otpData.email = payload.email;
			otpData.code = code;
			otpData.expiresIn = new Date().getTime() + 300 * 1000;
			await otpData.save();
			await emailHelper.sendMail(result.email, `Otp is: ${code}`, payload.email)
			return {
				success: true,
				status: 200,
				message: 'Otp send SuccesFully Your email',
				data: result,
				otp: code
			}

		} else {
			return {
				success: false,
				status: 400,
				message: 'Email is not found'
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
		const result = await otp.findOne({ code: payload.code });
		console.log("ent", result)
		if (result) {
			let currentTime = new Date().getTime();
			let diff = result.expireIn - currentTime
			if (diff < 0) {
				return {
					success: false,
					status: 400,
					message: "otp expires"
				}

			} else {
				let _user = await admin.findOne({ email: result.email, userType: "admin" });
				console.log(_user)
				if (_user) {

					payload.password = await passwordHelper.hashPassword(payload.password, 10);
					_user.password = payload.password
					await otp.deleteOne({
						email: result.email
					})
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