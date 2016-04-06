var mongoose = require('mongoose');
var config   = require('../config');
var logger = require('../common/logger.js');


mongoose.connect(config.db,{
	server: {poolsize: 20}
}, function (err) {
	if (err) {
		logger.dblogger.error('connect to '+ config.db +' error: ' + err.message);
		process.exit(1);
	}
});


//加载各models
require('./user.js');

exports.User = mongoose.model('user');