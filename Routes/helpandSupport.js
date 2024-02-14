const express = require('express');
const help = require('../Controller/helpandsupport');

const router = express();


router.post('/', help.Add);
router.get('/', help.getAll);
router.delete('/:id', help.Delete)



module.exports = router;
