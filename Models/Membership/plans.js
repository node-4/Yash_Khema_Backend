const mongoose = require('mongoose');
const servicePlanSchema = new mongoose.Schema({
        price: Number,
        services: [String],
        name: {
                type: String,
                enum: ['Basic Plan', 'Premium Plan', 'forBothCarsAndTwoWheelersPrice', 'forTwoWheelersOnlyPrice'],
        },
        image: String,
});
module.exports = mongoose.model('ServicePlan', servicePlanSchema);
