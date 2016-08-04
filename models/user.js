var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new Schema({
    username: String,
	password: String
}, 
{
    versionKey: false
});

accountSchema.methods.validPassword = function(pwd) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('account', accountSchema);