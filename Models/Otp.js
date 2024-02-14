const mongoose = require('mongoose');
const otpSchema = mongoose.Schema({
  phone_number: String,
  code: String,
  expireIn: Number,
},
  { timestamps: true });
module.exports = mongoose.model("otp", otpSchema);
