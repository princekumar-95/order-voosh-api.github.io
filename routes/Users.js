const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "Task"

// User Sign Up 
router.post('/add-user', async(req,res) => {
    const {name,phone_number, password} = req.body;
    try {
        const existingUser = await User.findOne({phone_number:phone_number});
        if(existingUser){
            return res.status(400).json("User Already Exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            name:name,
            phone_number:phone_number,
            password:hashedPassword
        })
        const Token = jwt.sign({phone_number:result.phone_number, id:result._id}, SECRET_KEY);
        res.status(201).json({result,token:Token})
    } catch (error) {
        console.log(error);
        res.status(500).json("Something Went Wrong")
    }
});

// User Sign In 
router.post('/login-user', async(req,res)=>{
  const {phone_number, password} = req.body;
  try {
    const existingUser = await User.findOne({phone_number : phone_number});
    if(!existingUser){
        return res.status(404).json("User Not Found");
    }
    const matctPassword = await bcrypt.compare(password, existingUser.password);
    if(!matctPassword){
        return res.status(400).json("invalid Credentials");
    }
    const Token = jwt.sign({phone_number:existingUser.phone_number,id:existingUser._id}, SECRET_KEY);
    res.status(201).json({user:existingUser, token:Token})
  } catch (error) {
    console.log(error);
    res.status(500).json("Something Went Wrong")
  }

});

module.exports = router;
