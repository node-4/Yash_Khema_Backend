const express = require('express');
const router = express.Router();
const SellerController = require('../Controller/SellerController');
const Auth = require('../MiddleWare/Auth');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });
router.post('/', SellerController.addSeller);
router.get('/', Auth.adminMiddleware, SellerController.getAllSeller);
router.post('/signin', SellerController.sellerSignin);
router.put('/', Auth.sellerSignin, upload.single('myField'), SellerController.updateSeller);
router.post('/otpsend', SellerController.sendMail);
router.delete('/:sellerId', SellerController.deleteSeller)
// router.post('/change-password', UserController.changePassword);



module.exports = router
