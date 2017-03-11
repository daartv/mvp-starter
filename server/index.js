var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
/*var morgan = require('morgan');*/

var headers = {
  'access-control-allow-origin': 'null',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {

/*  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.set(headers)
      res.status(200)
      res.json(data);
    }
  });*/

  res.status(200).set(headers).send('<h1>This is a test</h1>');
});
/*app.options('/items', function(req, res){
  console.log('OPTIONS')
  res.writeHead(200, headers);
  res.end();
})*/

app.get('/home', function(req, res) {
/*  console.log('hey');
  res.set(headers);
  res.status(200);
  res.send();*/
})



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

