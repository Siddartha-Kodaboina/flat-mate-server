const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../postgres-sequelize-db");
const Community = require('../communities/community.model');
const Customer = require("../customers/customer.model");
const Room = require("../rooms/room.model");

class Vacancy extends Model {}

Vacancy.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'customer_id',
        references: {
          model: Customer,
          key: 'id',
        },
    },
    communityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'community_id',
        references: {
          model: Community,
          key: 'id',
        },
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'room_id',
        references: {
          model: Room,
          key: 'id',
        },
    },
    from: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'from_date',
    },
    to: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'to_date',
    },
    requirements: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tenant_requirements',
    }
  },
  {
    sequelize,
    modelName: "Vacancy",
    tableName: "vacancy",
    timestamps: true,
  }
);

module.exports = Vacancy;

// const _ = { 
//     "customerId": "1",
//     "communityId": "1",
//     "roomId": "1",
//     "from": "2024-04-10",
//     "requirements": "female",
//     "to": "2024-04-24",
// }