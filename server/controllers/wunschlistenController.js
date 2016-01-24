/**
 * Created by michael on 14.12.15.
 */
var Wunschliste = require('mongoose').model('wunschliste');

exports.getWuensche = function (req, res) {
    Wunschliste.find({}).exec(function (err, collection) {
        res.send(collection);
    })
};

exports.getWunschById = function (req, res) {
    Wunschliste.findOne({_id: req.params.id}).exec(function (err, wunsch) {
        res.send(wunsch);
    })
}

/*exports.createWunsch = function(req, res, next) {

 var userData = req.body;
 userData.username = userData.username.toLowerCase();
 userData.salt = encrypt.createSalt();
 userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
 User.create(userData, function(err, user) {
 if(err) {
 if(err.toString().indexOf('E11000') > -1) {
 err = new Error('Duplicate Username');
 }
 res.status(400);
 return res.send({reason:err.toString()});
 }
 req.logIn(user, function(err) {
 if(err) {return next(err);}
 res.send(user);
 })
 })
 }*/

exports.updateWunsch = function (req, res) {
    var userUpdates = req.body;

    // use our bear model to find the bear we want
    Wunschliste.findById(userUpdates._id, function(err, wunsch) {

        if (err)
            res.send(err);

        wunsch.title  = userUpdates.title;//.name = req.body.name;  // update the bears info
        wunsch.geschenke = userUpdates.geschenke;
        wunsch.erfuellt = userUpdates.erfuellt;

        wunsch.save(function(err) {
            if (err)
                res.send(err);
            else
                res.send(wunsch);
        });

    /*    // save the bear
        wunsch.save(function(err) {
            if (err)
                res.send(err);

            res.send(wunsch);
        });
*/
    });

};