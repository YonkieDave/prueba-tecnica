const pointSchema = require('../db/schemas.db');

module.exports.getPoints = async() => {
    try {
            const listPoints = await pointSchema.places.find({});
            console.log('[getPoints][listPoints]', listPoints);
            return listPoints;
     
    } catch (error) {
        console.log('[getPoints][Error]', error);
        throw error;     
    }
}