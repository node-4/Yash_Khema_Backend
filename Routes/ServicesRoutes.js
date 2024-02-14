const express = require('express');
const router = express.Router();
const ServicesController = require('../Controller/ServicesController');
const Auth = require('../MiddleWare/Auth');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });
router.post('/', Auth.sellerSignin, ServicesController.addService);
router.post('/uploadImage', upload.single('image'), ServicesController.uploadImage);
router.get('/', ServicesController.getService);
router.get('/:category/:subCategory', ServicesController.getServiceBycategorySubCategoryId);
router.get('/:Id', ServicesController.getServiceById);
router.put('/:serviceid', upload.single('image'), ServicesController.updateService);
router.delete('/:serviceid', ServicesController.deleteService);
router.get('/seller/:sellerId', ServicesController.getSellelerSellerId)
router.post("/user/createWishlist/:id", Auth.requireSignin, ServicesController.createWishlist);
router.post("/user/removeFromWishlist/:id", Auth.requireSignin, ServicesController.removeFromWishlist);
router.get("/user/myWishlist", Auth.requireSignin, ServicesController.myWishlist);
router.get("/user/getPopularService", ServicesController.getPopularService);

module.exports = router
