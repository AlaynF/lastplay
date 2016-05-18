/**
 * RedditController
 *
 * @description :: Server-side logic for managing reddits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var r = require("nraw");
var Reddit = new r("Testbot v0.0.1 by Mobilpadde");
var request = require("request");
var cheerio = require("cheerio");
var URL = require('url-parse');

var stored_allgames = [];

var mlbgameshome = [];
var nbagameshome = [];
var nhlgameshome = [];


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
			error_message: ''
		});
	},

	render_baseball: function (req, res) {
		res.view('baseball', {
			error_message: '',
			layout: 'layout_contact'
		});
	},

	render_basketball: function (req, res) {
		res.view('basketball', {
			error_message: '',
			layout: 'layout_contact'
		});
	},

	render_hockey: function (req, res) {
		res.view('hockey', {
			error_message: '',
			layout: 'layout_contact'
		});
	},

    allgames: function (req, res) {
		var allgames = [];

		if (stored_allgames.length) {
			res.json(stored_allgames);
			return;
		}

		request('http://sports.yahoo.com/nhl/scoreboard/', function(err, resp, html){
    		if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(html);

				$('.game.pre.link').each(function() {
					var data = $(this);
					var away = data.children('.away').text().trim().split(") ")[1];
					var home = data.children('.home').text().trim().split(") ")[1];
					var timedata = data.children('.summary').text().trim();
					var time = timedata.slice(0,12);
						var game = {
							away: away,
							time: time,
							home: home,
							sport: "Hockey",
							pic: "images/Hockey.png",
						};
					allgames.push(game);
                    nhlgameshome.push(home);
	        	});
    		}
			stored_allgames = allgames;
		});

		request('http://sports.yahoo.com/mlb/scoreboard/', function(err, resp, html){
    		if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(html);

				$('.game.link').each(function() {
					var data = $(this);
					var away = data.children('.team.away').children('th').text().trim();
					var home = data.children('.team.home').children('th').text().trim();
					var timedata = data.children('.team.away').text().trim();
					var timeplace = timedata.search(/\d/);
					var timeslice = timedata.slice(-40,100);
					var timetrim = timeslice.trim();
					var time = timetrim.slice(0,12);
						var game = {
							away: away,
							home: home,
							time: time,
							sport: "Baseball",
							pic: "images/Baseball.png",
						};
					allgames.push(game);
                    mlbgameshome.push(home);
	        	});
    		}
			stored_allgames = allgames;
		});

		request('http://sports.yahoo.com/nba/scoreboard/', function(err, resp, html){
    		if(!err && resp.statusCode == 200) {
				var $ = cheerio.load(html);

				$('.game.pre.link').each(function() {
					var data = $(this);
					var away = data.children('.away').text().trim().split(") ")[1];
					var home = data.children('.home').text().trim().split(") ")[1];
					var timedata = data.children('.summary').text().trim();
					var time = timedata.slice(0,12);
						var game = {
							away: away,
							time: time,
							home: home,
							sport: "Basketball",
							pic: "images/Basketball.png",
						};
					allgames.push(game);
                    nbagameshome.push(home);
	        	});
    		}
			stored_allgames = allgames;
			res.json(allgames);
		});
	},

	nbagames: function(req, res) {
		var found_games = {};
		var found_body = {};

		Reddit.subreddit("nbastreams").limit(10).exec(function(data){
			var games = [];

			if (!data.data) {
				res.json([]);
				return;
			}

			var pretty_data = data.data.children.map(function(child) {
	            return {
	                title: child.data.title,
	                url: child.data.url
	            };

				//var pretty_data_link = child.data.url

				// pretty_data.data.url.forEach(function(url){
				// 	request(url, function (error, response, body) {
				// 		//Check for error
				// 		if(error){
				// 			return console.log('Error:', error);
				// 		}
				// 		//Check for right status code
				// 		if(response.statusCode !== 200){
				// 			return console.log('Invalid Status Code Returned:', response.statusCode);
				// 		}
				// 		//All is good. Print the body
				// 		found_body.push(body);
				// 		console.log(body);
				// 		 // Show the HTML for the Modulus homepage.
				// 	});
				// });
				console.log(pretty_data_link);
	        });

			nbagameshome.forEach(function (team) {
				found_games[team] = findGames(pretty_data, team);
			});

			res.json(found_games);

		});
	},

	mlbgames: function(req, res) {

		Reddit.subreddit("mlbstreams").limit(10).exec(function(data){
			var found_games = {};

			if (!data.data) {
				res.json([]);
				return;
			}
			var pretty_data = data.data.children.map(function(child) {
				return {
					title: child.data.title,
					url: child.data.url
				};
	        });

			mlbgameshome.forEach(function (team) {
				found_games[team] = findGames(pretty_data, team);
			});

			res.json(found_games);

		});
	},

	nhlgames: function(req, res) {

		Reddit.subreddit("nhlstreams").limit(10).exec(function(data){
			var found_games = {};

			if (!data.data) {
				res.json([]);
				return;
			}

			var pretty_data = data.data.children.map(function(child) {
	            return {
	                title: child.data.title,
	                url: child.data.url
	            };
	        });

			nhlgameshome.forEach(function (team) {
				found_games[team] = findGames(pretty_data, team);
			});

			res.json(found_games);
		});
	},

	nbacomments: function (req, res){
		Reddit.subreddit("nbastreams").post("4f3cbr").exec(function(data){
			res.json(data);
		});
	},

	hello: function (req, res) {
		res.send('Hey there buddy');
	},

	proxy: function (req, res) {

		req.query.url = req.query.url + '&sig=' + req.query.sig;
		console.log(req.query.url);
		res.set('Access-Control-Allow-Origin', '*');

		request.get(req.query.url)
		.on('error', function(err) {
			console.log(err);
		})
		.on('response', function (response) {
			response.pipe(res);
		});
	}
}


function findGames (pretty_data, team_name) {
	var results = [];

	pretty_data.forEach(function (child) {
		if (child.title.toLowerCase().indexOf(team_name) > -1) {
			results.push(child);
		}
	});

	return results;
}
