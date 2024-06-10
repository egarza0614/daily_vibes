const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const express = require('express');
const routes = require('./controllers/homeRoutes'); 
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3002;

const sess = {
  secret: 'secret key',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};


app.use(express.static(path.join(__dirname, 'public')));

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: path.join(__dirname, './views/partials'),
  helpers: path.join(__dirname,'./utils/helpers' )
});
// const hbs = exphbs.create({ helpers });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes); 

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'./views/layouts/main.handlebars'))
// });


// app.post('/submit', (req, res) => {
//   const formData = req.body;
//   console.log(formData);
//   res.redirect('/profile');
// });


// app.get('/profile', (req, res) => {
//   res.sendFile((path.join(__dirname,'./views/layouts/profile.handlebars')))
// });
  

// app.get('/signup',(req,res) => {
//   res.sendFile((path.join(__dirname,'./views/layouts/signup.handlebars')))
// });

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`)
  );
});