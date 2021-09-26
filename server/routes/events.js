const router = require('express').Router();

const controller = require('../controller');
const { connection, getData } = require('../db');

const { isAdmin, isStudent, isLoggedIn, isNotLoggedIn } = require('../helper');
const { isDue, returnDate } = require('./date_util');

router.get('/create', isAdmin, async (req, res) => {
  return res.render('admin/add_event.ejs');
})

router.get('/delete/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  await controller.deleteEventById(id);
  // await controller.markReturnedBookTransactionById(id);
  return res.redirect('/');
})

router.get('/list', async (req, res) => {
  let result = await controller.getAllEvents();

  // result = result.map(x => ({
  //   ...x,
  //   return_date : returnDate(x.date, x.borrow_interval),
  //   late : isDue(x.date, x.borrow_interval),
  //   date : (new Date(x.date)).toDateString(),
  // }))
  return res.render('admin/events.ejs', { data : result });
})

router.get('/', async (req, res) => {
  let result = await controller.getAllEvents();

  // result = result.map(x => ({
  //   ...x,
  //   return_date : returnDate(x.date, x.borrow_interval),
  //   late : isDue(x.date, x.borrow_interval),
  //   date : (new Date(x.date)).toDateString(),
  // }))
  return res.json(result);
  // return res.render('admin/book_transactions.ejs', { data : result });
})

router.post('/', isAdmin, async (req, res) => {
  const { text } = req.body;

  // update this function from callback to await
  await controller.addEvent(text);
  function delay(time) {
		return new Promise(function(resolve) { 
			setTimeout(resolve, time)
		});
	}

	await delay(1500);
  return res.redirect('/event/list');
})

module.exports.router = router;
