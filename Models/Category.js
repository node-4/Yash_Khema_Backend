const mongoose = require("mongoose");
const CategorySchema = mongoose.Schema({
	categoryName: {
		type: String,
		required: true
	},
	categoryImg: {
		type: String,
	},
	categoryType: {
		type: String,
		enum: ["ScheduledService", "ValueAddedService", "MechanicalRepair", "CuratedCustomService", "Accessories", "24x7Services", "EmergencyService"]
	},
}, { timestamp: true })
module.exports = mongoose.model("category", CategorySchema)
