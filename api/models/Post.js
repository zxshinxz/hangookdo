/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	  title : {
			type : 'String',
			maxLength : 500,
			required : true,
			notNull : true
		},
		body : {
			type: 'String',
			maxLength : 10000,
			required : true,
			notNull : true
		},
		user_id : {
			type : 'String',
			maxLength : 24,
			required : true,
			notNull : true
		},
		category_id : {
			type : 'String',
			maxLength : 24,
			required : true,
			notNull : true
		},
  }
};

