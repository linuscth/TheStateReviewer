const User = require('./User');
const State = require('./State');
const Review = require('./Review');
const Comment = require('./Comment');

// Define model associations
User.hasMany(Review, {
  foreignKey: 'user_id',
});
Review.belongsTo(User, {
  foreignKey: 'user_id',
});

State.hasMany(Review, {
  foreignKey: 'state_id',
});
Review.belongsTo(State, {
  foreignKey: 'state_id',
});

User.hasMany(Comment);
Comment.belongsTo(User);

Review.hasMany(Comment);
Comment.belongsTo(Review);

module.exports = { User, State, Review, Comment };
