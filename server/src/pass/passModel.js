var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passSchema = new Schema({

    accountName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
} , { collection: 'pass'} );

module.exports = mongoose.model('pass', passSchema);