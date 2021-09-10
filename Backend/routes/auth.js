const express = require('express')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const userFetch = require('../middleware/userFetch');
const JWT_privateKey = "joterahaiwomerahai$"

// create a user using POST "/api/auth/createuser"

router.post('/createuser', [

    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be length of 5 character').isLength({ min: 5 }),

], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success , error: "Email is already in use" })
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
        success =  true;
        // console.log(AuthToken);
        res.json({success, AuthToken });
    }

    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Some Error Occured" })
    }
})

// creating a login for users using POST "/api/auth/login"

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const AuthToken = jwt.sign(data, JWT_privateKey);
        success = true;
        res.json({success, AuthToken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

});

// Get users details using POST "/api/auth/getuser"    -- login Requires -- 

router.post('/getuser', userFetch,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })



module.exports = router