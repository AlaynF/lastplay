/**
 * GamesController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var request = require("request");
 var cheerio = require("cheerio");

 var stored_mlbgames = [];
 var stored_nbagames = [];
 var stored_nhlgames = [];
 var nbaTitles = [];
 var nbaLinks = [];

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

	render_contact: function (req, res) {
		res.view('contact', {
			error_message: '',
            layout: 'layout_contact'
		});
	},

    render_heat: function (req, res) {
		res.view('heat', {
			error_message: '',
			layout: 'layout_game'
		});
	},

	nbagames: function (req, res) {
		var nbagames = [];

		if (stored_nbagames.length) {
			res.json(stored_nbagames);

			return;
		}

		request('http://sports.yahoo.com/nba/scoreboard/', function(err, resp, html){
    		if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(html);

				$('.game.pre.link').each(function() {
					var data = $(this);
					var away = data.children('.away').text().trim();
					var home = data.children('.home').text().trim();
						var game = {
							away: away,
							home: home
						};
					nbagames.push(game);
	        	});
    		}

			stored_nbagames = nbagames;
			res.json(nbagames);
		});
	},

	mlbgames: function (req, res) {
		var mlbgames = [];

		if (stored_mlbgames.length) {
			res.json(stored_mlbgames);

			return;
		}

		request('http://sports.yahoo.com/mlb/scoreboard/', function(err, resp, html){
    		if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(html);

				$('.game.link').each(function() {
					var data = $(this);
					var away = data.children('.team.away').children('th').text().trim();
					var home = data.children('.team.home').children('th').text().trim();
						var game = {
							away: away,
							home: home
						};
					mlbgames.push(game);
	        	});
    		}

			stored_mlbgames = mlbgames;
			res.json(mlbgames);
		});
	},

    nhlgames: function (req, res) {
		var nhlgames = [];

		if (stored_nbagames.length) {
			res.json(stored_nhlgames);

			return;
		}

		request('http://sports.yahoo.com/nhl/scoreboard/', function(err, resp, html){
    		if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(html);

				$('.game.pre.link').each(function() {
					var data = $(this);
					var away = data.children('.away').text().trim();
					var home = data.children('.home').text().trim();
						var game = {
							away: away,
							home: home
						};
					nhlgames.push(game);
	        	});
    		}

			stored_nhlgames = nhlgames;
			res.json(nhlgames);
		});
	},

    nbastuff: function (req, res) {


		//if (stored_nbagames.length) {
		//	res.json(stored_nbagames);

		//	return;
		//}

		request('https://www.reddit.com/r/nbastreams/', function(err, resp, html){
    		if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(html);

				$('p.title').each(function() {
					var data = $(this);
					var articleLink = data.children().attr('href');
                    var articleTitle = data.children().text().replace('(self.nbastreams)', '').trim();

					nbaTitles.push(articleTitle);
                    nbaLinks.push(articleLink);


	        	});
    		}
			res.json(nbaTitles,nbaLinks);
            var value = nbaTitles.indexOf("Nba Tv HD stream");
            console.log(nbaTitles)
		});
	}
};
