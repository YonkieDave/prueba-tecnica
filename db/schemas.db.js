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

const pointsSchema = new Schema({
    location: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const userList = model('users', userSchema);
const sessions = model('sesiones', sessionSchema);
const places = model('points', pointsSchema);

module.exports = {
    userList,
    sessions,
    places,
}