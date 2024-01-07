const jwt = require('jsonwebtoken');
const sessionSchema = require('../db/schemas.db');
const orderSchema = require('../db/schemas.db');


module.exports.tokenGeneration = async (data) => {
    try {
        console.log("generación del token ", data);
        const result = jwt.sign({ data }, process.env.SECRET_KEY);
        console.log("Token generado", result);
        return result;
            
    } catch (error) {
        console.log('[ tokenGeneration ] [ Error ]', error);
    }
}

module.exports.tokenVerify = async (req,res,next) => {
    try {
        const result = jwt.verify(req.headers.jwt, process.env.SECRET_KEY)
        if (result) {
            console.log('[tokenVerify][req.headers]', req.headers)
            const sessionIsValid = await validateSession(req.headers.email, req.headers.jwt);
            if(sessionIsValid){
                next();
            }
        } else {
            throw new Error('Invalid Token')
        }        
    } catch (error) {
        console.log('[ tokenVerify ] [ Error ]', error);
        res.status(400).send(error);
    }
}

const validateSession = async (email, token) => {
    try {
        const session = await sessionSchema.sessions.find({email: email, token: token});
        console.log('[validateSession][session]', session);
        if(session.length > 0){
            return true;
        }else{
            throw 'No estas autenticado';
        }   
    } catch (error) {
        console.log('[validateSession][Error]', error);
        throw error;
    }
}

module.exports.ordersTruckValidate = async (req, res, next) => {
    try {
        const isValid = await validateTruck(req.body.camion);
        if(isValid){
            next();
        }else{
            res.status(400).send({error:'El camion no esta disponible'});
        }
            } catch (error) {
        console.log('[ordersBodyValidate][error]', error);
        throw error;
    }
}

module.exports.validateUpdate = async (req, res, next) => {
    try {
        const statusIsValid = await this.validateStatus(req.params.id, req.body.estatus); 
        if(statusIsValid){
            next();
        }else{
            res.send('La orden no puede ser modificada');
        }
        
    } catch (error) {
        console.log('[validateUpdate][error]', error);
        throw error;
    }
}

module.exports.validateStatus = async (id) => {
    try {
        const order = await orderSchema.orders.find({_id: id});
        console.log('[validateStatus][order]', order);
        if(order.length > 0 && order[0].status === 'En Progreso'){
            return false;
        }
        return true;
        
    } catch (error) {
        console.log('[validateStatus][error]', error);
        throw error;        
    }
}

const validateTruck = async (truck) => {
    try {
        const orders = await orderSchema.orders.find({truck: truck});
        console.log('[validateTruck][orders]', orders);
        if(orders.length > 0){
            return false;
        }
        return true
    } catch (error) {
        console.log('[validateTruck][error]', error);
        throw error;
    }
}