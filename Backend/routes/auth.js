const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');


// create a user using POST "/api/auth/createuser"

router.post('/createuser',[

    body('name','Enter a valid Name').isLength({ min: 5 }),
    body('email','Enter a valid Email').isEmail(),
    body('password','Password must be length of 5 character').isLength({ min: 5 }),
    
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // creating new users
   
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      }).then(user => res.json(user))
      .catch(err=>{console.log(err)
    res.json({error:'Email is already in use',message:err.message})})
})



module.exports = router