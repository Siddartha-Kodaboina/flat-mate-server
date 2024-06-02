const express = require('express');
const router = express.Router();
const vacancyController = require('./vacancy.controller');

router.get('/', vacancyController.listVacancies);
router.get('/filters', vacancyController.listVacanciesByFilters);
router.post('/', vacancyController.createVacancy);
router.get('/community_id/:community_id', vacancyController.getVacancyByCommunityID);
router.get('/all/community_id/:community_id', vacancyController.getAllVacancyByCommunityID);
router.get('/id/:id', vacancyController.getVacancy);
router.get('/id/:id/closed', vacancyController.getClosedVacancyById);
router.get('/closed_id/:id', vacancyController.getVacancy);
router.put('/community_id/:community_id', vacancyController.updateVacancyByCommunityID);
router.put('/id/:id', vacancyController.updateVacancy);
router.delete('/community_id/:community_id', vacancyController.deleteVacancyByCommunityID);
router.delete('/id/:id', vacancyController.deleteVacancy);
router.post('/close/:id', vacancyController.closeVacancy);

module.exports = router;
