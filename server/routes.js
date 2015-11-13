var passport = require('passport');

module.exports = function(app) {

	// application -------------------------------------------------------------
	app.get('/butterfly', function(req, res) {

		res.type('text/plain');
		res.send('i am a beautiful butterfly');

	});

	app.post('/login', function(req, res, next){
		var auth = passport.authenticate('local',function(err,user){
			if(err){return next(err);}
			if(!user) {res.send({success:false});}

			req.logIn(user, function(err){
				if(err){return next(err);}
				res.send({success:true, user: user})
			})
		})
		auth(req,res,next);
	})

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};