/**
 * Created by michael on 12.11.15.
 */
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    methodOverride = require('method-override'); 			// load the database config;

module.exports = function (app, config) {

    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

//
    app.use(express.static(config.rootPath + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(morgan('dev')); // log every request to the console
    app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
    app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ))
}