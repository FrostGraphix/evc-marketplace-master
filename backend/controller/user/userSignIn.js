
const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel")
const jwt = require('jsonwebtoken');


async function userSignInController(req,res){
    try{
        const {email, password} = req.body

        if (!email) {
            return res.json({ message: 'Please provide email', error: true, success: false });
        }
        if (!password) {
            return res.json({ message: 'Please provide password', error: true, success: false });
        }


        const user = await userModel.findOne({email})
        if (!user) {
            throw new Error ("User not found")
        
        }

            const checkPassword = await bcrypt.compare(password, user.password)
                console.log("checkPassword", checkPassword)

              if (checkPassword){
                const tokenData = {
                    _id : user.id,
                    email : user.email,

                }
              const token = await  jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); //token will expire after 8 hours
             
              const tokenOption = {
                httpOnly : true,
                secure : true,
                sameSite : 'None'
              }
                res.cookie("token",token).json({
                    message : "Login Successfully",
                    data : tokenData,
                    success : true,
                    error : false
                })

            } else {
                throw new Error("Please check Password")
              } 


    }catch(err){
        res.json({
            message:   err.message || err,
            error: true,
            success: false,
        });
    }


} 

module.exports = userSignInController


/*const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({ message: 'Please provide email', error: true, success: false });
        }
        if (!password) {
            return res.json({ message: 'Please provide password', error: true, success: false });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkPassword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user.id,
                email: user.email,
            };
            
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // Token will expire after 8 hours

            const tokenOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Only set secure to true in production
                maxAge: 60 * 60 * 8 * 1000, // 8 hours in milliseconds
                sameSite: 'Lax' // Adjust based on your needs
            };

            res.cookie('token', token, tokenOptions).json({
                message: "Login Successfully",
                data: tokenData,
                success: true,
                error: false
            });

        } else {
            throw new Error("Please check Password");
        }

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;*/



/*const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({ message: 'Please provide email', error: true, success: false });
        }
        if (!password) {
            return res.json({ message: 'Please provide password', error: true, success: false });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ message: 'User not found', error: true, success: false });
        }

        // Check if the password matches
        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkPassword", checkPassword);

        if (!checkPassword) {
            return res.json({ message: 'Incorrect password', error: true, success: false });
        }

        // If password is correct, send success response
        return res.json({ message: 'Login successful', error: false, success: true });

    } catch (err) {
        return res.json({
            message: err.message || 'An error occurred',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;*/