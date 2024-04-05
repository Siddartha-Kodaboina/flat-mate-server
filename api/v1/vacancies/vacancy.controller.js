const vacancyService = require('./vacancy.service');

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
    const vacancys = await vacancyService.getAllVacancies();
    res.status(200).json(vacancys);
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
  listVacancies
};
