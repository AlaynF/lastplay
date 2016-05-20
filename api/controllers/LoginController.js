/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	render_login: function (req, res) {
		res.view('login', {
			error_message: '',
			layout: 'login_layout'
		});
	},

	render_register: function (req, res) {
		res.view('register', {
			error_message: '',
			layout: 'login_layout'
		});
	},

	register: function (req, res) {
		var user = req.body;

		if (user.password !== user.confirmPassword) {
			return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
		}

		Users.create({
			username: user.username.toLowerCase(),
			email: user.email,
			name: user.name,
			password: user.password
		}).exec(function (err, user) {
			if (err) {
				return res.json({
					status: false
				});
			}

			if (user) {
				 // NOTE: payload is { id: user.id}
				res.json({
					success: true
				});
			}
		});
	},

	authenticate: function (req, res) {
    	var username = req.param('username');
    	var password = req.param('password');

    	if (!username || !password) {
    		return res.json({success: false});
    	}

    	Users.findOne({username: username.toLowerCase()}, function (err, user) {
			if (!user) {
				return res.json({success: false});
			}

	    	Users.comparePassword(password, user, function (err, valid) {
	        	if (err) {
	        		return res.json({success: false});
	        	}

	        	if (!valid) {
	        		return res.json({success: false});
	        	} else {
					req.session.userId = user.id;
					res.json({success: true});
	        	}
	    	});
    	})
	},

	logout: function(req, res) {
      req.session.destroy(function() {
           return res.redirect('/login');
    	});
	}
};
