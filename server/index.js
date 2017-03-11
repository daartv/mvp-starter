var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
/*var morgan = require('morgan');*/

var headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type'
  };

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/home', function(req, res) {
  res.status(200).send('<h1>Welcome to YMDB</h1>');
})

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.set(headers)
      res.status(200)
      res.json(data);
    }
  });

  res.status(200).send('<h1>This is a test</h1>');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

