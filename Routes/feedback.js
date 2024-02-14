const express = require('express');
const router = express.Router();
const feedback = require('../Controller/feedback');

router.post('/', feedback.AddFeedBack);
router.get('/', feedback.getAll);
router.delete('/:id', feedback.DeleteFeedBack);




module.exports = router
