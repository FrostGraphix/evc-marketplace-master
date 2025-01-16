const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email) {
            return res.json({ message: 'Please provide email', error: true, success: false });
        }
        if (!password) {
            return res.json({ message: 'Please provide password', error: true, success: false });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        // Verify password
        const checkPassword = await bcrypt.compare(password, user.password);
        console.log("checkPassword", checkPassword);

        if (!checkPassword) {
            throw new Error("Incorrect password");
        }

        // Generate token
        const tokenData = {
            _id: user.id,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // Token expires after 8 hours

        // Configure cookie options
        const tokenOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure in production
            maxAge: 60 * 60 * 8 * 1000, // 8 hours in milliseconds
            sameSite: 'None', // Required for cross-origin cookies
        };

        // Set cookie
        res.cookie('token', token, tokenOptions).json({
            message: "Login Successfully",
            data: tokenData,
            success: true,
            error: false,
        });

    } catch (err) {
        res.json({
            message: err.message || 'An error occurred',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
