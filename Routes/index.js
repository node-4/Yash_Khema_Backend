
const express = require('express');
const route = express.Router();

route.use('/about', require('./aboutUs'));
route.use('/admin', require('./AdminRoutes'));
route.use('/banner', require('./BannerRoutes'));
route.use('/blog', require('./BlogRoutes'));
route.use('/brand', require('./BrandRoutes'));
route.use('/category', require('./CategoryRoutes'));
route.use('/cart', require('./CartRoutes'));
route.use('/coupon', require('./coupon'));
route.use('/feedback', require('./feedback'));
route.use('/help', require('./helpandSupport'));
route.use('/seller', require('./SellerRoutes'));
route.use('/subCategory', require('./subcategory'));
route.use('/privacy', require('./privacy'))
route.use('/terms', require('./terms'));
route.use('/user', require('./UserRoutes'));
route.use('/installer', require('./installer_auth'));
route.use('/installingPartner', require('./installingPartner'))
route.use('/skill', require('./skillRoutes'));
route.use('/seller', require('./SellerRoutes'));
route.use('/service', require('./ServicesRoutes'));
route.use('/order', require('./order'))
route.use('/notify', require('./notification'))

module.exports = route
