const router = require('express').Router();
const bcrypt = require('bcrypt');

const controller = require('../controller');
const { connection, getData } = require('../db');

const { isAdmin, isStudent, isLoggedIn, isNotLoggedIn } = require('../helper');

router.get('/add', isAdmin, async (req, res) => {
  return res.render('admin/add_students.ejs');
})

router.get('/', isAdmin, async (req, res) => {

  let data = await controller.getAllUsers();
  // const data = [
  //   {
  //     user_id: 9,
  //     name: 'Admin',
  //     roll_no: '554565',
  //     role: 'ADMIN'
  //   }    
  // ];
  data = data.map(x => ({
    ...x,
    last_login : x.last_login ? (new Date(x.last_login)).toDateString() : '--',
  }))
  return res.render('admin/students.ejs', { data: data });
  // return res.send(result);
})

router.post('/', isAdmin, async (req, res) => {
  
  const { name, roll_no, password } = req.body;
  const role = 'STUDENT';

  const hashedPassword = await bcrypt.hash(password, 10);

  const SQL = 'INSERT INTO auth(name, roll_no, password, role) VALUES(?, ?, ?, ?)';
  const ARGS = [name, roll_no, hashedPassword, role];

  connection.query(
      SQL,
      ARGS,
      function(err, results, fields) {
          if (err) {
              console.log('ERR', err);
              return res.redirect('/users');  
          }

          console.log(results);
          if (results.affectedRows === 1) {
            console.log("User registered:", roll_no, password, hashedPassword);
            return res.redirect('/users');
          }
          return res.redirect('/users');  
      }
  );
})

module.exports.router = router;
