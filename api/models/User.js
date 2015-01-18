'user strict'
/**
 * User
 * 
 * @module :: Model
 * @description :: A short summary of how this model works and what it
 *              represents.
 * @docs :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes : {

		userid : {
			unique : true,
			type : 'String',
			maxLength : 50,
		    minLength: 6,
			required : true,
			notNull : true
		},
		firstname : {
			type : 'String',
			maxLength : 50,
			required : true,
			notNull : true
		},
		lastname : {
			type : 'String',
			maxLength : 50,
			required : true,
			notNull : true
		},
		email : {
			unique : true,
			type : 'String',
			required : true,
			notNull : true,
			email : true
		},
		password : {
			type : 'String',
			maxLength : 100,
			minLength : 6,
			required : true,
			notNull : true
		},
		role : {
			type : 'String',
		},
		toJSON : function() {
			var obj = this.toObject();
			delete obj.password;
			delete obj.role;
			delete obj.activated;
			delete obj.accesscount;
			delete obj.activation_code;
			delete obj.createdAt;
			delete obj.updatedAt;
			delete obj.id;
			delete obj.password_reset_code;
			delete obj.password_reset_time;
			return obj;
		}
	},

	// Lifecycle Callbacks
	beforeCreate : function(values, next) {
		console.log("start creating...");
		var bcrypt = require('bcrypt-nodejs');
		bcrypt.genSalt(11, function(err, salt) {
//			console.log(salt);
			bcrypt.hash(values.password, salt, null, function(err, hash) {
				if (err)
					return next(err);
				values.password = hash;
				
//				console.log("done created..." + values.userid);
				
				next();
			});
		});
		values.role = "MEMBER";
	}

};
