const express = require('express');
const router = express.Router();
const vacancyRequestController = require('./vacancyRequest.controller');

router.post('/', vacancyRequestController.createVacancyRequest);

module.exports = router;
