const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../postgres-sequelize-db");

class Community extends Model {}

Community.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "zipcode",
      validate: {
        isNumeric: {
          args: true,
          msg: "Please enter a valid postal code",
        },
      },
    },
    photos: {
        type: DataTypes.JSONB, 
        allowNull: true,
        field: "photo_urls",
    },
    place_id: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    state_code: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    country_code: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    openings: { 
      type: DataTypes.INTEGER, 
    },
  },
  {
    sequelize,
    modelName: "Community",
    tableName: "community",
    timestamps: false,
  }
);

module.exports = Community;

const _ = {
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
}
