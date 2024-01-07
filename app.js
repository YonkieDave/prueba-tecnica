const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
app.use(express.json());

//Routes
const routes = require('./routes/auth.routes');
app.use(routes);

//Server
async function serverStart() {
    mongoose.connect(process.env.DB_HOST + process.env.DB_DB,
        ).then(r => {
        app.listen(process.env.PORT, () => {
            console.log("Servidor Iniciado en el puerto " + process.env.PORT)
        })
    }).catch(error => {
        console.log(error)
        console.log("No pude conectar a la base de datos")
    })
}

serverStart();