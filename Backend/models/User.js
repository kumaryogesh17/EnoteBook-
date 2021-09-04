const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// for storing the unique value of email

UserSchema.plugin(uniqueValidator);
const User =  mongoose.model('user', UserSchema);

//User.createIndexes();

module.exports = User