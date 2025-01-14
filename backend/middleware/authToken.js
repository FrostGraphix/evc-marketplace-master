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
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
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



/*const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token; // Retrieve token from cookies

    if (!token) {
      return res.status(401).json({
        message: "Please Login....", // Inform the user they need to log in
        error: true,
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid token. Please login again.",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?._id; // Attach the decoded userId to the request object
      next(); // Proceed to the add-to-cart controller
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;*/


