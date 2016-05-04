/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var all_users = [
	{username: 'Alayn', password: 'Alayn'}
];
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

	render_login: function (req, res) {
		res.view('login', {
			error_message: '',
			layout: 'login_layout'
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

	render_heat: function (req, res) {
		res.view('heat', {
			error_message: '',
		});
	},

	render_gs: function (req, res) {
		res.view('gs', {
			error_message: '',
		});
	},

	render_contact: function (req, res) {
		res.view('contact', {
			error_message: '',
		});
	},

	login: function (req, res) {
		var found_user, user_exists = false;
		var error_message = '';
		var data = req.body;
		console.log(all_users);

		all_users.forEach(function (user) {
			if (user['username'] != data.username) {
				error_message = 'NO USER FOUND';
				return;
			}
			if (user['password'] != data.password) {
				error_message = 'PASSWORD WRONG';
				return;
			}

			user_exists = true;
			found_user = user;
		});

		if (user_exists == true) {
				res.json({
				success: true
						});
		}

		else {
			res.json({
			success: false,
			error_message: error_message
					});
		}
	},

	register: function (req, res) {
		var user = false;
		var data = req.body;

		user = {
			username: data.username,
			password: data.password,
			email: data.email,
			name: data.name
		}


		if (!data.username || !data.password || !data.email || !data.name) {
			res.json({
			success: false
			});

		}

		else {
			res.json({
				success: true
			});
		}

		all_users.push(user);
	},



	handle_email: function (req, res) {
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

	contactinfo: function (req, res) {
		var data = req.body;
		var nodemailer = require("nodemailer");
		var smtpTransport = nodemailer.createTransport('smtps://Alaynfernandez%40gmail.com:Alaynalayn78	@smtp.gmail.com');

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
			from: "Alayn Fernandez <Alaynfernandez@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
			to: 'Alaynfernandez@gmail.com', // receiver
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


	allgames: function (req, res) {
		request({
    		method: 'GET',
    		url: 'https://www.google.com/#q=nba+games+today'
		},

		function(err, response, body) {
    		if (err) return console.error(err);

			$ = cheerio.load(body);
    		$('div.tb_f').each(function() {
            	var team = $(this).find('div._Ec.lr_etc._zh').html()
				console.log(team)
				res.json({
					success: true
				});
    		});
		});
	}

};
