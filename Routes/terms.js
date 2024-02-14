const express = require('express');
const router = express.Router();
const terms = require('../Controller/terms');

router.post('/', terms.create);
router.get('/', terms.get);
router.put('/:id',terms.update );
router.delete('/:id', terms.delete);




module.exports = router
