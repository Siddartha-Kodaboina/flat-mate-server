const sequelize = require("../../../postgres-sequelize-db");
const Customer = require("../customers/customer.model");
const Community = require("../communities/community.model");
const Room = require("../rooms/room.model");
const Vacancy = require("../vacancies/vacancy.model");
const CommunityInfo = require("../communitiesInfo/communityInfo.model");

// Define associations
Community.hasMany(Vacancy, { foreignKey: 'communityId' });
Customer.hasMany(Vacancy, { foreignKey: 'customerId' });
Room.hasMany(Vacancy, { foreignKey: 'roomId' });
Vacancy.belongsTo(Customer, { foreignKey: 'customerId' });
Vacancy.belongsTo(Community, { foreignKey: 'communityId' });
Vacancy.belongsTo(Room, { foreignKey: 'roomId' });
CommunityInfo.belongsTo(Community, { foreignKey: 'communityId' });

module.exports = {
  sequelize,
  Customer,
  Community,
  Room,
  Vacancy,
  CommunityInfo
};
