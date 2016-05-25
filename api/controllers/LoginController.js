
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
			return res.json(401, {err: 'Password doesn\'t match, What a shame!'})
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
        			html:  "<!DOCTYPE html> <html> <head> <meta content='text/html; charset=utf-8' http-equiv='Content-Type'><link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css …'rel='stylesheet'> <title> LastPlay Invitation</title> <meta content='width=device-width, initial-scale=1.0' name='viewport'> </head> <body style='margin: 0; padding: 0;font-family:'Open Sans''> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td> <table align='center' border='0' cellpadding='0' cellspacing= '0' width='600'> <tr> <td bgcolor='#F1F1F1' style= 'text-align: center; padding: 10px 10px 8px 5px;'> <img src='http://lastplay.live/images/logo.png'> <h1>PASSWORD REQUESTED</h1> <form action='http://lastplay.live/recover?token= + token' > <input type='submit'  style= 'background-color:#8EBF55; border:0; padding-left:70px; padding-right: 70px; padding-top:15px; padding-bottom:15px; font-weight:bold;'value='Click here to reset password'> </form> <a href='http://lastplay.live/recover?token= + token' style='color:#000;'>Reset password</a> </td> </tr> <tr> <td bgcolor='#FFF' style='padding: 10px 10px 8px 5px;'> <div> <p style='padding-bottom:10px;'>If you did not request a password change, we highly recommend you to change your password to something more difficult. Last Play suggests to not use the same password for all of your accounts and to use lower case letters mixed with capitals, numbers and even symbols. We thank you for using our services but we want to make sure it is YOU that keeps control of your account.  </p></div> </td> </tr><tr><td bgcolor='#8EBF55' style='padding: 10px 10px 8px 5px; font-size:10px; text-align:center;'> *At Last Play we strive for customer satisfaction, and customer security.*</td> </tr> </table> </td> </tr> </table> </body> </html> "
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
