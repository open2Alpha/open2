var express = require('express');
var db = require('./db.js');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();
app.use(cors());


router.post('/homepage', function(request, response){
  var username = request.body.username;
  var password = request.body.password;

  db.query('SELECT * FROM Users WHERE `username` = ?;', [username], function(err, rows) {
    console.log(rows);
    if (err) {
      throw err;
    } else {
      if(password !== rows[0].password){
        console.log("Incorrect password");
      }else{
        console.log("Success");
        response.send('/dashboard');
      }
    }
  })

});

module.exports = router;
