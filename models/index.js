const User = require('./User');
const State = require('./State');
const Review = require('./Review');

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

module.exports = { User, State, Review };
