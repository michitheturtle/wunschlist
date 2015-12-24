// set up ======================================================================
var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var configpath = './server/config/dbconfig';

/*if(env === 'development'){
    configpath = './server/config/devconfig'
}*/
var config = require(configpath);

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();

// routes ======================================================================
require('./server/routes/brand.js')(app);
require('./server/config/routes.js')(app);

// listen (start server with node server.js) ======================================
app.listen(config.port);
console.log("App listening on port " + config.port);
