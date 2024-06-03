const { Vacancy, Community } = require('../models');

const getUserCurrentOpenings = async (userId) => {
  try {

    const currentOpenings = await Vacancy.findAll({
      where: { customerId: userId, status: 'open' },
      include: [{ model: Community, attributes: ['title', 'photos', 'place_id'] }],
    });
    console.log(`current openings: ${JSON.stringify(currentOpenings, null, 2)}`);

    return { openings: currentOpenings };
  } catch (error) {
    console.error('Error fetching user openings', error);
    throw new Error('Error fetching user openings');
  }
};

const getUserClosedOpenings = async (userId) => {
  try {

    const closedOpenings = await Vacancy.findAll({
      where: { customerId: userId, status: 'closed' },
      include: [{ model: Community, attributes: ['title', 'photos', 'place_id'] }],
    });

    return { openings: closedOpenings };
  } catch (error) {
    console.error('Error fetching user openings', error);
    throw new Error('Error fetching user openings');
  }
};

module.exports = {
  getUserCurrentOpenings,
  getUserClosedOpenings
}
