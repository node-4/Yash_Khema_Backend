const express = require('express');
const installingPartnerController = require('../Controller/installingPartner');

const router = express();

router.post('/installing-partners', installingPartnerController.createPartner);
router.get('/installing-partners', installingPartnerController.getAllPartners);
router.get('/installing-partnersById/:id', installingPartnerController.getPartnerById)
router.put('/updatePartnerById/:id', installingPartnerController.updatePartner)
router.delete('/deletePartnerById/:id', installingPartnerController.deletePartner)
router.get('/getAllPartnersByInstaller/:instellers', installingPartnerController.getAllPartnersByInstaller);

module.exports = router;