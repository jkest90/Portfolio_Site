require('colors');

//define and require dependenc
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require ('morgan'),
    routes = require('./routes'),
    fileServer = express.static('public'),
    fs = require('fs');
    sessions = require('client-sessions')

// create express app object
var app = express();

// define port for which to listen to connections on; automatically select port, OR port 3000.
var PORT = process.env.port || 3000;

// create cookie
app.use(sessions({
    cookieName: '_mean-auth', // front-end cookie name
    secret: 'DR@G0N$', // the encryption password : keep this safe
    requestKey: 'session', // req.session,
    duration: 86400, // 60 * 60 * 24 (number of seconds in a day), tells the middleware when the cookie/session should expire,
    cookie: {
        ephemeral: false,   // when true, cookie expires when browser is closed
        httpOnly: true,     // when true, the cookie is not accesbile via front-end JavaScript
        secure: false       // when true, cookie will only be read when sent over HTTPS
    }
}));

// '*' - no matter what route looks like, run middlewear if POST request.
app.post('*', bodyParser.json(),bodyParser.urlencoded({extended:true}));

// include static routes for serving up static html files.
app.use(fileServer);

// setup the logger
app.use(morgan('dev'));

// make our database connection
// mongoose.connect('mongodb://-- localhost/hackathon', function(errorTime ---){
//     errorTime ?
//         console.log('NO CONNECTION TO DB')
//         :    console.log('SQUAWK');
// });

// call our routes and pass express app object into it. always mount BELOW vertically mounted middlewear.
routes(app);

// listen for connections
app.listen(PORT, function(err){
    if(err) {
        console.log("Server Error: ",err);
        process.exit(1);
    } else {
        console.log("Server is up on port " + PORT);
    }
});
