var async = require('async');

var config = require('../config.js');
var logger = require('../common/logger.js');
var Article = require('../proxy/article.js');


exports.index = function (req, res, next) {
	var page = parseInt(req.query.page, 10) || 1;
	page = page == 0 ? 1:page;

	var article_type = req.query.article_type || 'all';

	var query = {deleted:false, type:article_type};

	async.parallel([
		function(callback) {
			// 取文章
			var perPage = config.item_per_page_limit;
			var option = {skip:(page-1) * perPage, limit:perPage, sort:'-top -create_at'};
			// var option = null;
			Article.getArticles(query, option, callback);
		},
		function(callback) {
			// 取总页数
			Article.getArticlesCount(query, callback);
		}
	],
	function(err, result) {
		if(err) {
			logger.dblogger.error('index getArticles error: ' + err.message)
			return next();
		}
		var articles = result[0];
		var pages = result[1];
		res.render('index', {
			types: config.article_type,
			type: article_type,
			articles: articles,
			pages: pages,
			current_page: page
		});
	});
}