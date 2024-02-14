const mongoose = require('mongoose');

const feedback = mongoose.Schema({
    rating : {
        type: Number,
        default: 0, 
    },
    comment: {
        type: String,
    }
})


module.exports = mongoose.model('feedback', feedback);