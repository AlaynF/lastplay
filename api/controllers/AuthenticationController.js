/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var all_users = [];

module.exports = {
	login: function (req, res) {
		var user_exists = false;
		var error_message = '';
		var data = req.body;



		all_users.forEach(function (user) {
			if (user['username'] != data.username) {
				error_message = 'NO USER FOUND';
				return;
			}
			if (user['password'] != data.password) {
				error_message = 'PASSWORD WRONG';
				return;
			}

			user_exists = true
		});


		if (user_exists == true) {
				res.redirect('/profile');
		}
		else {
				res.send(error_message);
		}
	},

	register: function (req, res) {
		var user;
		var data = req.body;


		user = {
			username: data.username,
			password: data.password,
			email:data.email,
			name:data.fullname
		}


		if (!user.username) {
			res.view('register', {
				error_message: 'No Username.'
			});

			return;

		}

		if (!user.password) {
				res.view('register', {
					error_message: 'Blank Password'
				});

				return;
		}

		all_users.push(user);

		res.redirect('/login')
	},

	//render_homepage: function (req, res) {
		// res.view('homepage', {
		// 	error_message: ''
		//
		// });

		 //res.redirect('/register');
	//},

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
	}
};
