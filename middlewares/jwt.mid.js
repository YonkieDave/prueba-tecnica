const jwt = require('jsonwebtoken');
const sessionSchema = require('../db/schemas.db');

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
            await validateSession(req.headers.jwt);
            next();
        } else {
            throw new Error('Invalid Token')
        }        
    } catch (error) {
        console.log('[ tokenVerify ] [ Error ]', error);
        res.status(400).send(error);
    }
}

const validateSession = async (token) => {
    try {
        const session = await sessionSchema.sessions.find({token: token});
        console.log('[validateSession][session]', session);
        if(session.length > 0){
            return session;
        }else{
            throw 'No estas autenticado';
        }   
    } catch (error) {
        console.log('[validateSession][Error]', error);
        throw error;
    }
}