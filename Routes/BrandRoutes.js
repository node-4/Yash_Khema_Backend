const express = require('express');
const router = express.Router();
const BrandController = require('../Controller/BrandController')
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });

router.post('/', upload.single('myField'), BrandController.addBrand);
router.get('/', BrandController.getBrand);
router.put('/:brandid', upload.single('myField'), BrandController.updateBrand);
router.delete('/:brandid', BrandController.deleteBrand);
module.exports = router
