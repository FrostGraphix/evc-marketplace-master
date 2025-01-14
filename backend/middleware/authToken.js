const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    // Retrieve the token from cookies or headers
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("Error in auth:", err);
        return res.status(401).json({
          message: "Not authorized, invalid token",
          error: true,
          success: false,
        });
      }

      console.log("Decoded:", decoded);

      // Attach user details to request object
      req.userId = decoded?._id;
      req.user = decoded; // Attach the full decoded payload for further use

      next(); // Proceed to the next middleware or route handler
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;


