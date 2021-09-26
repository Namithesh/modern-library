const router = require('express').Router();

const { getImageName, getImagePath } = require('./image_util');

const controller = require('../controller');
const { connection, getData } = require('../db');

const { isAdmin, isStudent, isLoggedIn, isNotLoggedIn } = require('../helper');

router.get('/add', isStudent, async (req, res) => {
  return res.render('student/add_article.ejs');
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('query for article', id);
  let result = await controller.getArticleDetails(id);
  result.data = result.data.map(x => ({
    ...x,
    published_date : (new Date(x.published_date)).toDateString(),
  }))

  console.log('article details--', result.data);

  if (result.data.length > 0) {
    return res.render('student/article_details', {data : result.data[0]});
  }

  return res.sendStatus(404);
})

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;

  await controller.deleteArticleById(id);

  return res.redirect('/articles');
})

router.get('/', isLoggedIn, async (req, res) => {
  let result = await controller.getAllArticles();
  result = result.map(x => ({
    ...x,
    published_date : (new Date(x.published_date)).toDateString(),
  }))
  const role = req.user ? req.user.role : 'NONE';

  if (req.user && req.user.role === 'ADMIN') return res.render('admin/articles.ejs', { data : result, role : role });
  return res.render('student/articles.ejs', { data : result, role : role });
})

router.post('/', async  (req, res) => {
    const { title, data } = req.body;
    const student_name = req.user.name;
    const user_id = req.user.user_id;

    const image = req.files.image;
    console.log('image', image); // the uploaded file object

    const image_name = getImageName();
    const uploadPath = getImagePath(image_name);

    image.mv(uploadPath, function(err) {
      if (err)
        {
          console.log('err', err);
        }
        console.log('image uploaded to', uploadPath);  
    });

    await controller.saveArticle(title, data, student_name, user_id, image_name);
    
    function delay(time) {
      return new Promise(function(resolve) { 
        setTimeout(resolve, time)
      });
    }
  
    await delay(300);

    return res.redirect('/articles');
})

module.exports.router = router;
