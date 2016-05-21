
var contact_info = {};
var request = require("request");
var cheerio = require("cheerio");

module.exports = {

	render_homepage: function (req, res) {
		res.view('homepage', {
			error_message: ''
		});
		res.redirect('/register');
	},

	render_register: function (req, res) {
		res.view('register', {
			error_message: ''
		});
	},

	render_news: function (req, res) {
		res.view('news', {
			error_message: ''
		});
	},

	render_profile: function (req, res) {
		var user = all_users[0];
		res.view('profile', {
			user: user || {}
		});
	},

	render_homepage: function (req, res) {
		res.view('home', {
			error_message: ''
		});
	},

	render_contact: function (req, res) {
		res.view('contact', {
			error_message: ''

		});
	},

	render_invite: function (req, res) {
		res.view('invitefriend', {
			error_message: ''

		});
	},

	email: function (req, res) {
		var data = req.body;

		if (data.email) {
			Users.create({
				email: data.email
			}).exec(function (err, user) {
				if (err) {
					console.log(err);
				}
			});
		}
	},

	contactmail: function (req, res) {
		var data = req.body;
		var nodemailer = require("nodemailer");
		var smtpTransport = nodemailer.createTransport('smtps://lastplayus%40gmail.com:Supermario78	@smtp.gmail.com');

		// nodemailer.createTransport("SMTP",{
		// 	service: "Gmail",  // sets automatically host, port and connection security settings
		// 	auth: {
		// 		user: "Alaynfernandez@gmail.com",
		// 		pass: "Supermario78"
		// 	}
		// });

		if (!data.email || !data.message) {
			res.json({
				success: false
			});
			return;

		}

		smtpTransport.sendMail({  //email options
			from: "Last Play <Lastplayus@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
			to: 'Lastplayus@gmail.com', // receiver
			subject: "Last Play Feedback", // subject
			html: "From: " + data.email + " // " + data.message  // body
		}, function(error, response){  //callback
			if(error) {
				console.log('error');
			} else {
				console.log("Message sent.");
			}

			res.json({
				success: true
			});

			smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
		});
	},

	invite: function (req, res) {
		var data = req.body;
		var nodemailer = require("nodemailer");
		var smtpTransport = nodemailer.createTransport('smtps://lastplayus%40gmail.com:Supermario78	@smtp.gmail.com');

		// nodemailer.createTransport("SMTP",{
		// 	service: "Gmail",  // sets automatically host, port and connection security settings
		// 	auth: {
		// 		user: "Alaynfernandez@gmail.com",
		// 		pass: "Supermario78"
		// 	}
		// });

		if (!data.email) {
			res.json({
				success: false
			});
			return;

		}

		smtpTransport.sendMail({//email options
			from: "Last Play <Lastplayus@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
			to: data.email , // receiver
			subject: "Live stream invitation", // subject
			html: "Stream is live on www.Lastplay.live !" // body
		}, function(error, response){  //callback
			if(error) {
				console.log('error');
			} else {
				console.log("Message sent.");
			}

			res.json({
				success: true
			});

			smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
		});
	}
}
