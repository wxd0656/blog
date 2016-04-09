var Article = require('../models').Article;



/**
 * 根据条件查找文章
 * @param  {[type]}   query    查询条件
 * @param  {[type]}   option   选项
 * @param  {Function} callback 回调
 *  - err 错误信息
 *  - articles 结果列表
 */
exports.getArticles = function (query, option, callback) {
	Article.find(query, {},option, callback);
}


/**
 * 根据条件查找文章数量
 * @param  {[type]}   query    查询条件
 * @param  {Function} callback 回调
 *  - err 错误信息
 *  - count 结果数量
 */
exports.getArticlesCount = function (query, callback) {
	Article.count(query, callback);
}

/**
 * 保存新的文章
 * @param  {[type]}   title       
 * @param  {[type]}   content     
 * @param  {[type]}   articleType 
 * @param  {[type]}   authorId    
 * @param  {Function} callback     
 */
exports.saveNewArticle = function (title, content, articleType, authorId, callback) {
	var article = new Article();

	article.title = title;
	article.content = content;
	article.type = articleType;
	// article.author_id = authorId;

	article.save(callback);
}