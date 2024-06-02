const { uploadImageFromUrl } = require('../../../s3.config');
const communityInfoService = require('./communityInfo.service');
const communityService = require('../communities/community.service');

const createCommunityInfo = async (req, res, options = {}) => {
  try {
      const placeID = req.body.place_id; 
      console.log("req.body is ", req.body);

      const communityIfExist = await communityInfoService.getCommunityInfoByPlaceID(placeID);
      if (communityIfExist){
        // Amenities Union
        const existingAmenities = new Set(communityIfExist.dataValues.amenities.split(',').map(amenity => amenity.trim()));
        const bodyAmenities = new Set(req.body.amenities.split(',').map(amenity => amenity.trim()));
        const unionAmenities = [...new Set([...existingAmenities, ...bodyAmenities])].join(',');

        // Desciptions Union
        const updatedDescription = communityIfExist.dataValues.communityDescription + " *$%!&^$# " + req.body.communityDescription;

        const updatedCommunityInfoIfExist = { ...req.body, amenities: unionAmenities, communityDescription:updatedDescription};

        const communityInfo = await communityInfoService.updateCommunityInfoByPlaceID(req.body.place_id, updatedCommunityInfoIfExist);
        if(req.from && req.from=='vacancyRequest'){
          return communityInfo;
        }
        res.status(201).json(communityInfo);
      }
      console.log("Seems like it's not exiting from communityIfExist");
      // Pass the transaction if it exists
      const communityInfo = await communityInfoService.createCommunityInfo(req.body, options);
      if (!communityInfo) throw new Error('Failed to create communityInfo');
      if(req.from && req.from=='vacancyRequest'){
        return communityInfo;
      }
      res.status(201).json(communityInfo);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }
};


const getCommunityInfoByCommunityID = async (req, res) => {
    try{
        const communityInfo = await communityInfoService.getCommunityInfoByCommunityID(req.params.community_id);
        if (communityInfo) {
            res.status(200).json(communityInfo);
        } else {
            res.status(404).json({ message: 'CommunityInfo not found' });
        }
    }catch{
        res.status(500).json({ error: error.message });
    }
}

const getCommunityInfoByPlaceID = async (req, res) => {
  try{
      const communityInfo = await communityInfoService.getCommunityInfoByPlaceID(req.params.place_id);
      if (communityInfo) {
          res.status(200).json(communityInfo);
      } else {
          res.status(404).json({ message: 'CommunityInfo not found' });
      }
  }catch{
      res.status(500).json({ error: error.message });
  }
}

const getCommunityInfo = async (req, res) => {
  try {
    const communityInfo = await communityInfoService.getCommunityInfoById(req.params.id);
    if (communityInfo) {
      res.status(200).json(communityInfo);
    } else {
      res.status(404).json({ message: 'CommunityInfo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCommunityInfoByCommunityID = async (req, res) => {
    try {
      const communityInfo = await communityInfoService.updateCommunityInfoByCommunityID(req.params.community_id, req.body);
      res.status(200).json(communityInfo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateCommunityInfoByPlaceID = async (req, res) => {
  const communityInfo = await communityInfoService.updateCommunityInfoByPlaceID(req.params.place_id, req.body);
  res.status(200).json(communityInfo);
  try {
    const communityInfo = await communityInfoService.updateCommunityInfoByPlaceID(req.params.place_id, req.body);
    res.status(200).json(communityInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCommunityInfo = async (req, res) => {
  try {
    const communityInfo = await communityInfoService.updateCommunityInfo(req.params.id, req.body);
    res.status(200).json(communityInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommunityInfoByCommunityID = async (req, res) => {
    try {
      await communityInfoService.deleteCommunityInfoByCommunityID(req.params.community_id);
      res.status(200).json({ message: 'CommunityInfo deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteCommunityInfo = async (req, res) => {
  try {
    await communityInfoService.deleteCommunityInfo(req.params.id);
    res.status(200).json({ message: 'Community deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listCommunitiesInfo = async (req, res) => {
  try {
    const communitiesInfo = await communityInfoService.getAllCommunitiesInfo();
    res.status(200).json(communitiesInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCommunityInfo,
  getCommunityInfoByCommunityID,
  getCommunityInfoByPlaceID,
  getCommunityInfo,
  updateCommunityInfo,
  updateCommunityInfoByCommunityID,
  updateCommunityInfoByPlaceID,
  deleteCommunityInfo,
  deleteCommunityInfoByCommunityID,
  listCommunitiesInfo
};
