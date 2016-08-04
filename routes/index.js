var account = require('../models/user');

module.exports = function(app, passport){

	app.get('/', function(req, res, next) {
		res.render('index', { title: 'Customer Service Interface' });
	});

	app.get('/csInterface', isLoggedIn, function(req, res) {
		//console.log(req.session);
		res.render('cs', { title: 'Customer Service Interface' });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/csInterface',
		failureRedirect : '/'
	}));
	
	app.get('/logout', function(req, res, next){
		req.logout();	    // to remove the influence of passportjs
		req.session.destroy();    // to remove session relative data
		console.log('User logout success !');
		res.redirect('/');
	});
	
	app.get('/getUser', function(req, res){
		res.json({userId: req.session.passport.user});
	});
	
	/*app.post('/insert', function(req, res) {
		var s = new account( {username: req.body.username, password: req.body.password} );
		s.save(function(err,account){
			console.log(err);
		});
	});*/
	
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()){
			return next();
		}
		res.redirect('/');
	}
};