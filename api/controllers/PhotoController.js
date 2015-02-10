/**
 * NewsController
 * 
 * @description :: Server-side logic for managing news
 * @help :: See http://links.sailsjs.org/docs/controllers
 */


var cloudinary = require('cloudinary');
var fs = require('fs');

cloudinary.config({ 
	  cloud_name: 'hangookdo', 
	  api_key: '436556581928884', 
	  api_secret: 'KLVV9wFLMeYii-RGFCCZD1pTzRg' 
});

module.exports = {
		
		upload: function(req, res){
			
			res.setTimeout(0);
			var photo = null;
			
			// file was not uploaded redirecting to upload
			  if (req.file == undefined) {
				  res.send(500, {
						error : "no file uploaded"
					});
			  }
		      
		      req.file('file').upload(function (err, uploadedFiles){
		    	  if (err) return res.send(500, err);
		    	  
		    	  for(var i = 0; i < uploadedFiles.length; i++){
		    		  
			    	  photo = uploadedFiles[i];
					  // Get temp file path
					  var imageFile = req.file;
					  // Upload file to Cloudinary
					  cloudinary.uploader.upload(photo.fd)
					  .then(function(image){
						    console.log('** file uploaded to Cloudinary service')
						    
						    if(!image){
						    	res.send(500, {
									error : "Error while uploading to cloudinary"
								});
						    }
						    
						    Photo.create(image).exec(function(error, user) {
						    	if (error) {
									res.send(500, {
										error : "Error while creating photo"
									});
								}
						    	
						    	res.send(200, {
									 message: "All the photos have been uploaded."
						    	});
						    	
						    })	
			    	  })
					  .finally(function(){
						  fs.unlink(photo.fd);
						  return;
					  });
		    	  }
		        });
			
		}
		
};

