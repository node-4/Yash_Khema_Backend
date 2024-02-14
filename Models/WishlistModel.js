const mongoose = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user"
  },
  services: {
    type: [mongoose.Types.ObjectId],
    ref: "Services"
  }
});
module.exports = mongoose.model("Wishlist", wishlistSchema);