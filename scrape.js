var request = require('request');
var cheerio = require('cheerio');
var games = [];
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'livegames'
})

  connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
      connection.query('INSERT INTO livegames (home, away, a, name) VALUES (home, away, a, name )', ['home', 'away', 'a','name'], function(err, result) {
      if (err) throw err
  })
})

request('http://www.stream2watch.co/live-now', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('a.stream_name').each(function(i, element){
      var a = $(this);
      var home = a.find('.nseg1').text();
      var away = a.find('.nseg2').text();
      var name = a.text();

      console.log(away);
      console.log(home);
      console.log(a.attr('href'));

      if (!home || !away) {
        games.push(name);
      } else {
        games.push(away + '@' + home);
      }

    });
  }
});
