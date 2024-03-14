const express = require('express');
const memberShip = require('../Controller/memberShip');
const router = express();
router.post('/City', memberShip.AddCity);
router.get('/City', memberShip.getAllCity);
router.get('/CityById/:id', memberShip.getByIdCity)
router.delete('/deleteCityById/:id', memberShip.DeleteCity)
router.post('/Society', memberShip.AddSociety);
router.get('/Society', memberShip.getAllSociety);
router.get('/SocietyById/:id', memberShip.getByIdSociety)
router.delete('/deleteSocietyById/:id', memberShip.DeleteSociety)
router.post('/Plans', memberShip.AddPlans);
router.get('/Plans', memberShip.getAllPlans);
router.get('/PlansById/:id', memberShip.getByIdPlans)
router.delete('/deletePlansById/:id', memberShip.DeletePlans)
module.exports = router;