const express = require('express');
const router = express.Router();
const communityInfoController = require('./communityInfo.controller');

router.get('/', communityInfoController.listCommunitiesInfo);
router.post('/', communityInfoController.createCommunityInfo);
router.get('/community_id/:community_id', communityInfoController.getCommunityInfoByCommunityID);
router.get('/place_id/:place_id', communityInfoController.getCommunityInfoByPlaceID);
router.get('/id/:id', communityInfoController.getCommunityInfo);
router.put('/community_id/:community_id', communityInfoController.updateCommunityInfoByCommunityID);
router.put('/place_id/:place_id', communityInfoController.updateCommunityInfoByPlaceID);
router.put('/id/:id', communityInfoController.updateCommunityInfo);
router.delete('/community_id/:community_id', communityInfoController.deleteCommunityInfoByCommunityID);
router.delete('/id/:id', communityInfoController.deleteCommunityInfo);

module.exports = router;
