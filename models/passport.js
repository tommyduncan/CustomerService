var LocalStrategy = require('passport-local').Strategy;
var account = require('../models/user');

module.exports = function(passport, userInfo){
	passport.use('local-login', new LocalStrategy(
		function(username, password, done){
			account.findOne({username: username}, function(err, user){
				if (err)
					return done(err);
				if(!user)
					return done(null, false, {message: 'Incorrect username.'});
				if (!user.validPassword(password))
					return done(null, false, {message: 'Incorrect password.'});
				
				userInfo = user;
				return done(null, user);
			});
		}
	));
	
	passport.serializeUser(function (user, done){
		done(null, user.username);
	});
	
	passport.deserializeUser(function (username, done){
		account.findOne({username: username}, function (err, user) {
			if (err) {
				return done(err);
			}
			done(null, user);
		});
	});
};