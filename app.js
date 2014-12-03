// We need to require any libraries we want to use.
var movies = [];
var express = require("express");
var request = require("request");

// Express requires that we instantiate an app.
var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.render('index.ejs');
});

//app.get('new.ejs', function (req, res) {
//	res.render('new.ejs');
//});

app.get('/show', function (req, res) {
	res.render('show.ejs');
});

// Create a handler to respond to GET requests
// to our search page ("/search").
app.get('/new', function (req, res) {
	var searchTerm = req.query.movieTitle;
	var url = "http://www.omdbapi.com/?s=" + searchTerm;
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var obj = JSON.parse(body);
			res.render("show.ejs", {movieList: obj.Search});
		}
	});
});


app.listen(3000, function () {
	console.log("Listening!");
});