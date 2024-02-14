const CategoryService = require('../Service/CategoryService')

exports.addCategory = async (req, res) => {
	try {
		const payload = req.body
		if (req.file) {
			payload.categoryImg = req.file.path
		}
		const result = await CategoryService.addCategory(payload)
		if (result.status) {
			return res.status(result.status).json({ message: result.message, success: result.success, status: result.status, data: result.data, })
		} else {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.getCategory = async (req, res,) => {
	try {
		let result = await CategoryService.getCategory({})
		if (result.success) {
			return res.status(result.status).json({ message: result.message, success: result.success, status: result.status, data: result.data })
		} else {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.message })
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.getCategorybyType = async (req, res,) => {
	try {
		let categoryType = req.params.categoryType
		let result = await CategoryService.getCategorybyType(categoryType)
		if (result.success) {
			return res.status(result.status).json({ message: result.message, success: result.success, status: result.status, data: result.data })
		} else {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.message })
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message
		})
	}
}
exports.updateCategory = async (req, res) => {
	try {
		let payload = req.body;
		let categoryId = req.params.categoryid
		let findData = await CategoryService.getCategoryById(categoryId)
		if (findData.success) {
			if (req.file) {
				payload.categoryImg = req.file.path
			} else {
				payload.categoryImg = findData.data.categoryImg
			}
			let result = await CategoryService.updateCategory(categoryId, payload)
			if (result.success) {
				return res.status(result.code).json({ success: result.success, message: result.message, data: result.data })
			} else {
				return res.status(result.code).json({ success: result.success, message: result.error })
			}
		} else {
			return res.status(findData.code).json({ success: findData.success, message: findData.error })
		}
	} catch (error) {
		throw error
	}
}
exports.deleteCategory = async (req, res, next) => {
	try {
		let categoryId = req.params.categoryid
		let result = await CategoryService.deleteCategory(categoryId)
		if (result.success) {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.message, data: result.data })
		} else {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.error })
		}
	} catch (error) {
		next(error)
	}
}
exports.getCategoryById = async (req, res, next) => {
	try {
		let Id = req.params.Id
		let result = await CategoryService.getCategoryById(Id)
		if (result.success) {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.message, data: result.data })
		} else {
			return res.status(result.status).json({ success: result.success, status: result.status, message: result.error })
		}
	} catch (err) {
		next(err)
	}
}


