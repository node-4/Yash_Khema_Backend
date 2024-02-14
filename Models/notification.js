const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
        type: String
    }, 
    image: {
        type: String
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);