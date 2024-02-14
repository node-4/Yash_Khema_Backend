const SellerService = require('../Service/SellerService');

exports.addSeller = async (req, res) => {
	const payload = req.body
	const result = await SellerService.addSeller(payload)
	if (result.success) {
		return res.status(result.status).json({
			success: result.success,
			status: result.status,
			data: result.data,
			message: result.message,
		})
	} else {
		return res.status(result.status).json({
			success: result.success,
			status: result.status,
			message: result.message
		})
	}
}
exports.sellerSignin = async (req, res, next) => {
	try {
		const payload = req.body;
		let result = await SellerService.sellerSignin(payload)
		if (result.success) {

			return res.status(result.status).json({
				success: result.success,
				message: result.message,
				token: result.access_token,
				userId: result.userId
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
exports.getAllSeller = async (req, res) => {
	try {
		const result = await SellerService.getAllSeller()
		if (result.success) {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data,
			})
		} else {
			return res.status(res.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.updateSeller = async (req, res) => {
	try {
		let payload = req.body;
		console.log(req.body)
		let sellerId = req.user
		let result = await SellerService.updateSeller(sellerId, payload)
		if (result.success) {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.message, data: result.data })
		} else {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.error })
		}
	} catch (error) {
		throw error
	}
}
exports.sendMail = async (req, res) => {
	try {
		let payload = req.body
		let result = await SellerService.sendMail(payload)
		console.log(result)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success,
				message: result.message,
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
exports.deleteSeller = async (req, res) => {
	try {
		let sellerId = req.params.sellerId
		let result = await SellerService.DeleteSSeller(sellerId)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.message,
			})
		} else {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.error
			})
		}
	} catch (error) {
		throw error
	}
}
