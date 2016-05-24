
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

	function encrypt(text){
	var cipher = crypto.createCipher(algorithm,password)
	var crypted = cipher.update(text,'utf8','hex')
	crypted += cipher.final('hex');
	return crypted;
    }

	function decrypt(text){
	  var decipher = crypto.createDecipher(algorithm,password)
	  var dec = decipher.update(text,'hex','utf8')
	  dec += decipher.final('utf8');
	  return dec;
    }


module.exports = {

	render_login: function (req, res) {
		res.view('login', {
			error_message: '',
			layout: 'login_layout'
		});
	},

	render_recover: function (req, res) {
		res.view('recover', {
			error_message: '',
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
	},

	passwordrecovery: function (req, res) {
		var data = req.body;

        if (!data.email) {
    		return res.json({success: false});
    	}

		Users.findOne({email: data.email.toLowerCase()}, function (err, user) {
			if (!user) {
				return res.json({success: false});
                //Add User ID
			} else {
                var user = {
                    email:data.email,
                    id:user.id
                };

				var token = encrypt(JSON.stringify(user));
                var nodemailer = require("nodemailer");
        		var smtpTransport = nodemailer.createTransport('smtps://lastplayus%40gmail.com:Pinga123Supermario78	@smtp.gmail.com');


        		if (!token) {
        			res.json({
        				success: false
        			});

        			return;
        		}

        		smtpTransport.sendMail({  //email options
        			from: "Last Play <Lastplayus@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
        			to: data.email , // receiver
        			subject: "LastPlay Password Reset", // subject
        			html: "Click here to reset your password:  " +"http://lastplay.live/recover?token="+ token  // body
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

		});
	},

    password: function (req, res) {
        var data = req.body;
        var info = JSON.parse(decrypt(data.token));

        if (data.password !== data.confirmPassword) {
            return res.json({success: false});
        }

        Users.findOne({
            email: info.email
        }).exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.json({success: false});
            }

            if (!user) {
				return res.json({success: false});
            }

            user.password = data.password;

            user.save(function(err, user) {
                return res.json({success: true});
            });

            console.log(user);

        });

        console.log('ok');

	}
}
