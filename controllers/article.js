
var config = require('../config.js');
var logger = require('../common/logger.js');
var Article = require('../proxy/article.js');
var md = require('../common/markdown.js');

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

	Article.saveNewArticle(title, content, articleType, req.session.user._id, function(err, article){
		if (err) {
			logger.dblogger.error('save new article error : ' + err.message);
			return next(err);
		}
		res.redirect('/');
	});
}


/**
 * 删除文章
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.deleteArticle = function(req, res, next) {
	var aid = req.params.aid;

	Article.deleteArticleById(aid, function(err) {
		if (err) {
			res.send({ success: false, message: err.message });
		} else {
			res.send({ success: true, message: '成功删除！'});
		}
	});
}


/**
 * 置顶文章
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.topArticle = function(req, res, next) {
	var aid = req.params.aid;

	Article.topArticleById(aid, function(err) {
		if (err) {
			res.send({ success: false, message: err.message});
		} else {
			res.send({ success: true, message: '成功置顶！'});
		}
	});
}


/**
 * 文章详情
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.articleDetial = function(req, res, next) {
	var aid = req.params.aid;

	Article.getArticleById(aid, function(err, article) {
		if (err) {
			return res.render404('文章不存在或已被删除。');
		} else {
			// 浏览数加一
			article.visit_count++;
			article.save();

			article.mdContent = md.markdown(article.content);
			res.render('article/detial', {article:article});
		}
	});
}

/**
 * 显示编辑页面
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.renderEdit = function(req, res, next) {
	var aid = req.params.aid;

	Article.getArticleById(aid, function(err, article) {
		if (err) {
			return res.render404('文章不存在或已被删除。');
		} else {
			if (req.session.user._id == article.author_id) {
				res.render('article/edit', {
					action:'edit', 
					aid: article._id,
					type: article.type,
					types: config.article_type, 
					title:article.title, 
					content:article.content
				});
			} else {
				res.render('error',{message:'对不起，你不能编辑此文章。'});
			}
		}
	});
}



exports.editArticle = function(req, res, next) {
	var aid = req.params.aid;
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

	Article.updateArticleById(aid, title, content, articleType, function(err, article){
		if (err) {
			logger.dblogger.error('save new article error : ' + err.message);
			return next(err);
		}
		res.redirect('/article/'+aid);
	});
}