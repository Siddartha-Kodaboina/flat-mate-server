const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../postgres-sequelize-db");
const Community = require('../communities/community.model');

class Room extends Model {}

Room.init(
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
    totalBedRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "bedrooms_count",
      validation: {
        isNumeric: {
            args: true,
            msg: "Please enter a valid total bedrooms value",
        },
      }
    },
    bathRooms: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "bathrooms_count",
      validation: {
        isNumeric: {
            args: true,
            msg: "Please enter a valid total bathrooms value",
        },
      }
    },
    maleCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "male_adults",
        validation: {
            isNumeric: {
                args: true,
                msg: "Please enter a valid malecount value",
            },
        }
    },
    femaleCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "female_adults",
        validation: {
            isNumeric: {
                args: true,
                msg: "Please enter a valid femalecount value",
            },
        }
    },
    sharingType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "sharing_type",
        validation: {
            isNumeric: {
                args: true,
                msg: "Please enter a valid sharing type value",
            },
        }
    },
    monthlyRent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "monthly_rent",
        validation: {
            isNumeric: {
                args: true,
                msg: "Please enter a valid monthly rent value",
            },
        }
    },
    utilitiesCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "utilities_cost",
        validation: {
            isNumeric: {
                args: true,
                msg: "Please enter a utilities cost value",
            },
        }
    },
    amenities: { 
        type: DataTypes.STRING, 
        allowNull: false,
    },
    do: {
        type: DataTypes.STRING,
    },
    dont: {
        type: DataTypes.STRING,
    },
    roomDescription: { 
        type: DataTypes.STRING, 
        allowNull: true,
        field: "description",
    },
    photos: {
        type: DataTypes.JSONB, 
        allowNull: true,
        field: "photo_urls",
    },
  },
  {
    sequelize,
    modelName: "Room",
    tableName: "room",
    timestamps: false,
  }
);

module.exports = Room;

// const _ = { 
//     "amenities": "Cable/Satellite TV Ready",
//     "bathRooms":"1",
//     "do":"Keep Noise Levels Down",
//     "femaleCount":"1",
//     "maleCount":"1",
//     "monthlyRent":"1",
//     "sharingType":"1",
//     "totalBedRooms":"1",
//     "utilitiesCost":"1",
//     "communityId": "1"
// }