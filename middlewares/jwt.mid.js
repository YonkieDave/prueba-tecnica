const jwt = require('jsonwebtoken');


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

module.exports.tokenVerify = async (token) => {
    try {
        const result = jwt.verify(token, process.env.SECRET_KEY)
        if (result) {
            return result
        } else {
            throw new Error('Invalid Token')
        }        
    } catch (error) {
        console.log('[ tokenVerify ] [ Error ]', error);
    }

}