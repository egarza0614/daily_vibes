const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const express = require('express');
const controllers = require('./controllers');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}))

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: path.join(__dirname, './views/partials'),
  helpers: path.join(__dirname, './utils/helpers')
});
// const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + 'public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(controllers);



sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`)
  );
});