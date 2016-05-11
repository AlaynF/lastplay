/**
 * GamesController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var request = require("request");
 var cheerio = require("cheerio");
 var URL = require('url-parse');
 var stored_mlbgames = [];
 var stored_nbagames = [];
 var stored_nhlgames = [];

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
                    var time = data.children('.time').text().trim();
						var game = {
							away: away,
							home: home
						};
                    console.log(time);
					nbagames.push(game);
                    nbagameshome.push(home);
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
                    mlbgameshome.push(home);
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
                    nhlgameshome.push(home);
	        	});
    		}

			stored_nhlgames = nhlgames;
			res.json(nhlgames);
		});
	},

    nbastuff: function (req, res) {
        // var x;
        //
        // for (x in mlbgameshome) {
        //     console.log(mlbgameshome[x]);
        //     var START_URL = "https://www.reddit.com/r/nbastreams/";
        //     var SEARCH_WORD = mlbgameshome[x];
        //     var MAX_PAGES_TO_VISIT = 20;
        //     var pagesVisited = {};
        //     var numPagesVisited = 0;
        //     var pagesToVisit = [];
        //     var url = new URL(START_URL);
        //     var baseUrl = url.protocol + "//" + url.hostname;
        //     pagesToVisit.push(START_URL);
        //     crawl();
        //
        //     function crawl() {
        //         if(numPagesVisited >= MAX_PAGES_TO_VISIT) {
        //             console.log("Reached max limit of number of pages to visit.");
        //             return;
        //         }
        //         var nextPage = pagesToVisit.pop();
        //         if (nextPage in pagesVisited) {
        //             // We've already visited this page, so repeat the crawl
        //             crawl();
        //         } else {
        //             // New page we haven't visited
        //             visitPage(nextPage, crawl);
        //         }
        //     }
        //
        //     function visitPage(url, callback) {
        //       // Add page to our set
        //         pagesVisited[url] = true;
        //         numPagesVisited++;
        //
        //         // Make the request
        //         console.log("Visiting page " + url);
        //         request(url, function(error, response, body) {
        //             // Check status code (200 is HTTP OK)
        //             console.log("Status code: " + response.statusCode);
        //             if(response.statusCode !== 200) {
        //                 callback();
        //                 return;
        //             }
        //                 // Parse the document body
        //             var $ = cheerio.load(body);
        //             var isWordFound = searchForWord($, SEARCH_WORD);
        //             if(isWordFound) {
        //                 console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
        //             } else {
        //                 collectInternalLinks($);
        //                 // In this short program, our callback is just calling crawl()
        //                 callback();
        //             }
        //         });
        //     }
        //
        //     function searchForWord($, word) {
        //         var bodyText = $('html > body').text().toLowerCase();
        //         return(bodyText.indexOf(word.toLowerCase()) !== -1);
        //     }
        //
        //     function collectInternalLinks($) {
        //         var relativeLinks = $("a[href^='/']");
        //         console.log("Found " + relativeLinks.length + " relative links on page");
        //         relativeLinks.each(function() {
        //             pagesToVisit.push(baseUrl + $(this).attr('href'));
        //         });
        //     }
        // }


    }

};
