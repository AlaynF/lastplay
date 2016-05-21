
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


	render_register: function (req, res) {
		res.view('register', {
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

	render_baseball: function (req, res) {
		res.view('baseball', {
			error_message: ''
		});
	},

	render_basketball: function (req, res) {
		res.view('basketball', {
			error_message: ''
		});
	},

	render_hockey: function (req, res) {
		res.view('hockey', {
			error_message: ''

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

}
