const users = require('../db/schemas.db');
const jwt = require('../middlewares/jwt.mid');
const sessionController = require('../controllers/sessions.controller');

module.exports.getUser = async(email = null) => {
    try {
        console.log('[getUser][name]', email);
        if(email != null){
            const list = await users.userList.find({email: email})
            console.log('[getUser][resultado]', list);
            return list;
        }else{
            const list = await users.userList.find({})
            console.log('[getUser][resultado]', list);
            return list;
        }
    } catch (error) {
        console.log('[getUser][Error]', error);
        throw error;     
    }
}

module.exports.newUser = async(user) => {
    try {
        const userName = await this.getUser(user.email);
        if(userName.length <= 0){
            let add = await users.userList.create({
                email: user.email,
                pass: user.pass
                })
        console.log('[newUser][resultado]', add);
        return add;
        }else{
            throw 'El usuario ya existe';
        }           

    } catch (error) {
        console.log('[newUser][Error]', error);
        throw error;     
    }
}

module.exports.login = async(user) => {
    try {
        const userVal = await this.userValidate(user);
        console.log('[login][userVal]', userVal);
        const sessionValidate = await sessionController.validateSession(user.email); 
        if(userVal.length > 0){
            const token = await jwt.tokenGeneration(user.email);
            console.log('[login][token]', token);
            await sessionController.saveSession(user.email, token);
            return token;
        }else{
            throw 'Error en las credenciales'
        }
    } catch (error) {
        console.log('[login][Error]', error);
        throw error;     
    }
}

module.exports.userValidate = async(user) => {
    try {
        console.log('[userValidate][user]', user);
        const validate = await users.userList.find({email: user.email, pass: user.pass});
        console.log('[userValidate][resultado]', validate);
        return validate;

    } catch (error) {
        console.log('[userValidate][Error]', error);
        throw error;
    }
}