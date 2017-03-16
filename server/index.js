var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var request = require('request')

var headers = {
  'access-control-allow-origin': 'null',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var app = express();

app.use(bodyParser.json({extended: true}));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {

  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.set(headers)
      res.status(200)
      res.send(data);
    }
  });
});

app.post('/entry', function (req, res) {
  var id = req.body.movieID;
  var postOptions = {
      url: `http://www.omdbapi.com/?i=${id}`
    };
  request(postOptions, function (error, response, body) {
    parsedBody = JSON.parse(body);
    items.insertToDB(parsedBody, function (err, data) {
      if (err) {
        console.log('errored out from posting to database server/side')
      } else {
        res.status(201).set(headers).send(parsedBody);
      }
    });
  });
});

app.post('/items', function (req, res) {
  var titleToSearch = req.body.term;
  var searchOptions = {
    url: `http://www.omdbapi.com/?s=${titleToSearch}`
  }
  request(searchOptions, function (error, response, body) {
    res.status(201).set(headers).send(body) 
  });
});

app.post('/watch', function (req, res) {
  var title = req.body.movieTitle;
  items.deleteFromDB(title, function(err, data) {
    if (err) {
      console.log('Errored out from deleting server/side')
    } else {
      res.sendStatus(201);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

