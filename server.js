const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Sequelize Store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const {Session} = require('./models'); // Import your session model

const hour = 3600000
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: 'auto',
    expires: new Date(Date.now() + hour)
  },
  store: new SequelizeStore({
    db: sequelize,
    model: Session
  }),
}))

// Handlebars Setup
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: path.join(__dirname, './views/partials'),
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const filterBadWords = require('./middleware/badwords');
app.use(filterBadWords);
// const filterbadwords = require('bad-words');

//Routes
const controllers = require('./controllers');
app.use(controllers);

// Start Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`)
  );
});