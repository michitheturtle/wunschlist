/**
 * Created by michael on 12.11.15.
 */
var mongoose = require('mongoose');

module.exports = function(config){
    mongoose.connect(config.dbConnectionString);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error'));
    db.once('open', function callback(){
        console.log('db connected');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({firstName: 'Hans', lastName: 'Peter', userName: 'hanspeter'});
            User.create({firstName: 'Frei', lastName: 'Lich', userName: 'FreiLich'});
            User.create({firstName: 'Hacker', lastName: 'Hans', userName: 'haxx0r'});
        }
    })
}