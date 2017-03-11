var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var request = require('request')
/*var morgan = require('morgan');*/

var headers = {
  'access-control-allow-origin': 'null',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var initialOptions = {
  url: 'http://www.omdbapi.com/?s=Star+Wars',
}

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

//handles the get request on initialization of the app
app.get('/items', function (req, res) {
  
/*  request(initialOptions, function (error, response, body) {
    res.status(200).set(headers).send(body);
  })*/

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
  var id = ''
  req.on('data', function (chunk) {
    id += chunk;
    console.log('this is the id', id);
    var postOptions = {
      url: `http://www.omdbapi.com/?i=${id}`
    }
    request(postOptions, function (error, response, body) {
      console.log('This is the response from IMDB search with ID', body);
      parsedBody = JSON.parse(body);
      items.insertToDB(parsedBody, function (err, data) {
        if (err) {
          console.log('errored out from posting to database server-side')
        } else {
          console.log('Got here without issues, figure out headers and response')
        }
      })
    })
  })
  res.status(201).set(headers).send();
})

app.post('/items', function (req, res) {
  var title = '';
  req.on('data', function (chunk) {
    title += chunk;
    console.log(title);
    var searchOptions = {
      url: `http://www.omdbapi.com/?s=${title}`
    }
    request(searchOptions, function (error, response, body) {
      res.status(201).set(headers).send(body);
    })
  })
})

app.post('/watch', function (req, res) {
  console.log('Triggered the route')
  var titleToDelete = '';
  req.on('data', function (chunk) {
    titleToDelete += chunk;
    console.log(titleToDelete);
    items.deleteFromDB(titleToDelete, function(err, data) {
      if (err) {
        console.log('Errored out from deleting server-side')
      } else {
        console.log('Deleted successfully from database server-side')
      }
    })
  })
})

app.get('/home', function(req, res) {
/*  console.log('hey');
  res.set(headers);
  res.status(200);
  res.send();*/
})



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

