var log4js = require('log4js');

log4js.configure({
	appenders:[
		{type:'console'},
		{type:'file', filename:__dirname+'/log/dblog.log', category:'dblog', maxLogSize: 51200, backups: 1000},
		{type:'file', filename:__dirname+'/log/servicelog.log', category:'servicelog', maxLogSize: 51200, backups: 1000}
	]
});


var dblogger = log4js.getLogger('dblog');
var servicelogger = log4js.getLogger('servicelog');

exports.dblogger = dblogger;
exports.servicelogger = servicelogger;