const express = require("express");
const {User,Course} = require("../db/index");
const userMiddlewares = require("../middlewares/user")
const router = express.Router();


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

router.get('/courses',async(req,res)=>{
    const course = await Course.find({})
    res.json({
        course:course
    })
})

router.post('/courses/:id',userMiddlewares,async(req,res)=>{
    const courseId = req.params.id;
    const username =req.headers.username;

    await User.updateOne({
        username:username
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
    const user = await User.findOne({
        username:req.headers.username
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
