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

const orderSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    route: {
        pickup:{
            type: String,
            required: true
        },
        dropoff:{
            type: String,
            required: true
        }
    },
    status:{
        type: String,
        enum: ['Creada','Validando Orden', 'En Progreso', 'Finalizada']
    },
    truck:{
        type: String,
        required: true
    }
    }, {
    timestamps: true
});

const userList = model('users', userSchema);
const sessions = model('sesiones', sessionSchema);
const places = model('points', pointsSchema);
const orders = model('orders', orderSchema);

module.exports = {
    userList,
    sessions,
    places,
    orders,
}