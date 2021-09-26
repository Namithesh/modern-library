const router = require('express').Router();

const { connection, getData } = require('./db');
const controller = require('./controller');

router.get('/', async (req, res) => {
  const role = req.user ? req.user.role : 'NONE';
  const data = await controller.getAllEvents();
  return res.render('home.ejs', { role, data });
})

// router.use((req, res, next) => {
//     next();
// })

const articles = require('./routes/articles');
const gallery = require('./routes/gallery');
const books = require('./routes/books');
const book_transactions = require('./routes/book_transactions');
const feedbacks = require('./routes/feedbacks');
const users = require('./routes/users');
const events = require('./routes/events');

router.use('/articles', articles.router);
router.use('/gallery', gallery.router);
router.use('/books', books.router);
router.use('/book-transactions', book_transactions.router);
router.use('/feedbacks', feedbacks.router);
router.use('/users', users.router);
router.use('/event', events.router);

///

router.get("/event", (req, res ) => {
  const sql = "select text from event";
  connection.query(sql, (err,rows) => {
    if(err){
        console.log('error ', err);
    } else { 
        res.json(rows[0].text)
    }
  });
});


module.exports.router = router;
