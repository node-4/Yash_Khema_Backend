const express = require('express');
const memberShip = require('../Controller/memberShip');
const Auth = require('../MiddleWare/Auth')
const router = express();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dbrvq9uxa", api_key: "567113285751718", api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4", });
const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "images/image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const upload = multer({ storage: storage });
router.post('/City', memberShip.AddCity);
router.get('/City', memberShip.getAllCity);
router.get('/CityById/:id', memberShip.getByIdCity)
router.delete('/deleteCityById/:id', memberShip.DeleteCity)
router.post('/Society', memberShip.AddSociety);
router.get('/Society', memberShip.getAllSociety);
router.get('/SocietyById/:id', memberShip.getByIdSociety)
router.delete('/deleteSocietyById/:id', memberShip.DeleteSociety)
router.post('/Plans', upload.single('image'), memberShip.AddPlans);
router.get('/Plans', memberShip.getAllPlans);
router.get('/PlansById/:id', memberShip.getByIdPlans)
router.delete('/deletePlansById/:id', memberShip.DeletePlans)
router.post('/takeUserMembership/:id', Auth.requireSignin, memberShip.takeUserMembership);
router.get('/getAllUserMembership', Auth.requireSignin, memberShip.getAllUserMembership);
router.get('/getByIdUserMembership/:id', memberShip.getByIdUserMembership)
router.put('/verifyUserMembership/:id', memberShip.verifyUserMembership);
router.get('/getAllUserMembershipForAdmin', memberShip.getAllUserMembershipForAdmin);
module.exports = router;