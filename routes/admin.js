const express =require("express");
const adminMiddlewares =require('../middlewares/admin');
const {Admin, Course} = require("../db/index")
const router = express.Router();

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