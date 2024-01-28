const {User} = require('../db/index')
const sceret = require("../config");
const jwt = require("jsonwebtoken");


async function userMiddleware(req,res,next){
    
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken =words[1];

    try{
        const decodedValue = jwt.verify(jwtToken,sceret);
        if(decodedValue.username){
            next()
        }else{
            res.status(403).json({
                msg:'you are not authenticated'
            })
        }
    }catch(e){
        req.json({
            msg:"Incorrect Inputs"
        })
    }
}

module.exports=userMiddleware;