const router = require('express').Router();

const controller = require('../controller');
const { connection, getData } = require('../db');

const { isAdmin, isStudent, isLoggedIn, isNotLoggedIn } = require('../helper');
const { isDue, returnDate } = require('./date_util');

router.get('/create', isAdmin, async (req, res) => {
  return res.render('admin/add_book_transactions.ejs');
})

router.get('/delete/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  await controller.deleteBookTransactionById(id);
  // await controller.markReturnedBookTransactionById(id);
  return res.redirect('/book-transactions');
})

router.get('/', isAdmin, async (req, res) => {
  let result = await controller.getAllBookTransaction();

  result = result.map(x => ({
    ...x,
    return_date : returnDate(x.date, x.borrow_interval),
    late : isDue(x.date, x.borrow_interval),
    date : (new Date(x.date)).toDateString(),
  }))
  return res.render('admin/book_transactions.ejs', { data : result });
})

router.post('/', isAdmin, async (req, res) => {
  const { name, roll_no, book_name, date, duration } = req.body;

  const _duration = Number(duration);
  if (_duration < 0) return res.redirect('/book-transactions/create');

  // update this function from callback to await
  const status = await controller.saveBookTransaction(name, roll_no, book_name, date, duration);
  function delay(time) {
		return new Promise(function(resolve) { 
			setTimeout(resolve, time)
		});
	}

	await delay(1500);
  return res.redirect('/book-transactions');
})

module.exports.router = router;
