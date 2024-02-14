const seller = require('../Models/User.js');
const otp = require('../Models/Otp.js');
const passwordHelper = require('../Helpers/Password');
const token = require('../Helpers/Token');
const emailHelper = require('../Helpers/Email');


exports.addSeller = async (payload) => {
	try {
		payload.password = await passwordHelper.hashPassword(payload.password, 10)
		let Seller = await seller.findOne({ email: payload.email, userType: "seller" })
		if (Seller) {
			return { status: 400, message: "Seller Allready Registerd" }
		}
		if (!Seller) {
			payload.userType = "seller";
			const result = await new seller(payload);
			result.save();
			if (result) {
				return { status: 200, success: true, data: result, message: 'Seller Register successfully', }
			} else {
				return { status: 400, success: false, message: "Something Went Wrong" }
			}
		}
	} catch (error) {
		throw error
	}
}
exports.sellerSignin = async (payload) => {
	try {
		const result = await seller.findOne({ email: payload.email, userType: "seller" });
		if (result) {
			const isValid = await passwordHelper.isValidPassword(payload.password, result.password);
			if (isValid) {
				const newToken = await token.generateToken(result, 'login');
				console.log("result", result);
				return { success: true, status: 200, message: "Login successfully", data: result, access_token: newToken, userId: result._id }
			} else {
				return { success: false, status: 400, message: "Email or password is incorrect" };
			}
		} else {
			return { success: false, status: 404, message: 'User Not Found' }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getAllSeller = async () => {
	try {
		const result = await seller.find({ userType: "seller" })
		if (result) {
			return { success: true, status: 200, data: result, message: "Successfully get" }
		} else {
			return { success: false, status: 400, message: "Something Went Wrong" }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.updateSeller = async (sellerId, payload) => {
	console.log("seller", sellerId)
	try {
		let findData = await seller.findOne({ _id: sellerId })
		if (findData) {
			if (req.file) {
				payload.profile = req.file.path
			} else {
				payload.profile = findData.profile
			}
			let result = await seller.findOneAndUpdate({ _id: sellerId }, payload)
			if (result) {
				return { success: true, data: result, status: 200, message: 'Successfully updated' }
			}
		} else {
			return { success: false, status: 404, error: 'Record Not Found!!!' }
		}
	} catch (error) {
		throw error
	}
}
exports.DeleteSSeller = async (sellerId) => {
	console.log("seller", sellerId)
	try {
		await seller.deleteOne({ _id: sellerId })
		return { success: true, status: 200, message: 'Successfully Deleted' }
	} catch (error) {
		throw error
	}
}
exports.sendMail = async (payload) => {
	try {
		const result = await seller.findOne({ email: payload.email })
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
			return { success: true, status: 200, message: 'Otp send SuccesFully Your email', data: result, otp: code }
		} else {
			return { success: false, status: 400, message: 'Email is not found' }
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}