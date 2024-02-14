const category = require('../Models/Category');
exports.addCategory = async (payload) => {
	try {
		let checkCategory = await category.findOne({ categoryName: payload.categoryName, categoryType: payload.categoryType })
		if (checkCategory) {
			return { status: 400, message: "category Allready exist" }
		}
		if (!checkCategory) {
			const result = await new category(payload)
			result.save()
			if (result) {
				return { success: true, status: 200, data: result, message: "Add Category SuccessFully" }
			} else {
				return { success: false, status: 400, message: "Something Went Wrong" }
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getCategory = async () => {
	try {
		result = await category.find({});
		if (result) {
			return { success: true, status: 200, data: result, message: "Get Succefully" }
		} else {
			return { success: false, status: 400, message: "Something went Wrong" }
		}
	} catch (error) {
		console.log(error);
		throw error
	}
}
exports.getCategorybyType = async (categoryType) => {
	try {
		result = await category.find({ categoryType: categoryType });
		if (result) {
			return { success: true, status: 200, data: result, message: "Get Succefully" }
		} else {
			return { success: false, status: 400, message: "Something went Wrong" }
		}
	} catch (error) {
		console.log(error);
		throw error
	}
}
exports.updateCategory = async (categoryId, payload) => {
	try {
		let result = await category.findOneAndUpdate({ _id: categoryId }, { $set: payload }, { new: true })
		if (result) {
			return { success: true, data: result, code: 200, message: 'Successfully updated' }
		} else {
			return { success: false, code: 404, error: 'Record Not Found!!!' }
		}
	} catch (error) {
		throw error
	}
}
exports.deleteCategory = async (categoryId) => {
	let result = await category.findOneAndDelete({ _id: categoryId })
	if (result) {
		return { success: true, data: result, status: 200, message: 'Successfully Deleted' }
	} else {
		return { success: false, status: 404, error: 'Record Not Found!!!' }
	}
}
exports.getCategoryById = async (categoryId) => {
	let result = await category.findOne({ _id: categoryId })
	if (result) {
		return { success: true, data: result, status: 200, message: "Successfully Found Data !!" }
	} else {
		return { success: false, status: 404, error: 'Record Not Found!!!' }
	}
}