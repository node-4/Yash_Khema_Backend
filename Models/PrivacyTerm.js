const mongoose = require('mongoose');


const privacy = mongoose.Schema({
    privacy: {
        type: String, 
    },
    terms: {
        type: String, 
    },
    type: {
        type: String,
        enum:["Privacy","Term"]
    }
})


module.exports = mongoose.model('PrivacyTerm', privacy);