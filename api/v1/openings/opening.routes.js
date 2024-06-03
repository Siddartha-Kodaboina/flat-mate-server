const express = require('express');
const router = express.Router();
const openingController = require('./opening.controller');
const communityController = require('../communities/community.controller');

router.get('/:userId/current', openingController.getUserCurrentOpenings);
router.get('/:userId/closed', openingController.getUserClosedOpenings);
router.put('/:place_id/decrement', communityController.decrementOpenings);

module.exports = router;
