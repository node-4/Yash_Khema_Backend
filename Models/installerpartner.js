const mongoose = require('mongoose');
const installingpartnerSchema = mongoose.Schema({
    insteller: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
    },
    businessName: {
        type: String
    },
    businessContactNumber: {
        type: String
    },
    businessEmail: {
        type: String,
    },
    activeGstNumber: {
        type: String
    },
    GstNumber: {
        type: Number
    },
    businessAddress: {
        type: String
    },
    panCardNumber: {
        type: Number
    },
    frontSidePanCard: {
        type: String
    },
    personalName: {
        type: String
    },
    personalemail: {
        type: String
    },
    personalNumber: {
        type: String
    },
    personaladdress: {
        type: String
    }
})

module.exports = mongoose.model('instellingpartner', installingpartnerSchema)