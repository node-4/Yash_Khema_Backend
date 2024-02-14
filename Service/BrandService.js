const brand = require('../Models/Brand');

exports.addBrand = async (payload) => {
	try {
		let checkBrand = await brand.findOne({ name: payload.name })
		if (checkBrand) {
			return { status: 400, message: "Brand Allready exist" }
		}
		if (!checkBrand) {
			const result = await new brand(payload)
			result.save()
			if (result) {
				return { success: true, status: 200, data: result, message: "Add Brand SuccessFully" }
			} else {
				return { success: false, status: 400, message: "Something Went Wrong" }
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}



exports.getBrand = async () => {
	try {
		result = await brand.find({})
		if (result) {
			return {
				success: true,
				status: 200,
				data: result,
				message: "Get Succefully"
			}
		} else {
			return {
				success: false,
				status: 400,
				message: "Something went Wrong"
			}
		}
	} catch (error) {
		console.log(error);
		throw error
	}
}


exports.updateBrand = async (brandId, payload) => {
	try {
		let result = await brand.findOneAndUpdate({ _id: brandId }, payload)
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

exports.deleteBrand = async (brandId) => {
	let result = await brand.findOneAndDelete({ _id: brandId })
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