const vacancyService = require('./vacancy.service');
const communityService = require('../communities/community.service');
const customerService = require('../customers/customer.service');
const roomService = require('../rooms/room.service');

const createVacancy = async (req, res) => {
  try {
    const vacancy = await vacancyService.createVacancy(req.body);
    
    res.status(201).json(vacancy);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getVacancyByCommunityID = async (req, res) => {
    try{
        const vacancy = await vacancyService.getVacancyByCommunityID(req.params.community_id);
        if (vacancy) {
            res.status(200).json(vacancy);
        } else {
        res.status(404).json({ message: 'Vacancy not found' });
        }
    }catch{
        res.status(500).json({ error: error.message });
    }
}

const getAllVacancyByCommunityID = async (req, res) => {
  try{
      const vacancy = await vacancyService.getAllVacancyByCommunityID(req.params.community_id);
      if (vacancy) {
          res.status(200).json(vacancy);
      } else {
      res.status(404).json({ message: 'Vacancy not found' });
      }
  }catch{
      res.status(500).json({ error: error.message });
  }
}

const getVacancy = async (req, res) => {
  try {
    const vacancy = await vacancyService.getVacancyById(req.params.id);
    if (vacancy) {
      res.status(200).json(vacancy);
    } else {
      res.status(404).json({ message: 'Vacancy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVacancyByCommunityID = async (req, res) => {
    try {
      const vacancy = await vacancyService.updateVacancyByCommunityID(req.params.community_id, req.body);
      res.status(200).json(vacancy);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateVacancy = async (req, res) => {
  try {
    const vacancy = await vacancyService.updateVacancy(req.params.id, req.body);
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVacancyByCommunityID = async (req, res) => {
    try {
      await vacancyService.deleteVacancyByUID(req.params.community_id);
      res.status(200).json({ message: 'Vacancy deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteVacancy = async (req, res) => {
  try {
    await vacancyService.deleteVacancy(req.params.id);
    res.status(200).json({ message: 'Vacancy deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listVacancies = async (req, res) => {
  try {
    const vacancies = await vacancyService.getAllVacancies();
    res.status(200).json(vacancies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listVacanciesByFilters = async (req, res) => {
  try {
    const city = req.query.city;

    const communitiesInCity = await communityService.getAllCommunitiesByCityName(city);
    const communityIdsInCity = communitiesInCity.map(community => community.id);

    const openVacancies = await vacancyService.getOpenVacancies();
    const communityIdsWithOpenVacancies = new Set(openVacancies.map(vacancy => vacancy.communityId));

    const communitiesWithOpenVacancies = communitiesInCity.filter(community => 
      communityIdsWithOpenVacancies.has(community.id)
    );

    const filteredCommunitiesFullDetailsPromises = communitiesWithOpenVacancies.map(async (community) => {
      const communityObject = await communityService.getCommunityById(community.id);
      return communityObject;
    });

    const filteredCommunitiesFullDetails = await Promise.all(filteredCommunitiesFullDetailsPromises);

    res.status(200).json({ filteredCommunitiesFullDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const closeVacancy = async (req, res) => {
  const { id } = req.params;
  const { place_id } = req.query;
  try {
    if (place_id) {
      await communityService.decrementOpenings(place_id);
    }
    const vacancy = await vacancyService.closeVacancy(id);
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getClosedVacancyById = async (req, res) => {
  try {
    const id = req.params.id;
    const vacancy = await vacancyService.getClosedVacancyById(id);
    if (vacancy) {
      res.status(200).json(vacancy);
    } else {
      res.status(404).json({ message: 'Closed vacancy not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVacancy,
  getVacancyByCommunityID,
  getAllVacancyByCommunityID,
  getVacancy,
  updateVacancyByCommunityID,
  updateVacancy,
  deleteVacancyByCommunityID,
  deleteVacancy,
  listVacancies,
  listVacanciesByFilters,
  closeVacancy,
  getClosedVacancyById
};
