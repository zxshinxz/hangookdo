/**
* News.js

*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment')
// var markdown = require('markdown').markdown;
var marked = require('marked');
var scrub = require('url-seo-scrubber');

module.exports = {
//			autoPK: false,
			attributes: {
//				 	id: {
//				       type: 'string',
//				       primaryKey: true,
//				       unique: true
//				     },
				  	title : {
						type : 'string',
						maxLength : 50,
						required : true,
						notNull : true
					},
					content : {
						type: 'string',
						maxLength : 10000
					},
					createdBy:{
			            model:'user',
			        },
					comments : {
					      collection: 'comment',
					      via: 'news'
				    },
					tags : {
						collection: 'tag'
					},
					createdAt: function(){
				        return moment(this.createdAt).format('LLL')
				    }
			},

//			afterValidate: function(values, next){
//				values.id = new ObjectID(values.id);
//				next();
//			}
//
//			// Lifecycle Callbacks
//			,beforeCreate: function(values, next) {
//				
//			    	next();
//			},
//			// Lifecycle Callbacks
//			beforeUpdate: function(values, next) {
//			    	next();
//			}
			
			
};

