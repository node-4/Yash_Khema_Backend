const { model, Schema } = require("mongoose");
const CartSchema = new Schema({
        user: {
                type: Schema.Types.ObjectId,
                ref: "user"
        },
        servicePlan: {
                type: Schema.Types.ObjectId,
                ref: "ServicePlan"
        },
        subscriptionExpiration: {
                type: Date,
        },
        isSubscription: {
                type: Boolean,
                default: false
        },
        status: {
                type: String,
        },
}, { timestamps: true })
module.exports = model("userMembership", CartSchema)