const AdminService = require('../Service/AdminService')

exports.adminSignup = async (req, res) => {
	try {
		const payload = req.body
		console.log(req.body)
		let result = await AdminService.adminSignup(payload)
		if (result.success) {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,
				token: result.access_token
			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status
			})
		}

	} catch (error) {
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.adminSignin = async (req, res, next) => {
	try {
		const payload = req.body;
		// console.log(req.body)
		let result = await AdminService.adminSignin(payload)
		// console.log(result)
		if (result.success) {

			return res.status(result.status).json({
				success: result.success,
				message: result.message,
				token: result.access_token
			})
		}
		else {
			return res.status(result.status).json({
				success: false,
				message: result.message
			})
		}
	} catch (error) {
		throw error
	}
}
exports.sendMail = async (req, res) => {
	try {
		let payload = req.body
		let result = await AdminService.sendMail(payload)
		console.log(result)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success,
				message: result.message,
				// data:result.data,
				otp: result.otp
			})
		}
		else {
			return res.status(result.status).json({
				success: false,
				message: result.message
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.changePassword = async (req, res) => {
	try {
		const payload = req.body
		let result = await AdminService.changePassword(payload)
		if (result.status) {
			return res.status(result.status).json({
				success: result.success,
				message: result.message,
				data: result.data
			})
		}
		else {
			return res.status(result.status).json({
				success: false,
				message: result.message
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
