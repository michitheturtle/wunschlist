// set up ======================================================================
var express = require('express'),
    app = express(), 								// create our server w/ express
    mongoose = require('mongoose'), 					// mongoose for mongodb
    port = process.env.PORT || 8090, 				// set the port
    database = require('./config/database'), 			// load the database config
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    stylus = require('stylus');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


function compile(str,path){
    return stylus(str).set('filename', path);
}

// configuration ===============================================================
if (env === 'development') {
    mongoose.connect(database.local); 	// connect to mongoDB database on modulus.io
}
else {
    mongoose.connect(database.productive);
}

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
))

// routes ======================================================================
//require('./server/routes/todo.js')(server);
//require('./server/routes/brands.js')(server);
require('./server/routes.js')(app);

// listen (start server with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
