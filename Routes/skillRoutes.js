const express = require('express');
const router = express.Router();
const SkillsController = require('../Controller/skill');
var multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
        cloud_name: "dbrvq9uxa",
        api_key: "567113285751718",
        api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
                folder: "images/image",
                allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
        },
});
const upload = multer({ storage: storage });

router.post('/addSkills', upload.single('image'), SkillsController.addSkills)
router.get('/get/Skills', SkillsController.getSkills)
router.get('/SkillsById/:id', SkillsController.getSkillsById)
router.post('/addSubSkill', upload.single('image'), SkillsController.addSubSkill)
router.get('/get/SubSkill/:skill', SkillsController.getSubSkill)
router.get('/subSkillById/:id', SkillsController.getsubSkillById)
module.exports = router
