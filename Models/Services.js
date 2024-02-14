const mongoose = require('mongoose');
const servicesSchema = mongoose.Schema({
	Wishlistuser: {
		type: [mongoose.Schema.ObjectId],
		ref: "user"
	},
	category: {
		type: mongoose.Schema.ObjectId,
		ref: "category"
	},
	subCategory: {
		type: mongoose.Schema.ObjectId,
		ref: "subCatgory"
	},
	sellerId: {
		type: mongoose.Schema.ObjectId,
		ref: "user"
	},
	serviceName: {
		type: String,
	},
	serviceImg: {
		type: String,
	},
	desc: {
		type: Array
	},
	include: [{
		image: {
			type: String,
		},
		name: {
			type: String,
		},
		upto: {
			type: String,
		},
	}],
	additionalService: {
		type: Array
	},
	price: {
		type: Number,
	},
	payPrice: {
		type: Number,
	},
	discount: {
		type: String,
		default: 0
	},
	discountActive: {
		type: String,
		default: false
	},
	freePickAndDrop: {
		type: String,
		default: false
	},
	spares: {
		type: String,
		default: false
	},
	time: {
		type: String,
	},
	pickupCharge: {
		type: String,
	},
	faq: [{
		question: {
			type: String,
		},
		answer: {
			type: String,
		},
	}],
	ratings: {
		type: Number,
		default: 0,
	},
	numOfReviews: {
		type: Number,
		default: 0,
	},
	reviews: [{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
	}],
	categoryType: {
		type: String,
		enum: ["Other", "EmergencyService"]
	},
	sale: {
		type: Number,
		default: 0,
	},
}, { timestamps: true })
module.exports = mongoose.model("Services", servicesSchema)