const {JWT_SECERT} = require("./config")
const jwt = require("jsonwebtoken")

function authMiddleware(req,res, next){
    const token = req.headers.authorization;
    
    if(!token || !token.startsWith('Bearer ')){
        return res.status(403).json({message : "token error"})
    }

    const actualToken = token.split(" ")[1]

    try{
        const isValid = jwt.verify(actualToken, JWT_SECERT);
        req.userId = isValid.userId

        next();
    } 
    catch(err){
        return res.status(403).json({message : "validation failed"})
    }
}

module.exports = {
    authMiddleware
}