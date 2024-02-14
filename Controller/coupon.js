const Coupon = require('../Models/Coupon');
exports.createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    const result = await coupon.save();
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
exports.getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
exports.getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).send('Coupon not found');
    res.json(coupon);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
exports.updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).exec();
    if (!coupon) return res.status(404).send('Coupon not found');
    res.json(coupon);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id).exec();
    if (!coupon) return res.status(404).send('Coupon not found');
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
