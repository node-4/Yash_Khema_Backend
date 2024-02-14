const express = require('express');
const router = express.Router();
const CategoryController = require('../Controller/CategoryController')
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });

router.post('/', upload.single('myField'), CategoryController.addCategory);
router.get('/', CategoryController.getCategory);
router.put('/:categoryid', upload.single('myField'), CategoryController.updateCategory);
router.delete('/:categoryid', CategoryController.deleteCategory);
router.get('/seller/:Id', CategoryController.getCategoryById);
router.get('/getCategorybyType/:categoryType', CategoryController.getCategorybyType);




module.exports = router
