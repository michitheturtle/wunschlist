/**
 * Created by michael on 14.12.15.
 */
var Wunschliste = require('mongoose').model('wunschliste');

exports.getWuensche = function(req, res) {
    Wunschliste.find({}).exec(function(err, collection) {
        res.send(collection);
    })
};

exports.getWunschById = function(req, res) {
    Wunschliste.findOne({_id:req.params.id}).exec(function(err, wunsch) {
        res.send(wunsch);
    })
}