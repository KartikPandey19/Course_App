const {User} = require('../db/index')

async function userMiddleware(req,res,next){
    const username = req.headers.username
    const password = req.headers.password

    var value = await User.findOne({
        username:username,
        password:password
    })
    if(value){
        next();
    }else{
        res.status(403).json({
            msg:"user didn't exists"
        })
    }
}

module.exports=userMiddleware;