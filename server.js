const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const helpers = require('./utils/helpers')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Sequelize Store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}))

// Handlebars Setup
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: path.join(__dirname, './views/partials'),
  helpers: path.join(__dirname, './utils/helpers')
}, { helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname + 'public'));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
const controllers = require('./controllers');
app.use(controllers);

// Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`)
  );
});