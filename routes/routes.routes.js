const express = require('express');
const router = express.Router();
const midd = require('../middlewares/mid.middleware');
const authController = require('../controllers/auth.controller');
const pointsController = require('../controllers/points.controller');
const ordersController = require('../controllers/orders.controller');

//AUTH ROUTES
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
});

//POINTS ROUTES

router.get('/points', midd.tokenVerify, async (req, res) => {
    try {
        const availablePoints = await pointsController.getPoints();
        res.status(200).json(availablePoints);
    } catch (error) {
        res.status(404).send(error);
    }
});

//ORDERS ROUTES

router.get('/orders', midd.tokenVerify, async (req, res) => {
    try {
        const listOrders = await ordersController.listOrders();
        res.status(201).json(listOrders);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/orders', midd.tokenVerify, midd.ordersTruckValidate, async (req, res) => {
    try {
        const order = await ordersController.createOrder(req.body);
        console.log('[create route][order]', order);
        const resp = {
            status: 'Orden Creada',
            orderId: order
        }
        res.send(resp);
    } catch (error) {
        console.log('[create route][Error]', error);
        res.status(400).send(error);
    }
});

router.patch('/orders/:id', midd.tokenVerify, midd.validateUpdate, async (req, res) => {
    try {
        await ordersController.updateOrder(req);
        res.status(201).json({status: 'Orden Actualizada'});
    } catch (error) {
        console.log('[update route][Error]', error);
        res.status(404).send(error);
    }
});

router.delete('/orders/:id', midd.tokenVerify, async (req, res) => {
    try {
        await ordersController.deleteOrder(req.params.id);
        res.status(200).json({status: 'Orden Eliminada'});
    } catch (error) {
        console.log('[update route][Error]', error);
        res.status(404).send(error);
    }
});


module.exports = router;