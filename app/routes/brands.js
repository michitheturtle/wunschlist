/**
 * Created by michael on 09.11.15.
 */
/**
 * Created by michael on 09.11.15.
 */

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

const baseUrl = '/api/brands/';
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


    app.get(baseUrl + 'getall', function(req, res) {

        // use mongoose to get all todos in the database
        getBrands(res);
    });

    // create todo and send back all todos after creation
    app.post(baseUrl + 'getall', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Brand.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getBrands(res);

        });

    });

    app.get('/api/brands/create', function(req, res) {

        // use mongoose to get all todos in the database
        Brand.create({
            name : 'Hammer',

        }, function(err, brand) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            //getBrands(res);
            res.type('text/plain');
            res.send('i am a beautiful butterfly');
        });
    });

    app.get(baseUrl + 'scrape', function(req, res) {

        url = 'http://www.imdb.com/title/tt1229340/';

        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);

                var title, release, rating;
                var json = { title : "", release : "", rating : ""};

                $('.header').filter(function(){
                    var data = $(this);
                    title = data.children().first().text();
                    release = data.children().last().children().text();

                    json.title = title;
                    json.release = release;
                })

                $('.star-box-giga-star').filter(function(){
                    var data = $(this);
                    rating = data.text();

                    json.rating = rating;
                })
            }

            fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');
            })

            res.send('Check your console!')
        })
    });



    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });


};