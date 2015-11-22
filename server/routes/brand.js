/**
 * Created by michael on 09.11.15.
 */
var Brand = require('../models/brand');

function getBrands(res){
    Brand.find(function(err, brands) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(brands); // return all todos in JSON format
    });
};

module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/brands', function(req, res) {

        // use mongoose to get all todos in the database
        getBrands(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/brands', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Brands.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getBrands(res);
        });

    });

    // delete a todo
    app.delete('/api/brands/:brand_id', function(req, res) {
        Brand.remove({
            _id : req.params.brand_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            getBrands(res);
        });
    });


};