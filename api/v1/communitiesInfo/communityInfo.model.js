const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../postgres-sequelize-db");
const Community = require('../communities/community.model');

class CommunityInfo extends Model {}

CommunityInfo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    communityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'community_id',
      references: {
        model: Community,
        key: 'id',
      },
    },
    amenities: { 
        type: DataTypes.TEXT, 
        allowNull: false,
    },
    averageRent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "avg_rent",
      set(value) {
        this.setDataValue('averageRent', value === "" ? null : value);
      },
      validate: {
        isNumericOrNull(value) {
          console.log('value ', value);
          if (value !== null && value !== "" && isNaN(Number(value))) {
            throw new Error("Please enter a valid average community rent");
          }
        }
      },
    },
    communityDescription: { 
        type: DataTypes.TEXT, 
        allowNull: true,
        field: "description",
    },
    place_id: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    websiteURL: {
        type: DataTypes.STRING, 
        allowNull: true,
        field: "url",
        validate: {
          isUrlOrNull(value) {
            if (value && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value)) {
              throw new Error("Please enter a valid URL");
            }
          }
        },
    },
  },
  {
    sequelize,
    modelName: "CommunityInfo",
    tableName: "community_info",
    timestamps: false,
  }
);

module.exports = CommunityInfo;

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
