const express = require('express');
const router = express.Router();
const contact = require('../Controller/contact');
router.post('/', contact.addContactDetails);
router.get('/', contact.viewContactDetails);
router.delete('/', contact.deleteContactDetails);
module.exports = router
