const express = require('express');
const router = express.Router();
const AdminController = require('../Controller/AdminController');

router.post('/signup', AdminController.adminSignup)
router.post('/signin', AdminController.adminSignin)
router.post('/otpsend', AdminController.sendMail);
router.post('/change-password', AdminController.changePassword);

module.exports = router
