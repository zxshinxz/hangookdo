/**
 * EmailController
 * 
 * @description :: Server-side logic for managing Emails
 * @help :: See http://links.sailsjs.org/docs/controllers
 */


function composeMail(firstname, lastname, content, contact){
	var composedMail = {};
	
	composedMail.subject = "This is Email from " + firstname + " " + lastname;
	composedMail.plain = composedMail.subject + " enqury is '" + content + "'"; // plaintext body
	composedMail.html = composedMail.subject + " enqury is " +"<b>" + "'" + content + "'</b>"; // html body
	if(contact){
		composedMail.plain += "  Phone Number: " + contact;
		composedMail.html += "  Phone Number: " + contact;
	}
	
	return composedMail;
}

module.exports = {

	sendmail : function(req, res) {
		
		var smtpTransport = sails.config.connections.email;
		
		var firstname = req.param("firstname");
		var lastname = req.param("lastname");
		var emailaddress = req.param("emailaddress");
		var phone = req.param("phone");
		var content = req.param("content");
		
		var mail = composeMail(firstname, lastname, content, phone);
		
		//setup e-mail data with unicode symbols
		var mailOptions = {
		 from: emailaddress, // sender address
		 to: "yhhong100@gmail.com, andy.yoonyong@gmail.com", // list of receivers
		 subject: mail.subject, // Subject line
		 text: mail.plain, // plaintext body
		 html: mail.html // html body
		 
		}
		
		smtpTransport.sendMail(mailOptions, function(error, response){
			 if(error){
			     console.log(error);
			 }else{
				 console.log("mail sent to: " + emailaddress);
				 res.send("Thank you for contacting NZ Korea " +
				 		"Hangookdo(Hapkido) Federation. We will " +
				 		"reponde to your enquery as soon as possible.");
			 }
		});
	}
};
