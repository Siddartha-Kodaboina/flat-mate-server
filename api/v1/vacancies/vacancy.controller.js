const vacancyService = require('./vacancy.service');
const communityService = require('../communities/community.service');
const customerService = require('../customers/customer.service');
const roomService = require('../rooms/room.service');

const createVacancy = async (req, res) => {
  try {
    console.log("In create vacancy :", req.body);
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
        console.log('Updating Vacancy ', req.params);
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
    const vacancies = await vacancyService.getAllVacancies();
    const communitiesInCity =  await communityService.getAllCommunitiesByCityName(city);
    const communitiesInCityIds = communitiesInCity.map(communityInCity => communityInCity.dataValues.id);
    const filteredVacancies = vacancies.filter((vacancy) => communitiesInCityIds.includes(vacancy.dataValues.id));
    const filteredVacanciesFullDetailsPromises = filteredVacancies.map(async (vacancy) => { 
      const customerObject = await customerService.getCustomerById(vacancy.dataValues.customerId);
      const communityObject = await communityService.getCommunityById(vacancy.dataValues.communityId);
      const roomObject = await roomService.getRoomById(vacancy.dataValues.roomId);
      
      return {
        customerObject,
        communityObject,
        roomObject
      };
    });

    // Use Promise.all to wait for all the promises to resolve
    const filteredVacanciesFullDetails = await Promise.all(filteredVacanciesFullDetailsPromises);
    res.status(200).json({filteredVacanciesFullDetails});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVacancy,
  getVacancyByCommunityID,
  getVacancy,
  updateVacancyByCommunityID,
  updateVacancy,
  deleteVacancyByCommunityID,
  deleteVacancy,
  listVacancies,
  listVacanciesByFilters
};
