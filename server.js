// set up ======================================================================
var express = require('express'),
    request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var configpath = './server/config/prodconfig';

if(env === 'development'){
    configpath = './server/config/devconfig'
}

var config = require(configpath);

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username:username}).exec(function(err, user){
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        })
    }
));

passport.serializeUser(function(user, done){
    if(user){
        done(null, user._id);
    }
})

passport.deserializeUser(function(id, done){
    User.findOne({_id: id}).exec(function(err,user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
})

// routes ======================================================================
require('./server/routes.js')(app);

// listen (start server with node server.js) ======================================
app.listen(config.port);
console.log("App listening on port " + config.port);
