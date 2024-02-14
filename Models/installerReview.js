const mongoose = require('mongoose');
const review = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    instellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    OrderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    message: {
        type: String,
    },
    rating: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('installerReview', review);