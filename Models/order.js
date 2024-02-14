const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  services: {
    type: Schema.Types.ObjectId,
    ref: "Services",
  },
  quantity: {
    type: Number
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Services",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
  }],
  services: [{
    services: {
      type: Schema.Types.ObjectId,
      ref: "Services",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    }
  }],
  shippingAddress: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  paymentMethod: {
    type: String,
  },
  paymentResult: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
    update_time: {
      type: String,
    },
    email_address: {
      type: String,
    },
  },
  itemsPrice: {
    type: Number,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
  },
  unPaid: {
    type: Number,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  grandTotal: {
    type: Number,
  },
  Status: {
    type: String
  },
  orderType: {
    type: String,
    enum: ['Product', 'Service']
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Accept', "Complete"]
  },
  instellers: [{
    type: Schema.Types.ObjectId,
    ref: "user",
  }],
  instellerId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  installerReviewId: {
    type: Schema.Types.ObjectId,
    ref: "installerReview",
  },
  reviewDone: {
    type: String
  },
  paymentStatus: {
    type: String
  },
}, {
  timestamps: true,
});

module.exports = model("Order", orderSchema);
