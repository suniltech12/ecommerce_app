const { DataTypes } = require("sequelize");
const { sequelize } = require("../datasource");
const { User } = require("./user");
const { Product } = require("./product");

const CartItem = sequelize.define(
  "CartItem",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "CartItems",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);
CartItem.belongsTo(User, { foreignKey: 'userId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { CartItem };
