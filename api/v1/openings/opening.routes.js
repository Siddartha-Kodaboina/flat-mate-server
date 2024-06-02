const express = require('express');
const router = express.Router();
const openingController = require('./opening.controller');

router.get('/:userId/current', openingController.getUserCurrentOpenings);
router.get('/:userId/closed', openingController.getUserClosedOpenings);

module.exports = router;
