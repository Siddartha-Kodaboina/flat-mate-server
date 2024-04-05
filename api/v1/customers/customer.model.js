const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../../postgres-sequelize-db");

class Customer extends Model {}

Customer.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "last_name",
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "display_name",
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "mobile_number",
      validate: {
        isNumeric: {
          args: true,
          msg: "Please enter a valid mobile number only digits",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email",
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address",
        },
      },
    },
    uid: { type: DataTypes.STRING, allowNull: true, field: "uuid" },
    photoURL: {
      type: DataTypes.STRING(1234),
      allowNull: true,
      field: "dp_url",
      validate: {
        isUrl: {
          args: true,
          msg: "Please enter a valid URL",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customer",
    timestamps: false,
  }
);

module.exports = Customer;
