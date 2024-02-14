const mongoose = require("mongoose");
const Schema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	brandImg: {
		type: String,
		required: null
	}
}, { timestamps: true })
module.exports = mongoose.model('brand', Schema)