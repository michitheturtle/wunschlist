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

Brand.find({}).exec(function(err, collection){
	if(collection.length === 0){

		Brand.create({name:'Hobo',created_at: new Date(), updated_at: new Date() });
		Brand.create({name:'FischerPreis',created_at: new Date(), updated_at: new Date() });
		Brand.create({name:'Fabla',created_at: new Date(), updated_at: new Date() });
	}
})

// make this available to our users in our Node applications
module.exports = Brand;

