const express = require('express');
const router = express.Router();
const BannerController = require('../Controller/BannerController')
const Auth = require('../MiddleWare/Auth')

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });

router.post('/',Auth.adminMiddleware,upload.single('myField'),BannerController.addBanner);
router.get('/',BannerController.getBanner);
router.put('/:bannerid',upload.single('myField'),BannerController.updateBanner);
router.delete('/:bannerid',BannerController.deleteBanner);




module.exports = router
