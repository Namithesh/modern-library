const router = require('express').Router();

const { getImageName, getImagePath } = require('./image_util');

const controller = require('../controller');
const { connection, getData } = require('../db');

const { isAdmin, isStudent, isLoggedIn, isNotLoggedIn } = require('../helper');

router.get('/add', isAdmin, async (req, res) => {
  return res.render('admin/add_gallery.ejs');
})

router.get('/', isLoggedIn, async (req, res) => {
  let result = await controller.getAllGallery();
  result = result.map(x => ({
    ...x,
    upload_date : (new Date(x.upload_date)).toDateString(),
  }))
  const role = req.user ? req.user.role : 'NONE';
  if (req.user && req.user.role === 'ADMIN') return res.render('admin/gallery.ejs', { data : result, role : role });
  return res.render('student/gallery.ejs', { data : result, role : role });
})

router.post('/', async  (req, res) => {

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

  await controller.saveToGallery(image_name);
  
  function delay(time) {
    return new Promise(function(resolve) { 
      setTimeout(resolve, time)
    });
  }

  await delay(300);

  return res.redirect('/gallery');
})

module.exports.router = router;
