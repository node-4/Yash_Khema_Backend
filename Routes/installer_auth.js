const express = require('express');
const installer = require('../Controller/installerController');

const router = express();


router.post('/register', installer.sendOTP);
router.post('/verify', installer.verifyOTP);
router.post('/login', installer.login);
router.put('/:id', installer.UpdateProfile);
router.post('/address/:id', installer.Address);
router.post('/services/:id', installer.AddServices);
router.delete('/:id', installer.DeleteInsteller);
router.get('/all', installer.getAllInstaller);
router.get('/:id', installer.getByInstallerId);
router.post('/add/skillForuser', installer.addskillForuser);
router.post('/add/SubskillForuser/:id', installer.addSubskillForuser);
router.post('/remove/SubskillForuser/:id', installer.removeSubskillForuser);
router.get('/get/skillForuser/:installerId', installer.getskillForuser);
router.get('/get/subSkillForuser/:id', installer.getsubSkillForuser);

router.get('/get/Wallet/:installerId', installer.getWallet);
router.get('/get/transaction/:installerId', installer.allTransactionUser);
router.post('/Wallet/removeMoney/:installerId', installer.removeMoney);
router.post('/Wallet/addCommission/:installerId', installer.addCommission);

module.exports = router;