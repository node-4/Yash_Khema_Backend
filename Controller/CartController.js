const Cart = require("../Models/Cart");
const Coupon = require("../Models/Coupon");
const moment = require("moment")
exports.addToCart = async (req, res, next) => {
  try {
    const product = req.params.id;
    let cart = await Cart.findOne({ user: req.user._id, });
    if (!cart) {
      let products = [];
      let obj = { product: product, quantity: 1 };
      products.push(obj)
      cart = await Cart.create({ user: req.user._id, products: products });
      return res.status(200).json({ msg: "product added to cart", data: cart });
    } else {
      if (cart.services.length == 0) {
        const productIndex = cart.products.findIndex((cartProduct) => { return cartProduct.product.toString() == product; });
        if (productIndex < 0) {
          let obj = { product: product, quantity: 1 };
          cart.products.push(obj);
        } else {
          cart.products[productIndex].quantity++;
        }
        await cart.save();
        return res.status(200).json({ msg: "product added to cart", });
      } else {
        return res.status(200).json({ msg: "First Remove service from cart.", });
      }
    }
  } catch (error) {
    next(error);
  }
};
exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    console.log(cart)
    if (!cart) {
      return res.status(200).json({ success: false, msg: "cart", cart: {} })
    } else {
      const cartResponse = await getCartResponse(cart);
      return res.status(200).json({ success: true, msg: "cart", cart: cartResponse })
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
}
exports.createCart = async (userId) => {
  try {
    const cart = await Cart.create({ user: userId });
    return cart;
  } catch (error) {
    throw error;
  }
};
const getCartResponse = async (cart) => {
  try {
    await cart.populate([{ path: "products.product", select: { reviews: 0 } }, { path: "services.services", select: { reviews: 0 } }, { path: "coupon", select: "couponCode discount expirationDate" },]);
    if (cart.coupon && moment().isAfter(cart.coupon.expirationDate, "day")) { cart.coupon = undefined; cart.save(); }
    const cartResponse = cart.toObject();
    let discount = 0;
    let total = 0;
    console.log(cartResponse);
    cartResponse.products.forEach((cartProduct) => {
      cartProduct.total = cartProduct.product.price * cartProduct.quantity;
      total += cartProduct.total;
    });
    cartResponse.services.forEach((cartProduct) => {
      cartProduct.total = cartProduct.services.price * cartProduct.quantity;
      total += cartProduct.total;
    });
    if (cartResponse.coupon) {
      discount = 0.01 * cart.coupon.discount * total;
    }
    cartResponse.subTotal = total;
    cartResponse.discount = discount;
    cartResponse.shipping = 10;
    cartResponse.total = total - discount + 10;

    return cartResponse;
  } catch (error) {
    throw error;
  }
};
exports.addServiceToCart = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    let cart = await Cart.findOne({ user: req.user._id, });
    if (!cart) {
      let services = [];
      let obj = { services: serviceId, quantity: 1 };
      services.push(obj)
      cart = await Cart.create({ user: req.user._id, services: services });
      return res.status(200).json({ msg: "service added to cart", data: cart });
    } else {
      if (cart.products.length == 0) {
        const productIndex = cart.services.findIndex((cartService) => { return cartService.services.toString() == serviceId; });
        if (productIndex < 0) {
          let obj = { services: serviceId, quantity: 1 };
          cart.services.push(obj);
        } else {
          cart.services[productIndex].quantity++;
        }
        await cart.save();
        return res.status(200).json({ msg: "service added to cart", data: cart });
      } else {
        return res.status(200).json({ msg: "First Remove Product from cart.", });
      }
    }

  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id, });
    if (!cart) {
      return res.status(200).json({ msg: "cart not found.", data: cart });
    } else {
      const order = await Cart.findByIdAndDelete({ _id: cart._id })
      return res.status(200).json({ msg: "Cart  delete successfully.", });
    }
  } catch (error) {
    next(error);
  }
};