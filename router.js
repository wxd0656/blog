var express = require('express');

var site = require('./controllers/site.js');
var sign = require('./controllers/sign.js');
var article = require('./controllers/article.js');
var auth = require('./mid/auth.js');

var router = express.Router();

// home page
router.get('/', site.index);

// login page
router.get('/login', sign.renderLogin);
router.post('/login', sign.handerLogin);
router.get('/logout', sign.logout);

router.get('/article/create', auth.loginRequire, article.renderCreateNewArticle);
router.post('/article/create', auth.loginRequire, article.createNewArticle);
router.get('/article/:aid', article.articleDetial);
router.post('/article/:aid/delete', auth.loginRequire, article.deleteArticle);
router.post('/article/:aid/top', auth.loginRequire, article.topArticle);
router.get('/article/:aid/edit', auth.loginRequire, article.renderEdit);
router.post('/article/:aid/edit', auth.loginRequire, article.editArticle);



module.exports = router;
