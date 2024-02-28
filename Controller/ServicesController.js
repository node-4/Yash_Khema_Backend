const ServicesService = require('../Service/ServicesService');
const Wishlist = require('../Models/WishlistModel');
const Services = require('../Models/Services');
const slot = require('../Models/slot');
exports.addService = async (req, res) => {
	try {
		const payload = req.body
		payload.sellerId = req.user
		const result = await ServicesService.addService(payload)
		if (result) {
			return res.status(result.status).json({ message: result.message, success: result.success, status: result.status, data: result.data })
		} else {
			return res.status(result.status).json({ message: result.message, success: result.success, status: result.status })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.getService = async (req, res) => {
	try {
		const result = await ServicesService.getService({})
		if (result.success) {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
		} else {
			return res.status(res.status).json({ message: result.message, status: result.status, success: result.success })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.getServiceBycategorySubCategoryId = async (req, res) => {
	try {
		const categoryId = req.params.category;
		const subCategoryId = req.params.subCategoryId;
		const result = await ServicesService.getServiceBycategorySubCategoryId(categoryId, subCategoryId)
		if (result.success) {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
		} else {
			return res.status(res.status).json({ message: result.message, status: result.status, success: result.success })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.getServiceById = async (req, res) => {
	try {
		const subCategoryId = req.params.Id;
		const result = await ServicesService.getServiceById(subCategoryId)
		console.log(result);
		if (result.success) {
			return res.status(result.status).json({ message: result.message, status: result.status, success: result.success, data: result.data, })
		} else {
			return res.status(res.status).json({ message: result.message, status: result.status, success: result.success })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.updateService = async (req, res) => {
	try {
		let payload = req.body;
		if (req.file) {
			let serviceImg = {
				filename: req.file.filename,
				filetype: req.file.mimetype,
				filesize: req.file.size,
				url: req.file.path
			}

			payload.serviceImg = serviceImg
		}
		let ServiceId = req.params.serviceid
		let result = await ServicesService.updateServices(ServiceId, payload)
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
				message: result.error
			})
		}
	} catch (error) {
		throw error
	}
}
exports.deleteService = async (req, res, next) => {
	try {
		let ServiceId = req.params.serviceid
		let result = await ServicesService.deleteService(ServiceId)
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
exports.getSellelerSellerId = async (req, res) => {
	try {
		const sellerId = req.user
		const result = await ServicesService.getServicesSellerId(sellerId)
		console.log(result)
		if (result.status) {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success,
				data: result.data
			})
		} else {
			return res.status(result.status).json({
				message: result.message,
				status: result.status,
				success: result.success
			})
		}

	} catch (err) {
		console.log(err);
		return res.status(400).json({
			message: err.message
		})
	}
}
exports.uploadImage = async (req, res) => {
	try {
		if (req.file) {
			return res.status(200).json({ message: "Get successfully", data: req.file.path, status: 200 })
		} else {
			return res.status(404).json({ message: "Image not provide", data: {}, status: 404 })
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.createWishlist = async (req, res, next) => {
	try {
		const serviceId = req.params.id;
		const viewService = await Services.findById(serviceId);
		if (viewService) {
			let wishList = await Wishlist.findOne({ user: req.user._id });
			if (!wishList) {
				wishList = new Wishlist({ user: req.user._id, });
			}
			wishList.services.addToSet(serviceId);
			viewService.Wishlistuser.push(req.user._id);
			await wishList.save();
			await viewService.save();
			return res.status(200).json({ status: 200, message: "ServiceId add to wishlist Successfully", });
		} else {
			return res.status(404).json({ message: "Service not found", status: 404 })
		}
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.removeFromWishlist = async (req, res, next) => {
	try {
		const wishlist = await Wishlist.findOne({ user: req.user._id });
		if (!wishlist) {
			return res.status(404).json({ message: "Wishlist not found", status: 404 });
		}
		const serviceId = req.params.id;
		const viewService = await Services.findById(serviceId);
		wishlist.services.pull(serviceId);
		viewService.Wishlistuser.pull(req.user._id);
		await wishlist.save();
		await viewService.save();
		return res.status(200).json({ status: 200, message: "Removed From Wishlist", });
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.myWishlist = async (req, res, next) => {
	try {
		let myList = await Wishlist.findOne({ user: req.user._id }).populate('services');
		if (!myList) {
			myList = await Wishlist.create({ user: req.user._id });
		}
		let array = []
		console.log(myList)
		for (let i = 0; i < myList.services.length; i++) {
			const data = await Services.findById(myList.services[i]._id).populate('category subCategory')
			array.push(data)
		}
		let obj = {
			_id: myList._id,
			user: myList.user,
			services: array,
			__v: myList.__v
		}
		return res.status(200).json({ status: 200, wishlist: obj, });
	} catch (error) {
		console.log(error);
		return res.status(501).send({ status: 501, message: "server error.", data: {}, });
	}
};
exports.getPopularService = async (req, res) => {
	try {
		const result = await Services.find({ categoryType: "Other" }).sort({ sale: -1 }).limit(5);
		if (result) {
			return res.status(200).json({ status: 200, message: "Popular Services found Successfully", data: result, });
		} else {
			return res.status(404).json({ status: 404, message: "Popular Services not found.", });
		}
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: error.message })
	}
}
exports.getSlot = async (req, res) => {
	try {
		const { fromDate, date, toDate, page, limit } = req.query;
		let query = { isBooked: false };
		if (date) {
			query.date = date;
		}
		if (fromDate && !toDate) {
			query.date = { $gte: fromDate };
		}
		if (!fromDate && toDate) {
			query.date = { $lte: toDate };
		}
		if (fromDate && toDate) {
			query.$and = [
				{ date: { $gte: fromDate } },
				{ date: { $lte: toDate } },
			]
		}
		let options = {
			page: Number(page),
			limit: Number(limit) || 250,
			sort: { from: 1 },
		};
		let data = await slot.paginate(query, options);
		return res.status(200).json({ status: 200, message: "Slot data found.", data: data });
	} catch (err) {
		return res.status(500).send({ msg: "internal server error ", error: err.message, });
	}
};
async function generateSlots(startDate, numberOfDays) {
	try {
		function getAmPm(date) {
			const hours = date.getUTCHours();
			return hours >= 12 && hours < 24 ? 'PM' : 'AM';
		}
		const intervalMilliseconds = 24 * 60 * 60 * 1000;
		let currentDate = new Date(startDate);
		currentDate.setUTCHours(10, 0, 0, 0);
		const endDate = new Date(currentDate.getTime() + numberOfDays * intervalMilliseconds);
		const slots = [];
		for (; currentDate.getTime() < endDate.getTime(); currentDate.setDate(currentDate.getDate() + 1)) {
			const startTime = new Date(currentDate.getTime());
			const endTime = new Date(currentDate.getTime() + 7 * 60 * 60 * 1000);
			const halfHour = 60 * 60 * 1000;
			while (startTime.getTime() < endTime.getTime()) {
				const slotEndTime = new Date(startTime.getTime() + halfHour);
				const obj = {
					date: currentDate.toISOString().split('T')[0],
					from: startTime.toISOString(),
					to: slotEndTime.toISOString(),
					fromAmPm: getAmPm(startTime),
					toAmPm: getAmPm(slotEndTime),
				};
				console.log(obj);
				const findSlot = await slot.findOne(obj);
				if (!findSlot) {
					const slot1 = new slot(obj);
					await slot1.save();
					slots.push(obj);
				}
				startTime.setTime(slotEndTime.getTime());
			}
		}
		return slots;
	} catch (error) {
		console.log("Slots error.", error);
	}
}
async function generateSlotsForNext5Years() {
	const generatedSlots = await generateSlots(new Date('2024-02-01T00:00:00Z'), 365);
	console.log(generatedSlots);
}
// generateSlotsForNext5Years();