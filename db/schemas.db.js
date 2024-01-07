const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const sessionSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const userList = model('users', userSchema);
const sessions = model('sesiones', sessionSchema);

module.exports = {
    userList,
    sessions,
}