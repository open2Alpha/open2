var mysql = require('mysql');
var fs = require('fs');

var db = mysql.createConnection({
	host: 'mysqlcluster14.registeredsite.com',
	user: 'preska',
	password: '!Qaz2wsx',
	database: 'mks35greenfield',
	multipleStatements: true
});


db.on('error', function(){
	console.log("ERROR in database");
});

// Initial DB Setup when Server starts
fs.readFile(__dirname + '/schema.sql', 'utf-8', function(err, data){
  if (err) {
    console.error(err);
  } else {
    data = data.split(";"); // Multiple statement work-around
    data.pop();
    data.forEach(function(item){
      db.query(item, function(err, results, fields){
        if (err) {
          console.error(err);
        } else {
          console.log('SQL Setup');
        }
      });
    });
  }
});

setInterval(function(){
	db.query('SELECT 1')
}, 5000);

module.exports = db;