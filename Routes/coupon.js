const express = require('express')
const coupon = require('../Controller/coupon');
const router = express();
router.post('/', coupon.createCoupon);
router.get('/', coupon.getCoupons);
router.put('/:id', coupon.updateCoupon);
router.delete('/:id', coupon.deleteCoupon)
module.exports = router;



