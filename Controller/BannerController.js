const BannerService = require('../Service/BannerService');

exports.addBanner = async (req, res) => {
	try {
		const payload = req.body
		if (req.file) {
			payload.image = req.file.path
		}
		const result = await BannerService.addBanner(payload)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,

			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: success
			})
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.getBanner = async (req, res,) => {
	try {
		let result = await BannerService.getBanner({})
		if (result.success) {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
				data: result.data,

			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				success: result.success,
				status: result.status,
			})
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.updateBanner = async (req, res) => {
	try {
		let payload = req.body;
		if (req.file) {
			payload.image = req.file.path
		}
		let bannerId = req.params.bannerid
		let result = await BannerService.updateBanner(bannerId, payload)
		if (result.success) {
			return res.status(result.code).json({
				success: result.success,
				message: result.message,
				data: result.data
			})
		} else {
			return res.status(result.code).json({
				success: result.success,
				message: result.error
			})
		}
	} catch (error) {
		throw error
	}
}
exports.deleteBanner = async (req, res, next) => {
	try {
		let bannerId = req.params.bannerid
		let result = await BannerService.deleteBanner(bannerId)
		if (result.success) {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.message,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				success: result.success,
				status: result.status,
				message: result.error
			})
		}

	} catch (error) {
		next(error)
	}
}
