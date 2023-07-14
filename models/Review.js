const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0,
                max: 5,
            },
        },        
        review_topic: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        review_details: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'state',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
    }
);

module.exports = Review;