const router = require('express').Router();

const controller = require('../controller');
const { connection, getData } = require('../db');

const { isAdmin, isStudent, isLoggedIn, isNotLoggedIn } = require('../helper');

router.get('/form', isLoggedIn, async (req, res) => {
  return res.render('student/add_feedback.ejs');
})

router.get('/', isAdmin, async (req, res) => {
  let result = await controller.getAllFeedback();
  result = result.map(x => ({
    ...x,
    submitted_date : (new Date(x.submitted_date)).toDateString(),
  }))
  return res.render('admin/feedbacks.ejs', { data : result });
})

router.get('/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  console.log('query for feedback', id);
  const result = await controller.getFeedbackDetails(id);

  console.log('feed details--', result.data);

  if (result.data.length > 0) {
    return res.render('admin/feedback_details', {data : result.data});
  }

  return res.sendStatus(404);
})

router.post('/', async (req, res) => {
    console.log('FEEDBACK POSTED');
    console.log('req.body', req.body);
    const { title, data } = req.body;

    const result = await controller.saveFeedback(title, data);

    function delay(time) {
      return new Promise(function(resolve) { 
        setTimeout(resolve, time)
      });
    }
  
    await delay(1500);

    return res.redirect('/login');
})

module.exports.router = router;
