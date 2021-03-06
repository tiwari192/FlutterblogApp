const jwt = require('jsonwebtoken');
require('dotenv').config()

let checkToken = (req, res, next) => {
    let token = req.headers['authorization'];
    token = token.slice(7, token.length);
    if(token){
        jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
            if(err){
                return res.json({status: false, msg: "token is invalid"});
            }
            else{
                req.decoded = decoded;
                //console.log(req.decoded.username);
                next();
            }
        })
    }
    else{
        return res.json({status: false, msg: "token is not provided"})
    }
    
}

module.exports = {
    checkToken: checkToken,
}