var User = require('../proxy/user.js');


/**
 * 渲染登陆页面
 * @param   req 
 * @param   res     
 */
exports.renderLogin = function(req, res) {
	req.session._loginReferer = req.headers.referer;
	res.render('sign/signin');
}

/**
 * 处理登陆请求
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 */
exports.handerLogin = function(req, res, next) {
	
}