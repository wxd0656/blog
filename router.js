var express = require('express');

var site = require('./controllers/site.js');
var sign = require('./controllers/sign.js');

var router = express.Router();

// home page
router.get('/', site.index);

// login page
router.get('/login', sign.renderLogin);


module.exports = router;