const express = require('express');
const router = express.Router();
const vacancyController = require('./vacancy.controller');

router.get('/', vacancyController.listVacancies);
router.post('/', vacancyController.createVacancy);
router.get('/community_id/:community_id', vacancyController.getVacancyByCommunityID);
router.get('/id/:id', vacancyController.getVacancy);
router.put('/community_id/:community_id', vacancyController.updateVacancyByCommunityID);
router.put('/id/:id', vacancyController.updateVacancy);
router.delete('/community_id/:community_id', vacancyController.deleteVacancyByCommunityID);
router.delete('/id/:id', vacancyController.deleteVacancy);

module.exports = router;
