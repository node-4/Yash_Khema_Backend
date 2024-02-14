const express = require('express');
const notify = require('../Controller/notification');



const router = express();

router.post('/', notify.AddNotification);
router.get('/', notify.GetAllNotification);
router.get('/:id', notify.GetBYNotifyID);
router.delete('/:id', notify.deleteNotification);




module.exports = router;