/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var ObjectID = require('sails-mongo/node_modules/mongodb').ObjectID;

module.exports = {
//		getNews: function(req, res){
//		
//			var id = req.param("id");
//			
//			News.findOne({ id: "54d145506e9681f8186db1bd" }).exec(function(err, news) {
//				if (err) {
//					res.send(500, {
//						error : "DB Error"
//					});
//				} else if (news) {
//					res.send(200, {
//						news : news
//					});
//				}else{
//					res.send(500, {
//						error : "Something is wrong"
//					});
//					
//				}
//			});
//		}
//		,createNews: function(req, res){
//		
//			var number = req.param("number");
//			
//
//
//		},updateNews: function(req, res){
//		
//			var number = req.param("number");
//			
//			News.find({ limit: number, sort: 'createdAt DESC' }).exec(function(err, news) {
//				if (err) {
//					res.send(500, {
//						error : "DB Error"
//					});
//				} else if (news) {
//					res.send(200, {
//						news : news
//					});
//				}else{
//					res.send(500, {
//						error : "Something is wrong"
//					});
//					
//				}
//			});
//		}
//		,deleteNews: function(req, res){
//		
//			var number = req.param("number");
//			
//			News.find({ limit: number, sort: 'createdAt DESC' }).exec(function(err, news) {
//				if (err) {
//					res.send(500, {
//						error : "DB Error"
//					});
//				} else if (news) {
//					res.send(200, {
//						news : news
//					});
//				}else{
//					res.send(500, {
//						error : "Something is wrong"
//					});
//					
//				}
//			});
//		}
		
		view: function(req, res){
			 // override the layout to use another
		    res.locals.layout = 'cmslayout';
		    return res.view('newseditor');
		}
		
};

