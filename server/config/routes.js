var auth = require('./auth'),
		users = require('../controllers/users'),
		courses = require('../controllers/courses'),
		wunschlisten = require('../controllers/wunschlistenController'),
		mongoose = require('mongoose'),
		User = mongoose.model('User'),
		mailer = require('./emails');

module.exports = function(app) {

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);

	app.get('/api/courses', courses.getCourses);
	app.get('/api/courses/:id', courses.getCourseById);

	app.get('/api/wunschlisten', wunschlisten.getWuensche);
	app.get('/api/wunschlisten/:id', wunschlisten.getWunschById);
//	app.post('/api/wunschlisten', wunschlisten.createWunsch);
	app.put('/api/wunschlisten', wunschlisten.updateWunsch);

	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params[0]);
	});

	app.get('/test/sendmail', mailer.sendTestmail);


	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.all('/api/*', function(req, res) {
		res.send(404);
	});


	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};