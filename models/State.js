// Import sequelize
const { Model, DataTypes } = require('sequelize');
// Import connection
const sequelize = require('../config/connection');

class State extends Model {}

// Define state attributes
State.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'state',
    }
);

module.exports = State;