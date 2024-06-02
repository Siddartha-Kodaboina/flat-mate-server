const Vacancy = require('./vacancy.model');

const createVacancy = async (vacancyData, options = null) => {
    return await Vacancy.create(vacancyData, options);
};

const getVacancyByCommunityID = async (community_id) => {
    return await Vacancy.findOne({
        where: { community_id: community_id, status: 'open' },
    });
}

const getAllVacancyByCommunityID = async (community_id) => {
  return await Vacancy.findAll({
      where: { community_id: community_id, status: 'open' },
      order: [['createdAt', 'DESC']]
  });
}

const getVacancyById = async (id) => {
  return await Vacancy.findOne({
    where: { id: id, status: 'open' },
  });
};

const updateVacancyByCommunityID = async (community_id, vacancyData) => {
    const vacancy = await Vacancy.findOne({
        where: { community_id: community_id, status: 'open' },
    });
    if (vacancy) {
      return await vacancy.update(vacancyData);
    }
    throw new Error('vacancy not found');
};

const updateVacancy = async (id, vacancyData) => {
  const vacancy = await Vacancy.findOne({
    where: { id: id, status: 'open' },
  });
  if (vacancy) {
    return await vacancy.update(vacancyData);
  }
  throw new Error('vacancy not found');
};

const deleteVacancyByCommunityID = async (community_id) => {
    const vacancy = await Vacancy.findOne({
        where: { community_id: community_id, status: 'open' },
    });
    if (vacancy) {
      return await vacancy.destroy();
    }
    throw new Error('vacancy not found');
};

const deleteVacancy = async (id) => {
  const vacancy = await Vacancy.findOne({
    where: { id: id, status: 'open' },
  });
  if (vacancy) {
    return await vacancy.destroy();
  }
  throw new Error('vacancy not found');
};

const getAllVacancies = async () => {
  return await Vacancy.findAll({
    where: { status: 'open' },
  });
};

const closeVacancy = async (vacancyId) => {
  const vacancy = await Vacancy.findByPk(vacancyId);
  if (vacancy) {
    vacancy.status = 'closed';
    await vacancy.save();
    return vacancy;
  }
  throw new Error('Vacancy not found');
};

const getClosedVacancyById = async (id) => {
  return await Vacancy.findOne({
    where: { id, status: 'closed' },
  });
};

const getOpenVacancies = async () => {
  return await Vacancy.findAll({
    where: { status: 'open' }
  });
};

module.exports = {
  createVacancy,
  getVacancyByCommunityID,
  getAllVacancyByCommunityID,
  getVacancyById,
  updateVacancyByCommunityID,
  updateVacancy,
  deleteVacancyByCommunityID,
  deleteVacancy,
  getAllVacancies,
  closeVacancy,
  getClosedVacancyById,
  getOpenVacancies
};
