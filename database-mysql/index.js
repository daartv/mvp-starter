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
      callback(null, results);
    }
  });
};

var insertToDB = function (data, callback) {
  connection.query(`INSERT IGNORE INTO movies (Title, Year, Poster) VALUES ('${data.Title}', '${data.Year}', '${data.Poster}')`, function (err, results, fields){
    if (err) {
      console.log('error posting into the database')
      callback(err, null)
    } else {
      callback(null, results);
    }
  });
};

var deleteFromDB = function (title, callback) {
  connection.query(`DELETE FROM movies WHERE Title = '${title}'`, function (err, results, fields){
    if (err) {
      console.log('error deleting from database')
      callback(err, null)
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.insertToDB = insertToDB;
module.exports.deleteFromDB = deleteFromDB;