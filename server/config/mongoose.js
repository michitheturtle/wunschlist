/**
 * Created by michael on 12.11.15.
 */
var mongoose = require('mongoose'),
    crypto = require('crypto');

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
        userName: String,
        salt: String,
        hashed_pwd: String
    });

    userSchema.methods = {
        authenticate:function(passwordToMatch){
            return hashPwd(this.salt,passwordToMatch) === this.hashed_pwd;
        }
    }
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;

            salt = createSalt();
            hash = hashPwd(salt,'hanspeter');
            User.create({firstName: 'Hans', lastName: 'Peter', userName: 'hanspeter', salt: salt, hashed_pwd:hash});

            salt = createSalt();
            hash = hashPwd(salt,'FreiLich');
                        User.create({firstName: 'Frei', lastName: 'Lich', userName: 'FreiLich', salt: salt, hashed_pwd:hash});

            salt = createSalt();
            hash = hashPwd(salt,'admin');
            User.create({firstName: 'Hacker', lastName: 'Hans', userName: 'admin', salt: salt, hashed_pwd:hash});
        }
    })
}

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}