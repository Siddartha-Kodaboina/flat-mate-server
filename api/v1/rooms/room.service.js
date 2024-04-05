const Room = require('./room.model');

const createRoom = async (roomData, options = null) => {
    return await Room.create(roomData, options);
};

const getRoomByCommunityID = async (community_id) => {
    return await Room.findOne({
        where: { community_id: community_id},
    });
}

const getRoomById = async (id) => {
  return await Room.findByPk(id);
};

const updateRoomByCommunityID = async (community_id, roomData) => {
    const room = await Room.findOne({
        where: {community_id: community_id},
    });
    if (room) {
      return await room.update(roomData);
    }
    throw new Error('room not found');
};

const updateRoom = async (id, roomData) => {
  const room = await Room.findByPk(id);
  if (room) {
    return await room.update(roomData);
  }
  throw new Error('room not found');
};

const deleteRoomByCommunityID = async (community_id) => {
    const room = await Room.findOne({
        where: {community_id: community_id},
    });
    if (room) {
      return await room.destroy();
    }
    throw new Error('room not found');
};

const deleteRoom = async (id) => {
  const room = await Room.findByPk(id);
  if (room) {
    return await room.destroy();
  }
  throw new Error('room not found');
};

const getAllRooms = async () => {
  return await Room.findAll();
};

module.exports = {
  createRoom,
  getRoomByCommunityID,
  getRoomById,
  updateRoomByCommunityID,
  updateRoom,
  deleteRoomByCommunityID,
  deleteRoom,
  getAllRooms
};
