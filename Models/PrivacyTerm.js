const mongoose = require('mongoose');


const privacy = mongoose.Schema({
    privacy: {
        type: String,
    },
    terms: {
        type: String,
    },
    whyChooseUs: {
        type: String,
    },
    type: {
        type: String,
        enum: ["Privacy", "Term", 'Why choose us']
    }
})


module.exports = mongoose.model('PrivacyTerm', privacy);