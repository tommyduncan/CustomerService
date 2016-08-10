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

/* 判斷使用者是否輸入正確的密碼 */
accountSchema.methods.validPassword = function(pwd) {
    // EXAMPLE CODE!
    return ( this.password === pwd );
};

//User.plugin(passportLocalMongoose);

module.exports = mongoose.model('account', accountSchema);