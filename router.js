var express = require('express');

var site = require('./controllers/site.js');

var router = express.Router();

// home page
router.get('/', site.index);


module.exports = router;