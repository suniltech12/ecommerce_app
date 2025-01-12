const { DataTypes } = require("sequelize");
const { sequelize } = require("../datasource");
const { User } = require("./user");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      stock: {
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
    tableName: "Products",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);
Product.belongsTo(User, { foreignKey: 'userId' });

module.exports = { Product };
