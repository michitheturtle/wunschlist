// set up ======================================================================
var express = require('express');
var app = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port = process.env.PORT || 8090; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';


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


// routes ======================================================================
require('./app/routes/todo.js')(app);
require('./app/routes/brands.js')(app);
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
