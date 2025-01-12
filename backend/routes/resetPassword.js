const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { resetPassword } = require('../controller/resetPasswordController');
const User = require('../models/User'); // Assuming you have a User model

router.post('/reset/:bef318c350b0e403025f388ff2fca0ba', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).send({ message: 'Password reset token is invalid or has expired.' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.send({ message: 'Password has been reset successfully.' });
  } catch (error) {
    res.status(500).send({ message: 'Error resetting password. Please try again.' });
  }
});

module.exports = router;