const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    title: {
        type: String
    }, 
    image: {
        type: String
    }
})
module.exports = mongoose.model('banner', bannerSchema)

