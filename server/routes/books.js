const router = require('express').Router();

const { getImageName, getImagePath, getFileName, getFilePath } = require('./image_util');

const controller = require('../controller');
const { connection, getData } = require('../db');

const { isAdmin, isStudent, isLoggedIn, isNotLoggedIn } = require('../helper');

router.get('/add', isAdmin, async (req, res) => {
  return res.render('admin/add_book.ejs');
})

router.get('/', isLoggedIn, async (req, res) => {
  let result = await controller.getAllBooks();
  result = result.map(x => ({
    ...x,
    upload_date : (new Date(x.upload_date)).toDateString(),
  }))
  const role = req.user ? req.user.role : 'NONE';
  if (req.user && req.user.role === 'ADMIN') return res.render('admin/books.ejs', { data : result, role : role, search : '' });
  return res.render('student/books.ejs', { data : result, role : role, search : '' });
})

router.post('/search', async (req, res) => {

  const { search } = req.body;

  let result = await controller.getBooksBySearch(search);
  result = result.map(x => ({
    ...x,
    upload_date : (new Date(x.upload_date)).toDateString(),
  }))
  const role = req.user ? req.user.role : 'NONE';
  if (req.user && req.user.role === 'ADMIN') return res.render('admin/books.ejs', { data : result, role : role, search : search });
  return res.render('student/books.ejs', { data : result, role : role, search : search });
})

router.post('/', async  (req, res) => {

  const { title, search_keywords } = req.body;

  const book = req.files.book;
  console.log('book', book); // the uploaded file object

  const file_name = getFileName();
  const uploadPath = getFilePath(file_name);

  book.mv(uploadPath, function(err) {
    if (err)
      {
        console.log('err', err);
      }
      console.log('file uploaded to', uploadPath);  
  });

  await controller.saveBook(title, search_keywords, file_name);
  
  function delay(time) {
    return new Promise(function(resolve) { 
      setTimeout(resolve, time)
    });
  }

  await delay(300);

  return res.redirect('/books');
})

module.exports.router = router;
