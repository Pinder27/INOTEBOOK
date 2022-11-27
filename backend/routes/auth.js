const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//const { findOne } = require('../models/User');
var fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = "pindersinghjwt";

router.post('/createuser',
body('name','Enter a valid name').isLength({min:3}),
body('password','Enter a valid password').isLength({ min: 5 }),
body('email','Enter a valid email').isEmail()
,async (req,res)=>{
  let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success,error: "the user with same email already exists"})
    }
const salt = await bcrypt.genSalt(10);
const secpass = await bcrypt.hash(req.body.password,salt);

   user = await User.create({
        name: req.body.name,
        password: secpass,
        email : req.body.email,
      })
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      success = true;
      res.json({success,authToken});
      //res.json(user)
    } catch(error){
      console.error(error.message);
      res.status(500).send("some error occured")
    }
      // .then(user => res.json(user)).catch(err=>{console.log(err)
      // res.json({error: 'please enter unique value for email',message: err.message})});
})

router.post('/login',

body('password','password can not be blank').exists(),
body('email','Enter a valid email').isEmail()
,async (req,res)=>{
   let success = false
       const {password,email} = req.body;
       
       try{
        const user = await User.findOne({email});
        if(!user){
          success = false
          return res.status(400).json({error:"please enter correct login credentials"})
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
          success = false
          return res.status(400).json({success, error:"please enter correct login credentials"})
        }
        const data = {
          user:{
            id: user.id
          }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success,authToken});
       }
       catch(error){
        console.error(error.message);
        res.status(500).send("some error occured")
       }
       
})

router.post('/getuser',fetchUser,async (req,res)=>{
  try{
    userID = req.user.id;
    //console.log(userID)
    const user = await User.findById(userID).select("-password")
    res.send(user);
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("internal server error")
   }
})

module.exports = router;