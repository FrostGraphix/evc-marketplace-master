const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { forgotPassword } = require('../controller/forgotPasswordController');
const crypto = require('crypto');
const User = require('../models/User'); // Assuming you have a User model

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'Roman Frost',
        pass: 'Abdulsamad123'
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@yourdomain.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
    res.send({ message: 'An email has been sent to ' + user.email + ' with further instructions.' });
  } catch (error) {
    res.status(500).send({ message: 'Error sending email. Please try again.' });
  }
});

module.exports = router;