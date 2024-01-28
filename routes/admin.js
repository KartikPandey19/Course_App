const express =require("express");
const adminMiddlewares =require('../middlewares/admin');
const {Admin, Course, User} = require("../db/index")
const secret = require("../config");
const router = express.Router();
const jwt = require("jsonwebtoken")

router.post('/signup',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    Admin.create({
        username:username,
        password:password
    })
    .then(function(){
        res.json({
            msg:"Admin created Successfully"
        })
    })
    .catch(function(){
        res.json({
            msg:"Admin Already Exists"
        })
    })
});

router.post('/signin',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.find({
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

   

})

router.post('/courses',adminMiddlewares,async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageLink  = req.body.imageLink;
    const price = req.body.price

   const newCourse = await Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price
    })

    res.json({
        msg:"course created succesfully",CourseId:newCourse._id
    })
    
})

router.get('/courses',adminMiddlewares,(req,res)=>{
    Course.find({})
    .then(function(response){
        res.json({
            courses:response
        })
    })

})


module.exports = router;