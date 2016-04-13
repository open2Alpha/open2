var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db.js');
var cors = require('cors');
//var router = express.Router();
var twilio = require('twilio')('AC40691c0816f7dd360b043b23331f4f43','89f0d01b69bb6bcc473724b5b232b6f4');

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
		} else {
			console.log(rows);
			response.send('/dashboard');
		}
	});

});


// app.get('/form', function(req,res){
//   twilio.sendMessage({
//     to: '+18185227459',
//     from: '+12678634314',
//     body: 'Hey Im Available!'
//   },
//    function(err, text){
//     if (err) {
//       console.log('Error: ', err);
//       throw err;
//     }
//     res.send(text);
//     console.log(" sent! text: ", text);
//   });
// });

app.get('/dashboard', function(request, response) {
  response.send([{'name': 'Prex is eating', 'time': '12:00-14:00'}, {'name': 'Dain is coding', 'time': '14:00-20:00'}]);
});





var host = process.env.PORT || 8080;

app.listen(host, console.log("Host is working", host));
