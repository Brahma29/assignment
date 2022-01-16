const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'i2j4n3ki@i3j!kndjknef$hejj';

//Creating User
router.post('/',[
    body('firstName','length should be atleast 3 characters').isLength({min : 3}),
    body('lastName','length should be atleast 3 characters').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Minimum 5 characters').isLength({ min: 5 }),
    body('phone', 'Enter a valid phone number').isLength({min : 10}),
    body('address', 'Enter a valid address').isLength({min : 10})

], async (req, res)=>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({error : "User with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: secPass,
        phone: req.body.phone,
        address: req.body.address,
      });

      const data = {
          user : {
              id : user.id
          }
      }
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
    
    res.json({success, authToken});
    }catch(error){
        res.status(500).send('Internal Server Error');
    }
})

//Login User
router.post(
    '/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()],
    async (req, res) => {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {email, password} = req.body;
      try {
          let user = await User.findOne({email});
          if(!user){
              return res.status(400).json({error : "Please enter correct credentials"})
          }
          const passCompare  = await bcrypt.compare(password, user.password);
          if(!passCompare){
            return res.status(400).json({error : "Please enter correct credentials"})
          }
          const data = {
            user : {
                id : user.id
            }
        }
        success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
        res.json({success, authToken});
      } catch(error){
        res.status(500).send('Internal Server Error');
    }

    })

// Getting User details
router.post(
    '/getUser', fetchUser,
    async (req, res) => {
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch(error){
    res.status(500).send('Internal Server Error');
}
})

module.exports = router;