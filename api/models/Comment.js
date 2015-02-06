/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	  createdBy: 'string',
	    text: {
    		model:'user',
    		required : true,
    		notNull : true
	    },
	    news: {
	    	model: 'news'
	    },
	    parent: {
	    	model: 'comment',
	    	dominant: true
	    },
	    children: {
	    	collection: 'comment',
	    	via: 'parent'
	    },
	    createdAt: function(){
	      return moment(this.createdAt).format('LLL')
	    }
  }
};

