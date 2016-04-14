var express = require('express');

var site = require('./controllers/site.js');
var sign = require('./controllers/sign.js');
var article = require('./controllers/article.js');

var router = express.Router();

// home page
router.get('/', site.index);

// login page
router.get('/login', sign.renderLogin);
router.post('/login', sign.handerLogin);

router.get('/article/create', article.renderCreateNewArticle);
router.post('/article/create', article.createNewArticle);
router.get('/article/:aid', article.articleDetial);
router.post('/article/:aid/delete', article.deleteArticle);
router.post('/article/:aid/top', article.topArticle);




module.exports = router;