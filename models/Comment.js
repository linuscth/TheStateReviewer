// Import sequelize
const { Model, DataTypes } = require('sequelize');
// Import connection
const sequelize = require('../config/connection');

class Comment extends Model {}

// Define comment attributes
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;