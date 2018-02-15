var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccidentSchema = new Schema({
    loc: {
        type: [Number],
        index: '2d'
    },
    placeName: {
        type: String,
        default: "Unknown place"
    },
    seriousness: Number,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Accident', AccidentSchema);
