const banner = require('../Models/Banner')

exports.addBanner = async (payload) => {
	try {
		const result = await new banner(payload)
		result.save()
		if (result) {
			return {
				success: true,status: 200,data: result,message: "Add Banner Successfully"
			}
		} else {
			return {
				success: true,
				status: 400,
				message: "Something Went Wrong"
			}
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}
exports.getBanner = async () => {
	try {
		result = await banner.find({})
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
exports.updateBanner = async (bannerId, payload) => {
	try {
		let result = await banner.findOneAndUpdate({ _id: bannerId }, payload)
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
exports.deleteBanner = async (bannerId) => {
	let result = await banner.findOneAndDelete({ _id: bannerId })
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