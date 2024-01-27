const {Admin} = require('../db/index');

async function adminMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;

    var value = await Admin.findOne({
        username: username,
        password: password
    })
   
    if(value){
        next()
    }else{
        res.status(403).json({
            msg:'user not found'
        })
    }
}

module.exports = adminMiddleware;