var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var cors = require('cors');
//var router = express.Router();
var app = express();

app.use(cors());

//var routes = require('routes');


app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));
// app.use('/api/', router);



app.post('/', function(request, response){
	var username = request.body.username;
	var password = request.body.password;

	db.query('SELECT `password` FROM Users WHERE `password` = ?;', [password], function (err, rows) {
		if(err){
			console.error(err);
			res.status(404).json({success: false});
		}else{
			console.log(rows);
		}
	});

});






var host = process.env.PORT || 8080;

app.listen(host, console.log("Host is working", host));
