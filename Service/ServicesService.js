const services = require('../Models/Services')
const category = require('../Models/Category');
exports.addService = async (payload) => {
	try {
		let result1 = await category.findOne({ _id: payload.category })
		if (!result1) {
			return { success: false, status: 404, error: 'Record Not Found!!!' }
		} else {
			if (result1.categoryType == "EmergencyService") {
				let result2 = await services.findOne({ category: payload.category })
				if (result2) {
					return { success: true, status: 200, data: result2, message: "Add Service Seccessfully" }
				} else {
					payload.categoryType = "EmergencyService"
				}
			} else {
				payload.categoryType = "Other"
			}
			const result = await new services(payload)
			result.save()
			if (result) {
				return { success: true, status: 200, data: result, message: "Add Service Seccessfully" }
			} else {
				return { success: false, status: 400, message: "Something Went Wrong" }
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getService = async () => {
	try {
		const result = await services.find({}).populate(['category', 'subCategory'])
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
exports.getServiceById = async (id) => {
	try {
		const result = await services.findById({ _id: id })
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
exports.getServiceBycategorySubCategoryId = async (category, subCategory) => {
	try {
		const result = await services.find({ subCategory: subCategory, category: category })
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
exports.updateServices = async (ServiceId, payload) => {
	try {
		let result = await services.findOneAndUpdate({ _id: ServiceId }, payload)
		if (result) {
			return {
				success: true,
				data: result,
				status: 200,
				message: 'Successfully updated'
			}
		} else {
			return {
				success: false,
				status: 404,
				error: 'Record Not Found!!!'
			}
		}

	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.deleteService = async (ServiceId) => {
	let result = await services.findOneAndDelete({ _id: ServiceId })
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
exports.getServicesSellerId = async (sellerId) => {
	let result = await services.find({ sellerId: sellerId }).populate(['category', 'subCategory', 'sellerId']);
	console.log(result)
	if (result.length !== 0) {
		return {
			success: true,
			data: result,
			status: 200,
			message: "Successfully Found Data !!"
		}
	}
	else if (result.length === 0) {
		return {
			success: true,
			data: null,
			status: 201,
			message: "No Data Found this Seller !!"
		}
	} else {
		return {
			success: false,
			status: 404,
			error: 'Record Not Found!!!'
		}
	}
}