const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/users', async (req, res)=> {
    try {
        let resultado = await authController.getUser();
        res.json(resultado);
    }catch (error) {
        res.status(400).send('Error al consultar los usuarios')
    }
});

router.post('/users', async (req, res)=> {
    try {
        await authController.newUser(req.body);
        res.status(201).json('Usuario agregado correctamente');
    }catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const entry = await authController.login(req.body);
        res.status(200).json({token: entry});
    } catch (error) {
        res.status(404).send(error);
    }
})


module.exports = router;