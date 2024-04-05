const express = require('express');
const router = express.Router();
const communityController = require('./community.controller');

router.get('/', communityController.listCommunities);
router.post('/', communityController.createCommunity);
router.get('/place_id/:place_id', communityController.getCommunityByPlaceID);
router.get('/id/:id', communityController.getCommunity);
router.put('/place_id/:place_id', communityController.updateCommunityByPlaceID);
router.put('/id/:id', communityController.updateCommunity);
router.delete('/place_id/:place_id', communityController.deleteCommunityByPlaceID);
router.delete('/id/:id', communityController.deleteCommunity);

module.exports = router;
