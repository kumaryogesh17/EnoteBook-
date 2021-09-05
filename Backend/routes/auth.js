const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_privateKey = "joterahaiwomerahai$"

// create a user using POST "/api/auth/createuser"

router.post('/createuser', [

    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be length of 5 character').isLength({ min: 5 }),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Email is already in use" })
        }

        // creating hashing for password using bcryptjs

        const salt = await bcrypt.genSaltSync(10);
        const securePassword = await bcrypt.hashSync(req.body.password, salt);

        // creating a new users

        user = await User.create({
            name: req.body.name,
            password: securePassword,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
     // Generating Authentication json web token(JWT) and sending token to user ....
        
        const AuthToken = jwt.sign(data, JWT_privateKey);
       // console.log(AuthToken);
          res.json({AuthToken});
    }

    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Error Occured" })
    }









})



module.exports = router