const mongoose = require('mongoose');


const aboutUs = mongoose.Schema({
    title: {
        type: String
    }, 
    desc: {
        type: String
    }
})


module.exports = mongoose.model('about', aboutUs)