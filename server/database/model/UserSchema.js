var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password:String,
    userRank:{
        type:String,
        enum: ['MANAGER', 'CLIENT'],
        default : 'CLIENT'
    }
});

module.exports = mongoose.model('User', UserSchema);
