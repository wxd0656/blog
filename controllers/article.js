
var config = require('../config.js');
var logger = require('../common/logger.js');
var Article = require('../proxy/article.js');

/**
 * render the page of CreateNewArticle
 * @param  {[type]}   req  
 * @param  {[type]}   res  
 * @param  {Function} next 
 */
exports.renderCreateNewArticle = function(req, res, next) {
	res.render('article/edit', {types:config.article_type});
}



exports.createNewArticle = function(req, res, next) {
	var title = req.body.title;
	var content = req.body.content;
	var articleType = req.body.article_type;

	var types = config.article_type.map(function(item) {
		return item[0];
	});

	var editError = '';
	if (!title) {
		editError = '标题不能是空的。';
	} else if (!content) {
		editError = '内容不可为空';
	} else if (!articleType || types.indexOf(articleType) == -1) {
		editError = '文章类型不能是空';
	}

	if (editError) {
		return res.render('article/edit', {
			edit_error: editError,
			title: title,
			content: content,
			types: config.article_type
		});
	}

	Article.saveNewArticle(title, content, articleType, 'testid123123', function(err, article){
		if (err) {
			logger.dblogger.error('save new article error : ' + err.message);
			return next(err);
		}
		res.redirect('/');
	});
}