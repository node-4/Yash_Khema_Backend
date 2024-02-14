const express = require('express');
const router = express.Router();
const BlogController = require('../Controller/BlogController');
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });

router.post('/',upload.single('image'), BlogController.addBlog);
router.get('/',BlogController.getBlog);
router.put('/:blogid',upload.single('image'),BlogController.updateBlog);
router.delete('/:blogid',BlogController.deleteBlog);


module.exports = router
