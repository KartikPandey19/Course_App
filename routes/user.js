const express = require("express");
const {User,Course} = require("../db/index");
const userMiddlewares = require("../middlewares/user")
const router = express.Router();
const jwt = require("jsonwebtoken");
const secret = require("../config");


router.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })
    .then(function(){
        res.json({
            msg:"user successfully created"
        })
    })
});

router.post('/signin',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user =await User.find({
        username,
        password
    })
    if(user){
        const token = jwt.sign({username},secret);
        res.json({
            token
        })
    }else{
        res.status(411).json({
            msg:"incorrect email and password "
        })
    }
});

router.get('/courses',async(req,res)=>{
    const course = await Course.find({})
    res.json({
        course:course
    })
})

router.post('/courses/:id',userMiddlewares,async(req,res)=>{
    const courseId = req.params.id;
    const token = req.headers.authorization;
    const word = token.split(" ");
    const username =word[1];
    const decodeUsername = jwt.decode(username);

    await User.updateOne({
        username:decodeUsername.username
    },{
        "$push":{
            purchasedCouses:courseId
        } 
    })
    res.json({
        msg:"course purchase sucessfully"
    })
});

router.get('/purchasedCourse',userMiddlewares,async (req,res)=>{
    const token = req.headers.authorization;
    const word = token.split(" ");
    const username =word[1];
    const decodeUsername = jwt.decode(username);
    const user = await User.findOne({
        username:decodeUsername.username
    });
    const courses = await Course.find({
        _id:{
            "$in":user.purchasedCouses
        }
    })
    res.json({
        course:courses
    })
});

module.exports=router;
