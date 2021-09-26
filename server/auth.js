const router = require('express').Router();

const { connection, pool } = require('./db');

const { isAdmin, isLoggedIn, isNotLoggedIn } = require('./helper');

const bcrypt = require('bcrypt');

// router.use((req, res, next) => {
//     next();
// })

router.get('/start', isLoggedIn, (req, res) => {
  if (req.user.role === 'ADMIN') return res.redirect('/users');
  return res.redirect('/articles');
});

router.get('/login', isNotLoggedIn, (req, res) => {
  const role = 'NONE';
  res.render('login.ejs', { role });
});

// router.get('/add_user', isAdmin, (req, res) => {
router.get('/add_user', (req, res) => {
  res.render('add_user.ejs');
})

// router.post('/add_user', isAdmin, async (req, res) => {
router.post('/add_user', async (req, res) => {

  const { name, roll_no, password } = req.body;
  // const role = 'STUDENT';
  const role = 'ADMIN';

  const hashedPassword = await bcrypt.hash(password, 10);
  // const hashedPassword = await hashPassword(req.body.password);

  // const result = await saveUser(name, roll_no, hashedPassword, role);

  const SQL = 'INSERT INTO auth(name, roll_no, password, role) VALUES(?, ?, ?, ?)';
  const ARGS = [name, roll_no, hashedPassword, role];

  connection.query(
      SQL,
      ARGS,
      function(err, results, fields) {
          if (err) {
              console.log('ERR', err);
              return res.redirect('/add-error');  
          }

          console.log(results);
          if (results.affectedRows === 1) {
            console.log("User registered:", roll_no, password, hashedPassword);
            return res.redirect('/login');
          }
          return res.redirect('/add-error');  
      }
  );
})

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports.router = router;