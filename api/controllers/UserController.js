/**
 * UserController
 * 
 * @module :: Controller
 * @description :: A set of functions called `actions`.
 * 
 * Actions contain code telling Sails how to respond to a certain type of
 * request. (i.e. do stuff, then send some JSON, show an HTML page, or redirect
 * to another URL)
 * 
 * You can configure the blueprint URLs which trigger these actions
 * (`config/controllers.js`) and/or override them with custom routes
 * (`config/routes.js`)
 * 
 * NOTE: The code you write here supports both HTTP and Socket.io automatically.
 * 
 * @docs :: http://sailsjs.org/#!documentation/controllers
 */

var activator = null;
var bcrypt = require('bcrypt-nodejs');

function initConfig(){
	if(activator != null)
		return;

	activator = require("activator");
	
	var model = {
			find : function(id, cb) {
				User.findOneByUserid(id).exec(cb);
			},
			save : function(id, data, cb) {
				User.update({
					"userid" : id
				}, data).exec(cb);
			}
		}
	
	

//		var url = "smtp://" + sails.config.connections.email.emailId + ":"
//			+ sails.config.connections.email.emailPsd + ""
//			+ sails.config.connections.email.host + ":"
//			+ sails.config.connections.email.port;
	
	var url = {
			host : sails.config.connections.email.host,
			port : sails.config.connections.email.port,
			from : "Hapkido Hangookdo Account Service ✔ <hangookdo@gmail.com>",
			domain : "Hangookdo",
			secure : false,
			protocol: "SMTP"
	}
	
	url.auth = {
		     user: sails.config.connections.email.emailId,
		     pass: sails.config.connections.email.emailPsd
		 }
	
	var mailTemplatesDir = __dirname + "/../../assets/mail_template/";
	
	var config = {
		user : model,
		url : url,
		templates : mailTemplatesDir
	};

	activator.init(config);
}

function isValidUser(user){
	if(!user.userid)
		return false;
	if(!user.password)
		return false;
	if(!user.firstname)
		return false;
	if(!user.lastname)
		return false;
	if(!user.email)
		return false;
	
	return true;
}

