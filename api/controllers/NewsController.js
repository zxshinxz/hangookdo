/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;



module.exports = {
		
		view: function(req, res){
			 // override the layout to use another
		    res.locals.layout = 'cmslayout';
		    return res.view('newseditor');
		},
		
};

