/**
 * isAuthenticated
 * 
 * @module :: Policy
 * @description :: Simple policy to allow any authenticated user Assumes that
 *              your login action in one of your controllers sets
 *              `req.session.authenticated = true;`
 * @docs :: http://sailsjs.org/#!documentation/policies
 * 
 */
module.exports = function(req, res, next) {

	var token;

	if (req.headers && req.headers.authorization) {
		var parts = req.headers.authorization.split(' ');
		if (parts.length == 2) {
			var scheme = parts[0], credentials = parts[1];

			if (/^Bearer$/i.test(scheme)) {
				token = credentials;
			}
		} else {
			return res.json(401, {
				err : 'Format is Authorization: Bearer [token]'
			});
		}
		
		sailsTokenAuth.verifyToken(token, function(err, userInfo) {
			if (err)
				return res.forbidden('You are not permitted to perform this action.');

			User.findOneByUserid(userInfo.userid).exec(function(err, user) {
				
				if(!user){
					res.send(403,{error: "Invalid user. Please re-login."});
					return;
				}else if(user.role !== 'ADMIN' ){
					res.send(403,{error: "You are not Admin!!. Please re-login with Admin account."});
					return;
				}
				
				req.token = token;
				next();
			});
		});
		
		
	} else if (req.param('token')) {
		token = req.param('token');
		// We delete the token from param to not mess with blueprints
		delete req.query.token;
	} else {
		return res.json(401, {
			err : 'You are not authorize to be here!!'
		});
	}
};
