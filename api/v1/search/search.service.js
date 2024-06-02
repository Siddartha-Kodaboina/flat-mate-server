const Community = require('../communities/community.model');
const Customer = require('../customers/customer.model');
const Vacancy = require('../vacancies/vacancy.model');
const { Op } = require('sequelize');

const searchCommunities = async (query) => {
  try {
    console.log(`Searching ${query}`);
    
    const communities = await Community.findAll({
      where: {
        [Op.or]: [
          { city: { [Op.iLike]: `%${query}%` } },
          { title: { [Op.iLike]: `%${query}%` } },
          { address: { [Op.iLike]: `%${query}%` } }
        ]
      },
      include: [{
        model: Vacancy,
        where: { status: 'open' },
        required: true
      }]
    });

    console.log(`Found communities: ${communities.length}`);

    const customers = await Customer.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${query}%` } },
          { lastName: { [Op.iLike]: `%${query}%` } },
          { displayName: { [Op.iLike]: `%${query}%` } }
        ]
      },
      include: {
        model: Vacancy,
        where: { status: 'open' },
        include: Community
      }
    });

    const customerCommunities = customers.flatMap(customer =>
      customer.Vacancies.map(vacancy => vacancy.Community)
    );

    const combinedResults = [...communities, ...customerCommunities];
    const uniqueResults = combinedResults.filter(
      (community, index, self) =>
        index === self.findIndex(c => c.id === community.id)
    );

    return uniqueResults;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  searchCommunities
};
