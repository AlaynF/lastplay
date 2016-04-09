/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var all_users = [
	{username: 'Alayn', password: 'Alayn'}
];

module.exports = {
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
	}
};
