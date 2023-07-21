const sequelize = require('../config/connection');
const { Review, State, User, Comment } = require('../models');
var UsaStates = require('usa-states').UsaStates;

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json');

const usStates = new UsaStates();
const myCustomStates = usStates.format({
    '$name': 'name'
});
console.log(myCustomStates);
const seedDb = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userData, { individualHooks: true, returning: true });
    const states = await State.bulkCreate(myCustomStates);
    const reviews = await Review.bulkCreate(reviewData);
    const comments = await Comment.bulkCreate(commentData);

    process.exit(0);

}


seedDb();


// state reference 
// [
//     { name: 'Alabama' },
//     { name: 'Alaska' },
//     { name: 'Arizona' },
//     { name: 'Arkansas' },
//     { name: 'California' },
//     { name: 'Colorado' },
//     { name: 'Connecticut' },
//     { name: 'Delaware' },
//     { name: 'District Of Columbia' },
//     { name: 'Florida' },
//     { name: 'Georgia' },
//     { name: 'Hawaii' },
//     { name: 'Idaho' },
//     { name: 'Illinois' },
//     { name: 'Indiana' },
//     { name: 'Iowa' },
//     { name: 'Kansas' },
//     { name: 'Kentucky' },
//     { name: 'Louisiana' },
//     { name: 'Maine' },
//     { name: 'Maryland' },
//     { name: 'Massachusetts' },
//     { name: 'Michigan' },
//     { name: 'Minnesota' },
//     { name: 'Mississippi' },
//     { name: 'Missouri' },
//     { name: 'Montana' },
//     { name: 'Nebraska' },
//     { name: 'Nevada' },
//     { name: 'New Hampshire' },
//     { name: 'New Jersey' },
//     { name: 'New Mexico' },
//     { name: 'New York' },
//     { name: 'North Carolina' },
//     { name: 'North Dakota' },
//     { name: 'Ohio' },
//     { name: 'Oklahoma' },
//     { name: 'Oregon' },
//     { name: 'Pennsylvania' },
//     { name: 'Rhode Island' },
//     { name: 'South Carolina' },
//     { name: 'South Dakota' },
//     { name: 'Tennessee' },
//     { name: 'Texas' },
//     { name: 'Utah' },
//     { name: 'Vermont' },
//     { name: 'Virginia' },
//     { name: 'Washington' },
//     { name: 'West Virginia' },
//     { name: 'Wisconsin' },
//     { name: 'Wyoming' }
//   ]