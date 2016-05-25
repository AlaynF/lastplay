
var contact_info = {};
var request = require('request');
var cheerio = require('cheerio');
var express = require('express');


module.exports = {

	render_homepage: function (req, res) {
		res.view('homepage', {
			error_message: ''
		});
		res.redirect('/register');
	},

	render_subscription: function (req, res) {
		res.view('subscription', {
			error_message: ''
		});
	},

	render_register: function (req, res) {
		res.view('register', {
			error_message: ''
		});
	},

	render_channel1: function (req, res) {
		res.view('channel1', {
			error_message: ''
		});
	},

	render_channel2: function (req, res) {
		res.view('channel2', {
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
		var nodemailer = require('nodemailer');
		var smtpTransport = nodemailer.createTransport('smtps://lastplayus%40gmail.com:Pinga123Supermario78	@smtp.gmail.com');

		if (!data.email || !data.message) {
			res.json({
				success: false
			});
			return;
		}

		smtpTransport.sendMail({  //email options
			from: 'Last Play <Lastplayus@gmail.com>', // sender address.  Must be the same as authenticated user if using Gmail.
			to: 'Lastplayus@gmail.com', // receiver
			subject: 'Last Play Feedback', // subject
			html: 'From: ' + data.email + ' // ' + data.message  // body
		}, function(error, response){  //callback
			if(error) {
				console.log('error');
			} else {
				console.log('Message sent.');
			}

			res.json({
				success: true
			});

			smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
		});
	},

	invite: function (req, res) {
		var data = req.body;
		var nodemailer = require('nodemailer');
		var smtpTransport = nodemailer.createTransport('smtps://lastplayus%40gmail.com:Pinga123Supermario78	@smtp.gmail.com');


		if (!data.email) {
			res.json({
				success: false
			});
			return;

		}

		smtpTransport.sendMail({//email options
			from: 'Last Play <Lastplayus@gmail.com>', // sender address.  Must be the same as authenticated user if using Gmail.
			to: data.email , // receiver
			subject: 'Live stream invitation', // subject
			html: "<!DOCTYPE html><html><head><meta content='text/html; charset=utf-8' http-equiv='Content-Type'><link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css …'rel='stylesheet'><title>LastPlay Invitation</title><meta content='width=device-width, initial-scale=1.0' name='viewport'></head><body style='margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;' ><table border='0' cellpadding='0' cellspacing='0' width='100%'><tr><td><table align='center' border='0' cellpadding='0' cellspacing='0' width='600'><tr><td bgcolor='#F1F1F1' style='text-align:center;padding-top:10px;padding-bottom:8px;padding-right:10px;padding-left:5px;' ><img src='http://lastplay.live/images/logo.png '><h1>YOU HAVE BEEN INVITED TO A FREE TRIAL</h1> <form action='http://lastplay.live/register '> <input type='submit'  value='Start Your Free Trial!' style='background-color:#8EBF55;border-width:0;padding-left:70px;padding-right:70px;padding-top:15px;padding-bottom:15px;font-weight:bold;' > </form> <a href='http://lastplay.live/register/ ' style='color:#000;' > Click here to sign up! </a> </td> </tr> <tr> <td bgcolor='#FFF' style='padding-top:10px;padding-bottom:8px;padding-right:10px;padding-left:5px;' > <div> <p style='padding-bottom:20px;' >Last Play is a multi sport platform that will give you the closest seat to the action. Last Play promises to stream your game live and with quality. No more annoying ads, no more unbearable quality! </p> <p><img src='"+'lastplay.live/assets/images/1.jpg'+"' style='float:left;padding-right:10px;padding-bottom:30px;' ></p> <p>Count on Last Play to help you watch Big Papi make a homerun, or watch the fuel continue to heat up between the Blue Jays and the Rangers! When will the benches clear out again? </p> </div> <br> <p style='padding-top:70px;' ><img src='"+'2.jpg'+"' style='float:right;padding-left:10px;' > No Pay-Per-View? No Problem! We will provide you the most affordable solutions to catch the fight card with nothing less than Last Plays guarenteed high definition. Come watch McGregor contend for the title, or Canelos knock out punches round by round!</p></td> </tr> <tr> <td bgcolor='#8EBF55' style='padding-top:10px;padding-bottom:8px;padding-right:10px;padding-left:5px;font-size:10px;' > *Your trial will end 7 days after you sign up. At that point you will need to subscribe to one of our low-rate plans to continue enjoying Last Plays services. Please note, Last Play will never store credit card information for your security!*</td></tr></table></td></tr></table></body></html>"

		},
		function(error, response){  //callback
			if(error) {
				console.log('error');
			} else {
				console.log('Message sent.');
			}

			smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
		});
	}
}
