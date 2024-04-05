const sequelize = require("../../../postgres-sequelize-db");
const customerService = require('../customers/customer.service');
const communityService = require('../communities/community.service');
const roomService = require('../rooms/room.service');
const vacancyService = require('../vacancies/vacancy.service');

const createVacancyRequest = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    console.log("In create vacancy :", req.body);
    if (!req.body.customer.firstName || !req.body.customer.lastName){
        const displayNameList = req.body.customer.displayName.split(' ');
        req.body.customer.firstName = (displayNameList.length >= 1)? displayNameList[0]: '';
        req.body.customer.lastName = (displayNameList.length >= 2)? displayNameList[1]: displayNameList[0];
    }
    const [customer, isCustomerCreated] = await customerService.getOrCreateCustomerByUID(req.body.customer, {transaction});
    const community = await communityService.createCommunity(req.body.community, {transaction});
    console.log("Created customer :", customer.id);
    console.log("isCustomerCreated customer :", isCustomerCreated);
    console.log("Created community :", community.id);
    const room = await roomService.createRoom({
        ...req.body.room, 
        communityId: community.id
    },{transaction});
    
    console.log("Created room :", room.id);
    const vacancy = await vacancyService.createVacancy({
        ...req.body.vacancy,
        customerId: customer.id,
        communityId: community.id,
        roomId: room.id
    }, {transaction});

    // console.log("Created vacancy :", vacancy);
    // await transaction.rollback();
    // console.log("Rollback completed successfully");
    await transaction.commit();
    console.log("transaction commit completed successfully");
    
    res.status(201).json({
        message: "Resource created successfully.",
        data: {
            customer, 
            community, 
            room,
            vacancy
        }
    });
  } catch (error) {
    await transaction.rollback();
    console.log("Rollback completed successfully");
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createVacancyRequest
};

const _ = {
    "customer": {
        "uid": "5LqOmJ5IccWWuO0hwxgbZk3Wrju2",
        "email": "stevesiddu49@gmail.com",
        "displayName": "Steve Siddu",
        "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocLlVATB5CVbGeA-jOINqpacpaHAj1maXSqJ_be1nbCSiQ=s96-c"
    },
    "room" : { 
        "amenities": "Cable/Satellite TV Ready",
        "bathRooms":"1",
        "do":"Keep Noise Levels Down",
        "femaleCount":"1",
        "maleCount":"1",
        "monthlyRent":"1",
        "sharingType":"1",
        "totalBedRooms":"1",
        "utilitiesCost":"1"
    },
    "community": {
        "address": "101 E San Fernando St",
        "amenities": "Parking",
        "averageRent":"",
        "city":"San Jose",
        "communityDescription":"",
        "country":"United States",
        "country_code":"US",
        "housingType":"Community",
        "place_id":"ChIJLwmPeLzMj4ARtVD1DHb1v-0",
        "postal_code":"95112",
        "state":"California",
        "state_code":"CA",
        "title":"101 San Fernando Apartments",
        "websiteURL":"",
    },
    "vacancy": { 
        "from": "2024-04-10",
        "requirements": "female",
        "to": "2024-04-24",
    }
}
