const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchuser');
const JWT_SECRET = "Harryisagoodb$oy";

router.post('/createUser',[
 
 body('name','enter a valid name').isLength({ min:  2 }),
 body('email').isEmail(),
 body('password').isLength({ min: 5 })],

 async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

     try{
     let user= await User.findOne({email:req.body.email});
     if(user){
         return res.status(400).json({error:"This user already exist"})
     }


     const salt= await bcrypt.genSalt(10);
     secPass= await bcrypt.hash(req.body.password,salt)
     user=await  User.create({
        name: req.body.name,
        email:req.body.email,
        password: secPass,
      })
     const data={
      user:{
        id:user.id
      }
     }
     const authToken=jwt.sign(data,JWT_SECRET);

     res.json({authToken})


  }catch{
    console.error(error.message);
    res.status(500).send("some error occured");
  }

})




router.post('/login',[
 
  body('email','Enter a valid email').isEmail(),
  body('password','password cannot be empty').exists()],
 
  async (req,res)=>{
    let success=false;
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const {email,password} = req.body;

     try {
      
      let user=await User.findOne({email});
      if(!user){
        return res.status(400).json({success,error:"wrong credentials"})
      }

      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({success,error:"wrong credentials"})
      }

      const data={
        user:{
          id:user.id
        }
       }

       const authToken=jwt.sign(data,JWT_SECRET);
       success=true;
       res.json({success,authToken});



     } catch (error) {
        
      console.error(error.message);
      res.status(500).send("some error occured");

     }
 
    })



    router.post('/getuser',fetchUser,
     
      async (req,res)=>{
        try {
          userId=req.user.id;
          const user= await User.findById(userId).select();
          res.send(user);
        } 
        catch (error ) {
          console.error(error.message);
          res.status(500).send("some error occured");
        }

      })

module.exports = router;