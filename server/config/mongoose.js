/**
 * Created by michael on 12.11.15.
 */
var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    wishModel = require('../models/wunschliste'),
    courseModel = require('../models/Course');

module.exports = function(config){
    mongoose.connect(config.dbConnectionString);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error'));
    db.once('open', function callback(){
        console.log('db connected');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
    wishModel.createDefaultWishes();
};
