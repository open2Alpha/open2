var express = require('express');
var db = require('./db.js');
var bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
var bodyParser = require('body-parser');
var twilio = require('twilio')('AC40691c0816f7dd360b043b23331f4f43','89f0d01b69bb6bcc473724b5b232b6f4');
var router = express.Router();

var app = express();
app.use(cors());


router.post('/events', function(request, response) {
  console.log('inside dashboard username', request.body.username);
  var event = request.body.event;
  var timestamp = request.body.time;
  var username = request.body.username;

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

          db.query('SELECT * FROM Users WHERE `username` = ?;', [username], function(err, rows) {
            if(err){
              throw err;
            }else{
              //console.log("i am a row". rows)
              var userId = rows[0].id;

              //console.log("CREATING EVENTS",userId);
              addUserEvents(userId, eventId, true);
            }
          });
        }
      })
    }
  });
})

// app.post('/', function(request, response){
// 	var userId = request.body.userId;
// 	var eventId = request.body.eventId;
// 	var status = request.body.status;

// 	addUserEvents(userId, eventId, status);
// })


var addUserEvents = function(creator, eventId, status){
  var userEvents = {user_id: creator, event_id: eventId, created_by: status};
  console.log(userEvents)
  db.query('INSERT INTO UserEvents SET ?', userEvents, function(err, results){
    if (err) {
      console.log(err);
      //response.sendStatus(500);
    }else{
      console.log("Add User Events Join Table");
      console.log("Add User Events", results);

    }
  });
}


router.get('/upload', function(request, response){

  // Select * From Users, Events, Where Events.id = ? AND Users.user_id = Events.user_id

  db.query('SELECT Users.username, Events.eventname, Events.timestamp, UserEvents.id, UserEvents.created_by FROM Users INNER JOIN UserEvents ON Users.id = UserEvents.user_id INNER JOIN Events ON Events.id = UserEvents.event_id ORDER BY event_id', function(err, rows){
    if(err){
      throw err;
    }else{
      console.log("query from database", rows);
      response.send(rows);

    }
  })

})

router.get('/friends', function(request, response){
	db.query('SELECT username FROM Users', function(err, results){
		if(err){
			throw err;
		}else{
			console.log("friends list from db", results);
			response.send(results);
		}
	})
})

router.post('/join', function(request, response){
   //console.log(request.body);
  var username = request.body.user;
  var id = request.body.eventId;


  db.query('SELECT id FROM Users WHERE `username` = ?;', [username], function(err, rows){
    if(err){
      throw err;
    }else{
      console.log("INSIDE JOIN POST",rows[0].id);
      var userId = rows[0].id;

      db.query('SELECT event_id FROM UserEvents WHERE `id` = ?;', [id],function(err, rows){
          if(err){
            throw err;
          }else{
            console.log("INSIDE POST USEREVENts", rows[0].event_id);
            var eventId = rows[0].event_id;
            addUserEvents(userId, eventId, false);
          }
      })
    }
  })

})

module.exports = router;
