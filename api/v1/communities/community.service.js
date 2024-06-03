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

const getAllCommunitiesByCityName = async (city) => {
  return await Community.findAll({
    attributes: ['id'],
    where: { city: city},
});
};

const incrementOpenings = async (place_id) => {
  const community = await Community.findOne({
    where: { place_id: place_id },
  });
  if (community) {
    community.openings += 1;
    return await community.save();
  }
  throw new Error('community not found');
};

const decrementOpenings = async (place_id) => {
  const community = await Community.findOne({
    where: { place_id: place_id },
  });
  if (community) {
    community.openings -= 1;
    return await community.save();
  }
  throw new Error('community not found');
};

module.exports = {
  createCommunity,
  getCommunityByPlaceID,
  getCommunityById,
  updateCommunityByPlaceID,
  updateCommunity,
  deleteCommunityByPlaceID,
  deleteCommunity,
  getAllCommunities,
  getAllCommunitiesByCityName,
  incrementOpenings,
  decrementOpenings
};
