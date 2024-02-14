const Order = require("../Models/order");
const Cart = require("../Models/Cart");
const installer = require("../Models/User");
const installerReview = require("../Models/installerReview");
const wallet = require("../Models/Wallet");
const transactionModel = require("../Models/transactionModel");
const Services = require('../Models/Services');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product").populate("services.services").exec();
    if (!cart) {
      return res.status(404).send({ status: false, message: `No such cart exist for ${userId}` });
    } else {
      if (cart.products.length > 0) {
        let totalPrice = 0;
        for (const product of cart.products) {
          const productPrice = product.product.price * product.quantity;
          totalPrice += productPrice;
        }
        let products = [];
        for (const product of cart.products) {
          let obj = {
            product: product.product._id,
            quantity: product.quantity,
            price: product.product.price
          }
          products.push(obj)
          const productPrice = product.product.price * product.quantity;
          totalPrice += productPrice;
        }
        const order = { user: userId, products: products, totalPrice: totalPrice, quantity: cart.products.length, };
        const shippingAddress = {
          address: req.body.address,
          city: req.body.city,
          postalCode: req.body.postalCode,
          country: req.body.country,
        };
        order.shippingAddress = shippingAddress;
        order.grandTotal = totalPrice;
        order.orderType = "Product"
        const result = await Order.create(order);
        return res.status(201).send({ status: true, message: "Success", data: result });
      }
      if (cart.services.length > 0) {
        let totalPrice = 0, instellers = [];
        const findInstaller = await installer.find({ userType: "insteller" });
        if (findInstaller.length > 0) {
          for (let i = 0; i < findInstaller.length; i++) {
            instellers.push(findInstaller[i]._id)
          }
        }
        let services = [];
        for (const product of cart.services) {
          const productPrice = product.services.price * product.quantity;
          let obj = {
            services: product.services._id,
            quantity: product.quantity,
            price: product.services.price
          }
          services.push(obj)
          totalPrice += productPrice;
        }
        const order = { user: userId, services: services, totalPrice: totalPrice, quantity: cart.services.length, };
        const shippingAddress = {
          address: req.body.address,
          city: req.body.city,
          postalCode: req.body.postalCode,
          country: req.body.country,
        };
        order.shippingAddress = shippingAddress;
        order.grandTotal = totalPrice;
        order.orderType = "Service"
        order.orderStatus = "Pending"
        order.instellers = instellers
        const result = await Order.create(order);
        return res.status(201).send({ status: true, message: "Success", data: result });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user services.services products.product').exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getAllOrdersByToken = async (req, res) => {
  try {
    console.log(req.user);
    const orders = await Order.find({ user: req.user._id }).exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user services.services products.product').exec();
    if (!order) {
      return res.status(404).send({
        status: false,
        message: `No order found with ID ${req.params.id}`,
      });
    }
    return res.status(200).send({ status: true, message: "Success", data: order });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.status(404).send({
        status: false,
        message: `No order found with ID ${req.params.id}`,
      });
    }

    order.shippingAddress = {
      address: req.body.address,
      city: req.body.city,
      postalCode: req.body.postalCode,
      country: req.body.country,
    };
    order.grandTotal =
      parseInt(req.body.totalPrice) +
      parseInt(req.body.shippingPrice) +
      parseInt(req.body.taxPrice);

    const updatedOrder = await order.save();

    return res.status(200).send({ status: true, message: "Success", data: updatedOrder });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id).exec();
    if (!order) {
      return res.status(404).send({
        status: false,
        message: `No order found with ID ${req.params.id}`,
      });
    }
    return res.status(200).send({ status: true, message: "Success", data: order });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getAllPaidOrder = async (req, res) => {
  try {
    const orders = await Order.find()
    // for(let i=0;i<order.length;i++)
    // {
    //   //const orders = order.data
    // }
    //console.log(orders)
    console.log(orders.data)
    const order = orders.product
    //const orders = order.data
    const productIds = [];
    for (let i = 0; i < order.length; i++) {
      const products = order[i].products; // array of products in the i-th order
      for (let j = 0; j < products.length; j++) {
        const productId = products[j].product;
        productIds.push(productId);
      }
    }
    console.log(productIds); // array of product _ids

    // await cart.populate([
    //   { path: "products.product", select: { reviews: 0 } },
    //   { path: "coupon", select: "couponCode discount expirationDate" },
    // ])

    // const cart = await Cart.findOne({ /* _id: cartId,*/ user: userId })
    //   .populate("products.product")
    //   //.populate("services.service")
    //   .exec();
    // console.log(cart);
    //  const productt = req.params.id;
    // // console.log(productt)

    //  const product = await Product.findById({_id:productt});
    // console.log(product.sellerId)

    //   const orders = await Order.find().lean();
    //  // console.log(orders)
    //   const productIndex = orders.products.findIndex((cartProduct) => {
    //     return cartProduct.product.toString() == product._id;
    //   });

    //   console.log(productIndex)
    // const orders = await Order.find().lean();

    // // Map over each order and fetch the product data using the IDs
    // const ordersWithProducts = await Promise.all(
    //   orders.map(async (order) => {
    //     const products = await Product.find({ _id: { $in: order.products } }).lean();
    //     return { ...order, products };
    //   })
    // );

    // const data = req.query
    // const order = await Order.findById().exec();
    // if (!order) {
    //   return res
    //     .status(404)
    //     .send({ status: false, message: `No order found with ID ${req.params.id}` });
    // }
    // res.status(200).send({ status: true, message: "Success", data: order });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getInvitation = async (req, res) => {
  try {
    const orders = await Order.find({ instellers: { $in: req.params.instellerId }, orderType: "Service", orderStatus: "Pending" }).populate('user services.services').sort({ createdAt: -1 }).exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getUpcommingBooking = async (req, res) => {
  try {
    const orders = await Order.find({ instellerId: req.params.instellerId, orderStatus: "Accept" }).populate('user services.services').sort({ createdAt: -1 }).exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.getBooking = async (req, res) => {
  try {
    const orders = await Order.find({ instellerId: req.params.instellerId, /*orderStatus: "Complete" */ }).populate('user services.services').sort({ createdAt: -1 }).exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.acceptInvitation = async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId).exec();
    if (!order) {
      return res.status(404).send({ status: false, message: `No order found with ID ${req.body.orderId}`, });
    } else {
      let update = await Order.findByIdAndUpdate({ _id: order._id }, { $set: { instellerId: req.params.instellerId, orderStatus: "Accept", instellers: [] } }, { new: true })
      return res.status(200).send({ status: true, message: "Success", data: update });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.rejectInvitation = async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId).exec();
    if (!order) {
      return res.status(404).send({ status: false, message: `No order found with ID ${req.body.orderId}`, });
    } else {
      let update = await Order.findByIdAndUpdate({ _id: order._id }, { $pull: { instellers: req.params.instellerId } }, { new: true })
      return res.status(200).send({ status: true, message: "Success", data: update });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.giveRating = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).send({ status: false, message: `No order found with ID ${req.body.orderId}`, });
    } else {
      let obj = {
        userId: order.user,
        instellerId: order.instellerId,
        OrderId: order._id,
        message: req.body.message,
        rating: req.body.rating
      }
      let save = await installerReview.create(obj);
      return res.status(200).send({ status: true, message: "Success", data: save });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.ratingListForUser = async (req, res) => {
  try {
    const orders = await installerReview.find({ userId: req.params.instellerId }).populate('userId instellerId OrderId').sort({ createdAt: -1 }).exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.ratingList = async (req, res) => {
  try {
    const orders = await installerReview.find({ instellerId: req.params.instellerId }).populate('userId instellerId OrderId').sort({ createdAt: -1 }).exec();
    return res.status(200).send({ status: true, message: "Success", data: orders });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};
exports.createEmergenceOrder = async (req, res) => {
  try {
    const findService = await Services.findOne({ _id: req.body.serviceId, categoryType: "EmergencyService" });
    if (!findService) {
      return res.status(404).send({ status: false, message: `No such service found` });
    } else {
      let findWallet = await wallet.findOne({ user: req.use._id });
      if (findWallet.balance < findService.payPrice) {
        return res.status(400).send({ status: false, message: `Insufficient Balance` })
      } else {
        const shippingAddress = { address: req.body.address, city: req.body.city, postalCode: req.body.postalCode, country: req.body.country, };
        let obj = {
          user: req.use._id,
          services: findService._id,
          quantity: 1,
          shippingAddress: shippingAddress,
          totalPrice: findService.price,
          unPaid: findService.price - findService.payPrice,
          grandTotal: findService.price,
          orderType: 'Service',
          orderStatus: 'Pending',
        }
        const result = await Order.create(obj);
        if (result) {
          let update = await wallet.findOneAndUpdate({ user: req.use._id }, { $set: { balance: findWallet.balance - findService.payPrice } }, { new: true });
          if (update) {
            return res.status(201).send({ status: true, message: "Success", data: result });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "internal server error ", error: err.message });
  }
};