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
				  	public_id : {
						type : 'string',
						required : true,
						notNull : true
					},
					version : {
						type: 'integer'
					},
					width : {
						type: 'integer'
					},
					height:{
						type: 'integer'
			        },
					format : {
						type : 'string'
				    },
					resource_type : {
						type : 'string'
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

