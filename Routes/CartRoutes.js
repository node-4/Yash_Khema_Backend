const express = require('express');
const router = express.Router();
const CartController = require('../Controller/CartController');
const Auth = require('../MiddleWare/Auth')

router.post('/:id', Auth.requireSignin, CartController.addToCart)
router.get('/', Auth.requireSignin, CartController.getCart);
router.post("/createCart", Auth.requireSignin, CartController.createCart);
router.post('/service/:id', Auth.requireSignin, CartController.addServiceToCart)
router.delete('/delete', Auth.requireSignin, CartController.deleteCart)
module.exports = router