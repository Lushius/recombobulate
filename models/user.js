const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    uName: {
        type: String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    }
});

module.exports = mongoose.model('User', userSchema);