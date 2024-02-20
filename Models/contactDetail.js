const mongoose = require('mongoose');
const schema = mongoose.Schema;
const DocumentSchema = schema({
        phone: {
                type: String
        },
        supportEmail: {
                type: String
        },
        name: {
                type: String
        },
        contactAddress: {
                type: String
        },
}, { timestamps: true })
module.exports = mongoose.model("contactDetails", DocumentSchema);