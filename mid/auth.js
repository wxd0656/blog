


/**
 * 登陆检查
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.loginRequire = function(req, res, next) {
	if (!req.session.user || !req.session.user._id) {
		return res.status(403).send('forbidden!');
	}	

	next();
}


/**
 * 设置cookie
 * @param  {[type]} user user对象
 * @param  {[type]} res  [description]
 */
exports.gen_session = function(user, res) {
  var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
  var opts = {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    httpOnly: true
  };
  res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.authUser = function(req, res, next) {
  res.locals.current_user = null;

  if (req.session.user) {
    res.locals.current_user = req.session.user;
  } else {
    // 从cookie中取用户信息
    // var auth_token = req.signedCookies[config.auth_cookie_name];
    // if (!auth_token) {
    //   return next();
    // }

  }
  // console.log(res.locals.current_user);
  next();
}