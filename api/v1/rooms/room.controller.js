const roomService = require('./room.service');

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);
    
    res.status(201).json(room);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getRoomByCommunityID = async (req, res) => {
    try{
        const room = await roomService.getRoomByCommunityID(req.params.community_id);
        if (room) {
            res.status(200).json(room);
        } else {
        res.status(404).json({ message: 'Room not found' });
        }
    }catch{
        res.status(500).json({ error: error.message });
    }
}

const getAllRoomsByCommunityID = async (req, res) => {
  try{
      const room = await roomService.getAllRoomsByCommunityID(req.params.community_id);
      if (room) {
          res.status(200).json(room);
      } else {
      res.status(404).json({ message: 'Room not found' });
      }
  }catch{
      res.status(500).json({ error: error.message });
  }
}

const getRoom = async (req, res) => {
  try {
    const room = await roomService.getRoomById(req.params.id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRoomByCommunityID = async (req, res) => {
    try {
      const room = await roomService.updateRoomByCommunityID(req.params.community_id, req.body);
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateRoom = async (req, res) => {
  try {
    const room = await roomService.updateRoom(req.params.id, req.body);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRoomByCommunityID = async (req, res) => {
    try {
      await roomService.deleteRoomByUID(req.params.community_id);
      res.status(200).json({ message: 'Room deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteRoom = async (req, res) => {
  try {
    await roomService.deleteRoom(req.params.id);
    res.status(200).json({ message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getRoomByCommunityID,
  getAllRoomsByCommunityID,
  getRoom,
  updateRoomByCommunityID,
  updateRoom,
  deleteRoomByCommunityID,
  deleteRoom,
  listRooms
};
