const Vacancy = require('./vacancy.model');

const createVacancy = async (vacancyData, options = null) => {
    return await Vacancy.create(vacancyData, options);
};

const getVacancyByCommunityID = async (community_id) => {
    return await Vacancy.findOne({
        where: { community_id: community_id},
    });
}

const getVacancyById = async (id) => {
  return await Vacancy.findByPk(id);
};

const updateVacancyByCommunityID = async (community_id, vacancyData) => {
    const vacancy = await Vacancy.findOne({
        where: {community_id: community_id},
    });
    if (vacancy) {
      return await vacancy.update(vacancyData);
    }
    throw new Error('vacancy not found');
};

const updateVacancy = async (id, vacancyData) => {
  const vacancy = await Vacancy.findByPk(id);
  if (vacancy) {
    return await vacancy.update(vacancyData);
  }
  throw new Error('vacancy not found');
};

const deleteVacancyByCommunityID = async (community_id) => {
    const vacancy = await Vacancy.findOne({
        where: {community_id: community_id},
    });
    if (vacancy) {
      return await vacancy.destroy();
    }
    throw new Error('vacancy not found');
};

const deleteVacancy = async (id) => {
  const vacancy = await Vacancy.findByPk(id);
  if (vacancy) {
    return await vacancy.destroy();
  }
  throw new Error('vacancy not found');
};

const getAllVacancies = async () => {
  return await Vacancy.findAll();
};

module.exports = {
  createVacancy,
  getVacancyByCommunityID,
  getVacancyById,
  updateVacancyByCommunityID,
  updateVacancy,
  deleteVacancyByCommunityID,
  deleteVacancy,
  getAllVacancies
};
