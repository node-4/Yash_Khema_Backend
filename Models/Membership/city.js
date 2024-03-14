const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
        name: {
                type: String,
                required: true
        },
}, { timestamps: true })

module.exports = mongoose.model('city', blogSchema)
