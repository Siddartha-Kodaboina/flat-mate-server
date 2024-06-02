const { uploadImageFromUrl } = require('../../../s3.config');
const communityService = require('./community.service');

const createCommunity = async (req, res, options = {}) => {
  try {
      const photoUrls = req.body.photos;

      const bucketName = process.env.AWS_BUCKET_NAME;
      const folderName = req.body.place_id; 

      const communityIfExist = await communityService.getCommunityByPlaceID(folderName);
      if (communityIfExist){
        console.log("Exiting from communityIfExist");
        const updatedCommunity = await communityService.incrementOpenings(folderName);
        if(req.from && req.from=='vacancyRequest'){
          return updatedCommunity;
        }
        res.status(201).json(updatedCommunity);
      }
      console.log("Seems like it's not exiting from communityIfExist");
      const uploadPromises = photoUrls.map((photo, index) => {
          const fileName = `image#${index + 1}.jpg`;
          return uploadImageFromUrl(photo[2], bucketName, folderName, fileName); 
      });
 
      const uploadedImageUrls = await Promise.all(uploadPromises);

      const communityData = {
          ...req.body,
          openings: 1,
          photos: uploadedImageUrls
      };

      const community = await communityService.createCommunity(communityData, options);
      if (!community) throw new Error('Failed to create community');
      if(req.from && req.from=='vacancyRequest'){
        return community;
      }
      res.status(201).json(community);
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
  }
};


const getCommunityByPlaceID = async (req, res) => {
    try{
        const community = await communityService.getCommunityByPlaceID(req.params.place_id);
        if (community) {
            res.status(200).json(community);
        } else {
            res.status(404).json({ message: 'Community not found' });
        }
    }catch{
        res.status(500).json({ error: error.message });
    }
}

const getCommunity = async (req, res) => {
  try {
    const community = await communityService.getCommunityById(req.params.id);
    if (community) {
      res.status(200).json(community);
    } else {
      res.status(404).json({ message: 'Community not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCommunityByPlaceID = async (req, res) => {
    try {
      const community = await communityService.updateCommunityByPlaceID(req.params.place_id, req.body);
      res.status(200).json(community);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateCommunity = async (req, res) => {
  try {
    const community = await communityService.updateCommunity(req.params.id, req.body);
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommunityByPlaceID = async (req, res) => {
    try {
      await communityService.deleteCommunityByUID(req.params.place_id);
      res.status(200).json({ message: 'Community deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteCommunity = async (req, res) => {
  try {
    await communityService.deleteCommunity(req.params.id);
    res.status(200).json({ message: 'Community deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listCommunities = async (req, res) => {
  try {
    const communities = await communityService.getAllCommunities();
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCommunity,
  getCommunityByPlaceID,
  getCommunity,
  updateCommunityByPlaceID,
  updateCommunity,
  deleteCommunityByPlaceID,
  deleteCommunity,
  listCommunities
};
