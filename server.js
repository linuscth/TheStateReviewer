const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const models = require('./models');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;


// Set up sessions with cookies

const sess = {
    // add code
    secret: 'confidential',
  cookie: {
    maxAge: 3600000, // expires in after an hour

  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({force: false }).then(() => {
    app.listen(PORT, () =>
      console.log(
        `\nServer running on port ${PORT}`
      )
    );
  });