require('dotenv').config();

const express = require("express");
const app = express();

app.use(require("cors")());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static("client"));
app.use(express.static("static"));
app.use(express.static("images"));
app.use(express.static("files"));

app.set('view engine', 'ejs');

app.use(require('express-fileupload')());

const { isNotLoggedIn } = require('./helper');
//
const passport = require('passport');
const session = require('express-session');

const initializePassport = require('./passport-config');
initializePassport(passport);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./auth').router);

// router.get('/', (req, res) => {
//   return res.render('home.ejs', { role, data });
// })

app.post('/login', isNotLoggedIn, passport.authenticate('local', {
  successRedirect: '/start',
  failureRedirect: '/login',
}));
//

const PORT = process.env.PORT || 3000;
const LOGGING = process.env.LOG || 'false';

const logging = (req, res, next) => {
  console.log(req.method, req.url);
  next();
}

if (LOGGING === 'true') {
  app.use(logging);
}

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

app.use('/', require('./routes').router);

app.use('*', (req, res) => {
  res.sendStatus(404);
});