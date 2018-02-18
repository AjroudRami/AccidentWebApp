var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    accidentId: Schema.Types.ObjectId,
    userId: String,
    title: String,
    message: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
