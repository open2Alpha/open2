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

app.post('/signup', function(request, response){

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
})

app.post('/', function(request, response){
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

app.post('/dashboard', function(request, response) {
	 var event = request.body.event;
     var timestamp = request.body.time;
     console.log(event);
	var events = {eventname: event, timestamp: timestamp};


   twilio.sendMessage({
      to: '+18185227459',
      from: '+12678634314',
      body: 'I am available to ' + event + " at " + timestamp
    });


	db.query('INSERT INTO Events SET ?', events, function(err, results){
		if (err) {
	        console.log(err);
	        response.sendStatus(500);
	    }else{
	      	console.log("Event added");
	      	console.log("return from database, inside server", results);
	      	//response.send(results);
	      	// results.insertId, is eventId
	      	var eventId = results.insertId;
	      	//addUserEvents(2, eventId, "yes");

	      	db.query('SELECT * FROM Events WHERE `id` = ?;', [eventId], function(err, rows){
	      		if(err){
	      			throw err;
	      		}else{
	      			response.send(rows);
	      		}
	      	})
	    }
	});



})


var addUserEvents = function(creator, eventId, status){
	var userEvents = {user_id: creator, event_id: eventId, status: status};
	db.query('INSERT INTO UserEvents SET ?', userEvents, function(err, results){
		if (err) {
		    console.log(err);
		    response.sendStatus(500);
		}else{
			console.log("Add User Events Join Table");
			console.log("Add User Events", results);
		}
	});
}

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
  db.query('SELECT * FROM Events', function(err, rows){
		if(err){
			throw err;
		}else{
			response.send(rows);
		}
	})
});





var host = process.env.PORT || 8080;

app.listen(host, console.log("Host is working", host));
