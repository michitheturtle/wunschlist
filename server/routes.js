
module.exports = function(app) {

	// application -------------------------------------------------------------
	app.get('/butterfly', function(req, res) {

		res.type('text/plain');
		res.send('i am a beautiful butterfly');

	});

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};