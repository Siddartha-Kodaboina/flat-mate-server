const CommunityInfo = require('./communityInfo.model');

const createCommunityInfo = async (communityData, options = null) => {
    return await CommunityInfo.create(communityData, options);
};



const getCommunityInfoById = async (id) => {
  return await CommunityInfo.findByPk(id);
};

const updateCommunityInfoByCommunityID = async (community_id, communityData) => {
  const communityInfo = await CommunityInfo.findOne({
      where: {community_id: community_id},
  });
  if (communityInfo) {
    return await communityInfo.update(communityData);
  }
  throw new Error('community not found');
};

const updateCommunityInfoByPlaceID = async (place_id, communityData) => {
  const communityInfo = await CommunityInfo.findOne({
      where: {place_id: place_id},
  });
  if (communityInfo) {
    return await communityInfo.update(communityData);
  }
  throw new Error('community not found');
};


const getCommunityInfoByCommunityID = async (community_id, communityData) => {
    const communityInfo = await CommunityInfo.findOne({
        where: {community_id: community_id},
    });
    if (communityInfo) {
      return await communityInfo.update(communityData);
    }
    throw new Error('community not found');
};

const getCommunityInfoByPlaceID = async (place_id, communityData) => {
  try {
    const communityInfo = await CommunityInfo.findOne({
      where: { place_id: place_id },
    });

    console.log('communityInfo found', communityInfo);

    if (communityInfo) {
      // If communityInfo exists, update it with the provided data
      return await communityInfo.update(communityData);
    } else {
      // If no communityInfo is found, handle this case separately without throwing an error
      return null; // Or you can return a custom message or object indicating no community was found
    }
  } catch (error) {
    // Only throw an error if there is an issue with the database operation
    console.error('Error accessing the database:', error);
    throw new Error('Error accessing the database');
  }
};


const updateCommunityInfo = async (id, communityData) => {
  const communityInfo = await CommunityInfo.findByPk(id);
  if (communityInfo) {
    return await communityInfo.update(communityData);
  }
  throw new Error('community not found');
};

const deleteCommunityInfoByCommunityID = async (community_id) => {
    const communityInfo = await CommunityInfo.findOne({
        where: {community_id: community_id},
    });
    if (communityInfo) {
      return await communityInfo.destroy();
    }
    throw new Error('community not found');
};

const deleteCommunityInfo = async (id) => {
  const communityInfo = await CommunityInfo.findByPk(id);
  if (communityInfo) {
    return await communityInfo.destroy();
  }
  throw new Error('community not found');
};

const getAllCommunitiesInfo = async () => {
  return await CommunityInfo.findAll();
};


module.exports = {
  createCommunityInfo,
  getCommunityInfoByCommunityID,
  getCommunityInfoByPlaceID,
  getCommunityInfoById,
  updateCommunityInfoByCommunityID,
  updateCommunityInfoByPlaceID,
  updateCommunityInfo,
  deleteCommunityInfo,
  deleteCommunityInfoByCommunityID,
  getAllCommunitiesInfo
};
