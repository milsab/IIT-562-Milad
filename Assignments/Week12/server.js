var express = require('express'),
http = require('http'),
mongoose = require('mongoose'),
bodyparser = require('body-parser'),
app;

app =  express();
http.createServer(app).listen(process.env.PORT || 3000);

app.use(express.urlencoded());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static('public'));

var UserSchema = mongoose.Schema({
    'userid': Number,
    'name': String,
    'email': String,
    'reminder': [
        {
            'reminderid': Number,
            'title': String,
            'description': String,
            'created': String
        }
    ]
});
// var uri = 'mongodb://heroku_k94slvxx:rfk8qbrvb0r8mmsvnmfskiou0b@ds243325.mlab.com:43325/heroku_k94slvxx';
var uri = 'mongodb://localhost/reminder';
mongoose.Promise = global.Promise;
mongoose.connect(uri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback(){
    var User = mongoose.model('User', UserSchema);


    app.get('/users', function(req, res){
        var id = parseInt(req.params.userid);
        console.log('request recieved: ' + req);
        
        var users = [];
        var User = mongoose.model('User', UserSchema);
    
        User.find({}, '-_id userid name email', function(err, usr){
            if(err){
                console.log("ERROR: " + err);
                res.status(500).send("Internal Error");
            } else if ( usr.length !== 0){
                console.log(usr);
                usr.forEach(function(u){
                    var user = {};
                    user.id = u.userid;
                    user.name = u.name;
                    user.email = u.email;
                    users.push(user);
                });
                res.status(200).json(users);
            } else{
                console.log("User Not Found!");
                res.status(200).json({});
            }
        });
    });

    app.get('/users/:userid', function(req, res){
        var id = parseInt(req.params.userid);
        console.log('request recieved: ' + req);
        var user = {};
        var User = mongoose.model('User', UserSchema);
    
        User.find({'userid': id}, '-_id userid name email', function(err, usr){
            if(err){
                console.log("ERROR: " + err);
                res.status(500).send("Internal Error");
            } else if ( usr.length !== 0){
                user.name = usr[0].name;
                user.email = usr[0].email;
                res.status(200).json(user);
            } else{
                console.log("User Not Found!");
                res.status(200).json({});
            }
        });
    });
    
    app.get('/users/:userid/reminders', function(req, res){
        var userid = parseInt(req.params.userid);
        var title = req.query.title;
        console.log(title);

    
        var reminders = [];
        var User = mongoose.model('User', UserSchema);
    
        User.find({'userid': userid}, '-_id reminder', function(err, rem){
            if(err){
                console.log("ERROR: " + err);
                res.status(500).send("Internal Error");
            } else if ( rem.length !== 0){
                if(title === undefined){
                    rem[0].reminder.forEach(function(r){    
                        var tempReminder = {};
                        tempReminder.title = r.title;
                        tempReminder.description = r.description;
                        tempReminder.reminderid = r.reminderid;
                        tempReminder.created = r.created;
                        if(Object.keys(tempReminder).length > 0){
                            reminders.push(tempReminder);
                        }
                    });
                } else{
                    rem[0].reminder.forEach(function(r){  
                        if(r.title === title){
                            var tempReminder = {};
                            tempReminder.title = r.title;
                            tempReminder.description = r.description;
                            tempReminder.reminderid = r.reminderid;
                            tempReminder.created = r.created;
                            if(Object.keys(tempReminder).length > 0){
                                reminders.push(tempReminder);
                            }
                        } 
                    });
                }
                
                if(reminders.length === 0){
                    console.log('No reminder for this user');
                    res.status(200).json([]);
                } else {
                    res.status(200).json(reminders);
                }   
            } else{
                console.log("User Not Found!");
                res.status(404).send("User Not Found!");
            }
        });
    });
    
    

    app.get('/users/:userid/reminders/:reminderid', function(req, res){
        var userid = parseInt(req.params.userid);
        console.log('userid: ' + userid);
        var reminderid = parseInt(req.params.reminderid);
        console.log('reminderid: ', + reminderid);
        
        var reminders = [];
        var User = mongoose.model('User', UserSchema);
    
        User.find({'userid': userid}, '-_id reminder', function(err, rem){
            if(err){
                console.log("ERROR: " + err);
                res.status(500).send("Internal Error");
            } else if ( rem.length !== 0){
                rem[0].reminder.forEach(function(r){
                    if(r.reminderid === reminderid){
                        var tempReminder = {};
                        tempReminder.title = r.title;
                        tempReminder.description = r.description;
                        tempReminder.reminderid = r.reminderid;
                        tempReminder.created = r.created;
                        reminders.push(tempReminder);
                    }                    
                });
                if(reminders.length === 0){
                    console.log('Reminder Not Found');
                    res.status(200).send('Reminder Not Found.');
                } else {
                    res.status(200).json(reminders);
                }                
            } else{
                console.log("User Not Found!");
                res.status(404).send("User Not Found!");
            }
        });
    });
    

    app.post('/users', function(req, res){
           
        var userid;
        var status = true;
    
        userid = generateID();
    
        req.body.forEach(function(u) {
            var user = new User();
            user.userid = userid;
            user.name = u.name;
            user.email = u.email;
                
            user.save(function(err){
                if(err !== null){
                    console.log(err);
                    status = false;
                } else{
                    //console.log("User Saved!");
                }
            });
        });
        if(status){
            console.log("User Saved Successfully");
            res.status(200).json({"userID": userid });
        } else{
            res.status(500).send("Internal Error");
        }
    });

    app.post('/users/:userid/reminders', function(req, res){
        
        var userid = parseInt(req.params.userid);
        var reminderid;
        console.log(userid);
        var User = mongoose.model('User', UserSchema);
        var user = new User();

        User.find({'userid': userid}, '-_id userid name email reminder', function(err, usr){
            if(err){
                console.log("ERROR: " + err);
                res.status(500).send("Internal Error");
            } else if ( usr.length !== 0){
                user.name = usr[0].name;
                user.email = usr[0].email;
                req.body.forEach(function(rem){
                    reminderid = generateID();
                    rem.reminderid = reminderid;
                    rem.created = new Date();
                    usr[0].reminder.push(rem);
                });
                user.reminder = usr[0].reminder;
                User.update({'userid': userid}, {'reminder': user.reminder}, function(err, doc){
                    if(err !== null){
                        console.log(err);
                        res.status(500).send("Internal Error");
                    } else{
                        console.log("User Updated!");
                        res.status(200).json({'reminderID': reminderid});
                    }
                });
            } else{
                console.log("User Not Found!");
                res.status(200).json({});
            }
        });
    });

    app.delete('/users/:userid', function(req, res){
        var userid = parseInt(req.params.userid);
        var User = mongoose.model('User', UserSchema);
        var user = new User();

        User.remove({'userid': userid}, function(err, done){
            if(err !== null){
                console.log(err);
                res.status(500).send("Internal Error");
            } else if (done.result.n === 0){
                console.log("User Not Found.");
                res.status(200).json({message: "Cannot find any User with the specified userID."});
            } else{
                console.log("User Deleted!");

                res.status(204).send("User Deleted Successfully");
            }
        });

    });

    app.delete('/users/:userid/reminders', function(req, res){
        var userid = parseInt(req.params.userid);
        var User = mongoose.model('User', UserSchema);
        var user = new User();

        User.update({'userid': userid}, {'reminder': []}, function(err, done){
            console.log(done);
            if(err){
                console.log("ERROR: " + err);
                res.status(500).send("Internal Error");
            } else if (done.n === 0){
                console.log("User Not Found.");
                res.status(200).json({message: "user not found"});
            } else {
                console.log("All Reminders Deleted Successfully");
                res.status(204).send("All Reminders Deleted Successfully");
            }
        });
    });
    
    app.delete('/users/:userid/reminders/:reminderid', function(req, res){
        var userid = parseInt(req.params.userid);
        console.log('userid: ' + userid);
        var reminderid = parseInt(req.params.reminderid);
        console.log('reminderid: ', + reminderid);
        
        var reminders = [];
        var User = mongoose.model('User', UserSchema);
        var user = new User();
    
        User.find({'userid': userid}, '-_id reminder', function(err, rem){
            if(err){
                console.log("ERROR: " + err);
                res.status(500).send("Internal Error");
            } else if ( rem.length !== 0){
                
                rem[0].reminder.forEach(function(r){
                    if(r.reminderid === reminderid){
                        //do nothing
                    } else{
                        reminders.push(r);
                    }                   
                });
                User.update({'userid': userid}, {'reminder': reminders}, function(err, doc){
                    if(err !== null){
                        console.log(err);
                        res.status(500).send("Internal Error");
                    } else{
                        console.log("Reminder Deleted");
                        console.log(doc);

                        res.status(204).send("All Reminders Deleted Successfully");
                    }
                });
            } else{
                console.log("Not Found!");
                res.status(200).json({message: "Not Found."});
            }
        });
    });

    function generateID(){
        return Date.now();
    }

    
});

module.exports = app;
