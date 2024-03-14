const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
        name: {
                type: String,
                required: true
        },
        cityId: {
                type: mongoose.Schema.ObjectId,
                ref: "city"
        },
}, { timestamps: true })

module.exports = mongoose.model('society', blogSchema)