module.exports = {
		
	checkid: function(req, res){
		
		var userid = req.param("userid");
		
		User.findOneByUserid(userid).exec(function(err, user) {
			if (err) {
				res.send(500, {
					error : "DB Error"
				});
			} else if (user) {
				res.send(200, {
					isAvailable : false
				});
			}else{
				res.send(200, {
					isAvailable : true
				});
				
			}
		});
	},
	checkemail: function(req, res){
		
		var email = req.param("email");
		
		User.findOneByEmail(email).exec(function(err, user) {
			if (err) {
				res.send(500, {
					error : "DB Error"
				});
			} else if (user) {
				res.send(200, {
					isAvailable : false
				});
			}else{
				res.send(200, {
					isAvailable : true
				});
				
			}
		});
	},
	register : function(req, res) {
		
		
		initConfig();
		
		var newUser = {}; 
		newUser.userid = req.param("userid");
		newUser.password = req.param("password");
		newUser.firstname = req.param("firstname");
		newUser.lastname = req.param("lastname");
		newUser.email = req.param("email");
		
		if(!isValidUser(newUser)){
			res.send(400, {
				error : "Not all the parameter has been submitted or Invalid parameter were summited."
			});
			return;
		}
		
		User.findOneByUserid(newUser.userid).exec(function(err, user) {
			if (err) {
				res.send(500, {
					error : "DB Error"
				});
				return;
			} else if (user) {
				res.send(400, {
					error : "Username already Taken"
				});
				return;
			} else {
				User.create({
					userid : newUser.userid,
					firstname : newUser.firstname,
					lastname : newUser.lastname,
					email : newUser.email,
					password : newUser.password
				}).exec(function(error, user) {
					
					if (error) {
						res.send(500, {
							error : "There are already existing email used by other account."
						});
						return;
					} else {
						console.log("user created - from usercontroller.");
						// res.send();
						// req.session.user = user;
						req.activator = {
							id : user.userid,
							body: "activation required.",
							firstname: user.firstname,
							lastname: user.lastname
						};

						activator.createActivateNext(req, res, function(code) {
							console.log("waiting for activation");
							if(req.activator.code == 201){
								
//								req.session.authenticated = true;
//								 req.session.user = {
//											"id": user.userid,
//											"isUserActive":false
//								 }
								 
								 res.send(200, {
									 message: "We have sent email for activation. Please activate your account."
								 });
							}else{
								res.send(500, {
									error: "Failed to send activation email. "
								});
							}
						});
					}
				});
			}
		});
	},

	login : function(req, res) {
		initConfig();

		var id = req.param("id");
		var password = req.param("password");
		var userinfo = null;

		User.findOneByUserid(id).exec(tryAuthenticate);

		function tryAuthenticate(err, user) {
			
			if(!user){
				res.send(403,{error: "Invalid user id."});
				return;
			}
			
			userinfo = user;
			
			if(userinfo.hasOwnProperty("accesscount"))
				if(userinfo.accesscount > 4){
					res.send(403,{error: "Log in attempts to this account have exceeded 5 times. Please reset your password."});
					return;
				}
			
// console.log("Retrieved User ID:" + userinfo.userid
// + " \nRetrieved User Pass:" + userinfo.password
// + " \nRetrieved User First Name:" + userinfo.firstname
// + " \nRetrieved User Last Name:" + userinfo.lastname
// + " \nRetrieved User Email:" + userinfo.email
// + " \nRetrieved User Role:" + userinfo.role
// + " \nRetrieved User Active:" + userinfo.activated);
			
			
			var result = bcrypt.compareSync(password, userinfo.password); 
			
			if (result) {
//				req.session.authenticated = true;
				userinfo.accesscount = 0;
				
				User.update({
					"userid" : userinfo.userid
				}, {accesscount:userinfo.accesscount}).exec(function(){
				
					if(userinfo.activation_code == "X"){
//						req.session.user = {
//								"id": id,
//								"isUserActive":true
//						}
						_.extend(userinfo,{"isUserActive":true});
						res.send(200,{user: userinfo, token: sailsTokenAuth.issueToken(userinfo)});
						
					}else{
						req.session.user = {
								"id": id,
								"isUserActive":false
						}
						_.extend(userinfo,{"isUserActive":false});
						res.send(200,{user: userinfo});
						
					}
					
				});
			} else {
				
//				delete req.session.authenticated;
//				delete req.session.user;
				
				if(userinfo.accesscount)
					userinfo.accesscount++;
				else
					userinfo.accesscount = 1;
				
				User.update({
					"userid" : userinfo.userid
				}, {accesscount:userinfo.accesscount}).exec(function(){
					
					var remainingAttempts = 5 - userinfo.accesscount;
					messageContent = "Invalid password. You have " + remainingAttempts +" remaining attempts.";
					res.send(403,{error: messageContent});
					
				});
			}
				
			
// bcrypt.compare(password, userinfo.password, sendResult);
//			
//		}

//		function sendResult(err, result) {
//
//			if (!err) {
//				console.log("Authenticated status:" + result);
//			} else {
//				console.log(error);
//			}
//
//			if (result) {
//				req.session.authenticated = true;
//				req.session.user = {
//						"id": id
//				}
//				if(userinfo.activation_code == "X"){
//					req.session.user.isUserActive =true;
//					res.redirect('/');
//				}else{
//					req.session.user.isUserActive =false;
//					res.redirect('/#/activate');
//				}
//			} else {
//				messageContent = "Invalid password. You have ";
//				res.send({message: messageContent});
// res.render('403');
//			}
		}
	},
	activate : function(req, res) {
		initConfig();
		
		activator.completeActivateNext(req, res, function() {
			
			if(req.activator.code == 200){
				res.redirect('/#/active');
			}else{
				res.redirect('/404');
			}
			
		});
		
	},
	sendmail : function(req, res) {
		 initConfig();
		 
		 if(req.session.user.id)
			 console.log(req.session.user.id);
		 else
			 console.log("do something");
		 
		 User.findOneByUserid(req.session.user.id).exec(function(err, user) {
			 req.activator = {
						id : user.userid,
						body: "activation required.",
						firstname: user.firstname,
						lastname: user.lastname
					};
	
			activator.createActivateNext(req, res, function(code) {
				console.log("waiting for activation");
				if(req.activator.code == 201){
					 res.send(200, {
						 message: "We have sent email for activation. Please activate your account."
					 });
				}else{
					res.send(500, {
						error: "Failed to send activation email."
					});
				}
			});
		 });
		 
	},
	
	passwordreset: function(req, res){
		initConfig();
		
		var userid = req.param("userid");
		var email = req.param("email");
		
		User.findOneByUserid(userid).exec(function(err, user) {
			
			if (err) {
				res.send(500, {
					error : "DB Error"
				});
			} else if (user.email === email) {
				
				req.activator = {
						id : user.userid,
						body: "password reset required."
					};
				
				activator.createPasswordResetNext(req, res, function(code) {
					
					if(req.activator.code === 201){
						 res.send(200, {
							 message: "We have sent email for one time password reset. Please reset your password using the link provided."
						 });
					}else if(req.activator.code === 404){
						res.send(404, {
							error: "Invalid user id."
						});
					}else{
						res.send(500, {
							error: "Failed to send password reset email."
						});
					}
				});
				
			}else{
				res.send(400, {
					error : "User id and email does not match."
				});
			}
		});
	},
	
	passwordresetcomplete: function(req, res){
		initConfig();
		
		activator.completePasswordResetNext(req, res, function() {
			
			if(req.activator.code == 200){
				
				var userinfo = req.activator.user;
				
				req.session.PasswordReset = true;
				
				if(userinfo.activation_code == "X"){
					req.session.user = {
							"id": userinfo.userid,
							"isUserActive":true
					}
				}else{
					req.session.user = {
							"id": userinfo.userid,
							"isUserActive":false
					}
				}
				
				res.redirect('/#/reset');
			}else if(req.activator.code == 400){
				res.redirect('/#/invalid');
			}else if(req.activator.code == 404){
				res.redirect('/404');
			}else{
				res.redirect('/500');
			}
			
		});
		
	},
	
	reset: function(req, res){
		
		var userid = req.session.user.id;
		var password = req.param("newpsd");
		
		bcrypt.genSalt(11, function(err, salt) {
// console.log(salt);
			bcrypt.hash(password, salt, null, function(err, hash) {
				if(err){
					res.send(500, {
						error: "Failed to save new password."
					});
					return;
				}
				
				var newPassword = hash;
				
// console.log("done created..." + values.userid);
				
				User.update({
					"userid" : userid
				}, {password: newPassword}).exec(function(err){
					if(err){
						res.send(500, {
							error: "Failed to save new password."
						});
					}else{
						res.send(200, {
							 message: "We have updated your password. Please login with your new password"
						 });
					}
				});
			});
		});
		
		
	},

	/**
	 * Overrides for the settings in `config/controllers.js` (specific to
	 * UserController)
	 */
	_config : {}

};
