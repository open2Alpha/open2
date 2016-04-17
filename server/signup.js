var express = require('express');
var db = require('./db.js');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();
app.use(cors());

router.post('/newuser', function(request, response){

  var username = request.body.username;
  var password = request.body.password;
  //var mobile = request.body.mobile;

  users = {username: username, password: password};

  db.query('INSERT INTO Users SET ?', users, function(err, results){
    if(err){
      response.sendStatus(500);
    }else{
      response.send('/login');
      console.log("New user added to database");
    }
  })
});

module.exports = router;
