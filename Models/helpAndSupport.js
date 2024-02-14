const mongoose = require('mongoose');


const helpandSupport = mongoose.Schema({
    name: {
        type: String
    }, 
    email: {
        type: String
    },
    desc:{
        type:String
    }
})


module.exports = mongoose.model('helpandSupport', helpandSupport)