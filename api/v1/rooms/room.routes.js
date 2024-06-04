const express = require('express');
const router = express.Router();
const roomController = require('./room.controller');

router.get('/', roomController.listRooms);
router.post('/', roomController.createRoom);
router.get('/community_id/:community_id', roomController.getRoomByCommunityID);
router.get('/all/community_id/:community_id', roomController.getAllRoomsByCommunityID);
router.get('/id/:id', roomController.getRoom);
router.put('/community_id/:community_id', roomController.updateRoomByCommunityID);
router.put('/id/:id', roomController.updateRoom);
router.delete('/community_id/:community_id', roomController.deleteRoomByCommunityID);
router.delete('/id/:id', roomController.deleteRoom);

module.exports = router;
// to crearte a dummy pipeline push