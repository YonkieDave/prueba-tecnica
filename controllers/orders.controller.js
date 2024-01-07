const orderSchema = require('../db/schemas.db');
const midd = require('../middlewares/mid.middleware');

module.exports.listOrders = async () => {
    try {
        const orders = await orderSchema.orders.find({});
        return orders;
    } catch (error) {
        console.log('[listOrders][error]', error);
    }
}

module.exports.createOrder = async (order) => {
    try {
        console.log('[createOrder][order]', order);
        const addOrder = await orderSchema.orders.create({
                type: order.tipo,
                description: order.descripcion,
                route:{
                    pickup: order.ruta.salida,
                    dropoff: order.ruta.destino
                },
                status: order.estatus,
                truck: order.camion
            });
    console.log('[createOrder][addOrder]', addOrder);
    console.log('[createOrder][orden creada]', addOrder._id.toString());
    const idOrder = addOrder._id.toString();
    return idOrder;
    } catch (error) {
        console.log('[createOrder][error]', error);
        throw error;    
    }
}

module.exports.updateOrder = async (req) => {
    try {
        console.log('[updateOrder][req params]', req.params.id);
        console.log('[updateOrder][req body]', req.body);
        const upOrder = await orderSchema.orders.findOneAndUpdate({_id: req.params.id},{ 
                type: req.body.tipo,
                description: req.body.descripcion,
                route:{
                    pickup: req.body.ruta.salida,
                    dropoff: req.body.ruta.destino
                },
                status: req.body.estatus,
                truck: req.body.camion
            });
    console.log('[updateOrder][upOrder]', upOrder);
    console.log('[updateOrder][orden actualizada]');
    return true;
    } catch (error) {
        console.log('[updateOrder][error]', error);
        throw error;    
    }
}

module.exports.deleteOrder = async (id) => {
    try {
        const isValid = midd.validateStatus(id);
        if(isValid){
            const deleteOrder = await orderSchema.orders.deleteOne({_id: id});
            console.log('[deleteOrder][deleteOrder]', deleteOrder);
            return true;
        } else {
            throw 'No es posible eliminar la orden'; 
        }

    } catch (error) {
        console.log('[deleteOrder][error]', error);
        throw error;
    }
}