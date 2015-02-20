/**
 * NewsController
 * 
 * @description :: Server-side logic for managing news
 * @help :: See http://links.sailsjs.org/docs/controllers
 */



module.exports = {
		
		upload: function(req, res){
			
			var cloudinary = sails.config.connections.cloudinary;
			
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
					  // Get temp file path
			    	  photo = uploadedFiles[i];

			    	  var filename = photo.filename;
					  // Upload file to Cloudinary
					  cloudinary.uploader.upload(photo.fd)
					  .then(function(image){
						    console.log('** file uploaded to Cloudinary service')
						    
						    if(!image){
						    	res.send(500, {
									error : "Error while uploading to cloudinary"
								});
						    }
						    
						    image.name = filename;
						    
						    Photo.create(image).exec(function(error, user) {
						    	if (error) {
									res.send(500, {
										error : "Error while creating photo"
									});
								}
						    	
						    	res.send(200, {
									 message: "All the photos have been uploaded.",
									 data: image
						    	});
						    	
						    })	
			    	  })
					  .finally(function(){
						  fs.unlink(photo.fd);
						  return;
					  });
		    	  }
		        });
			
		},
		
		count: function(req, res){
			
			Photo.count().exec(function(err, number){
				if (err) {
					res.send(500, {
						error : "Error while counting photo"
					});
				}
				
				res.send(200, {
					message: "Count done.",
					number: number
		    	});
			});
		}
		
};

