var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'YMDB'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM movies', function(err, results, fields) {
    if(err) {
      console.log('error retrieving from database')
      callback(err, null);
    } else {
      console.log('retrieved from database')
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
