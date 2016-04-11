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
	var loginname = req.body.name;
	var password = req.body.pass;

	var loginError = '';
	if (!loginname) {
		loginError = '用户名为空啊！大哥！';
	}else if (!password) {
		loginError = '密码不写登陆个蛋！';
	}

	if (loginError) {
		res.status(422);
		return res.render('sign/signin', { error: '信息不完整。' });
	}

	User.getUserByLoginName(loginname, function(err, user){
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.render('sign/signin', { error: '用户名不存在！' });
		}

		if (password!==user.password) {
			return res.render('sign/signin', { error: '密码错误！' });
		}

		// 权限部分
		req.session.user = user;
		
		var redirect = req.session._loginReferer || '/';
		res.redirect(redirect);
	});	
}

/**
 * 渲染注册页面
 * @param  {[type]} res [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.renderSignup = function(res, res) {
	res.render('sign/signup');
}

/**
 * 处理注册
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.handerSignup = function(req, res, next) {

}