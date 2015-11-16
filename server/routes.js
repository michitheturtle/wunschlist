var auth = require('./config/auth'),
		mongoose = require('mongoose'),
		User = mongoose.model('User');

module.exports = function(app) {

/*	app.get('/api/users', auth.requiresRole('admin'), function(req, res) {
		User.find({}).exec(function(err, collection) {
			res.send(collection);
		})
	});*/

	app.get('/bootstrappedUser', function(req, res){
		if(req.user)
			res.json(req.user);
		else
			res.status(401).end();
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html', {
			bootstrappedUser: req.user
		}); // load the single view file (angular will handle the page changes on the front-end)
	});
};