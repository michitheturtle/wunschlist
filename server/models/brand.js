var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var brandSchema = new Schema({
	name: String,
	meta: {
		website: String
	},
	created_at: Date,
	updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Brand = mongoose.model('Brand', brandSchema);

// make this available to our users in our Node applications
module.exports = Brand;

/*
module.exports = mongoose.model('Brand', {
	name : {type : String, default: ''},
	url: {type : String, default: ''},
	logo_url : {type : String, default: ''}
});*/
