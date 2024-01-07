const sessionSchema = require('../db/schemas.db');

module.exports.saveSession = async(email, token) => {
    try {
            const addSession = await sessionSchema.sessions.create({
                email: email,
                token: token
                })
        console.log('[saveSession][addSession]', addSession);
        console.log('[saveSession][Sesión guardada]');
    } catch (error) {
        console.log('[saveSession][Error]', error);
        throw error;     
    }
}

module.exports.validateSession = async(email) => {
    try {
        const session = await sessionSchema.sessions.find({email: email});
        console.log('[validateSession][session]', session);
        if(session.length > 0){
            await sessionSchema.sessions.deleteOne({email: session[0].email});
            console.log('[validateSession][Sesión anterior eliminada]');
        }
    } catch (error) {
        console.log('[validateSession][Error]', error);
        throw error;     
    }
}