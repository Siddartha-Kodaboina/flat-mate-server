const Community = require('./community.model');

const createCommunity = async (communityData, options = null) => {
    return await Community.create(communityData, options);
};

const getCommunityByPlaceID = async (place_id) => {
    return await Community.findOne({
        where: { place_id: place_id},
    });
}

const getCommunityById = async (id) => {
  return await Community.findByPk(id);
};

const updateCommunityByPlaceID = async (place_id, communityData) => {
    const community = await Community.findOne({
        where: {place_id: place_id},
    });
    if (community) {
      return await community.update(communityData);
    }
    throw new Error('community not found');
};

const updateCommunity = async (id, communityData) => {
  const community = await Community.findByPk(id);
  if (community) {
    return await community.update(communityData);
  }
  throw new Error('community not found');
};

const deleteCommunityByPlaceID = async (place_id) => {
    const community = await Community.findOne({
        where: {place_id: place_id},
    });
    if (community) {
      return await community.destroy();
    }
    throw new Error('community not found');
};

const deleteCommunity = async (id) => {
  const community = await Community.findByPk(id);
  if (community) {
    return await community.destroy();
  }
  throw new Error('community not found');
};

const getAllCommunities = async () => {
  return await Community.findAll();
};

module.exports = {
  createCommunity,
  getCommunityByPlaceID,
  getCommunityById,
  updateCommunityByPlaceID,
  updateCommunity,
  deleteCommunityByPlaceID,
  deleteCommunity,
  getAllCommunities
};
