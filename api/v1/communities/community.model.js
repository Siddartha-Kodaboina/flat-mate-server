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
    amenities: { 
        type: DataTypes.STRING, 
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
          if (value !== null && value !== "" && isNaN(Number(value))) {
            throw new Error("Please enter a valid average community rent");
          }
        }
      },
    },
    communityDescription: { 
        type: DataTypes.STRING, 
        allowNull: true,
        field: "description",
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
