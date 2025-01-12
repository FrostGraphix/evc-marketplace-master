const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel'); // Ensure this path is correct

async function UserSignUpController(req, res) {
    try {
        const { email, password, name, location, hostel } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User with this email already exists', 
                error: true, 
                success: false 
            });
        }

        // Validate required fields
        if (!email || !password || !name ) {
            return res.status(400).json({ 
                message: 'Please provide email, password, and name', 
                error: true, 
                success: false 
            });
        }

        // Hash the password
         const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user payload
        const payload = {
            ...req.body,     // Includes all fields such as email, name, location, hostel
            role: "GENERAL", // Default role
            password: hashedPassword, // Overwrite the plain password with the hashed one
        };

        // Save user to database
        const userData = new userModel(payload);
        const savedUser = await userData.save();

        // Remove password from the response object for security
        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        // Respond with success message and user details (excluding password)
        return res.status(201).json({
            data: userWithoutPassword,  // User data without the password field
            success: true,
            error: false,
            message: 'User created successfully',
        });

    } catch (err) {
        // Catch and handle any errors
        return res.status(500).json({
            message: err.message || 'Server error',
            error: true,
            success: false,
        });
    }
}

module.exports = UserSignUpController;

// const bcrypt = require('bcryptjs');
// const userModel = require("../../models/userModel");

// async function userSignUpController(req, res) {
//     try {
//         const { email, password } = req.body;

//     //     email: '',
//     // password: '',
//     // name: '',
//     // confirmPassword: '',
//     // profilePic: '',
//     // location: '', // Track location
//     // hostel

//         if (!email) {
//             return res.json({ message: 'Please provide email', error: true, success: false });
//         }
//         if (!password) {
//             return res.json({ message: 'Please provide password', error: true, success: false });
//         } if (!name) {
//             return res.json({ message: 'Please provide name', error: true, success: false });
//         }if (!location) {
//             return res.json({ message: 'Please provide location', error: true, success: false });
//         }if (!hostel) {
//             return res.json({ message: 'Please provide hostel', error: true, success: false });
//         }

//         // Check if the user already exists
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.json({ message: 'User already exists', error: true, success: false });
//         }

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the new user
//         const newUser = new userModel({
//             email: email.toLowerCase(), // Normalize email to avoid case sensitivity issues
//             password: hashedPassword,
//         });

//         await newUser.save();

//         res.json({
//             message: "User created successfully",
//             success: true,
//             error: false
//         });
//     } catch (err) {
//         res.json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = userSignUpController;



// const bcrypt = require('bcryptjs');
// const userModel = require("../../models/userModel");
// const jwt = require('jsonwebtoken');

// async function userSignInController(req, res) {
//     try {
//         const { email, password } = req.body;

//         if (!email) {
//             return res.json({ message: 'Please provide email', error: true, success: false });
//         }
//         if (!password) {
//             return res.json({ message: 'Please provide password', error: true, success: false });
//         }

//         const user = await userModel.findOne({ email });
//         if (!user) {
//             throw new Error("User not found");
//         }

//         const checkPassword = await bcrypt.compare(password, user.password);
//         if (checkPassword) {
//             const tokenData = {
//                 _id: user.id,
//                 email: user.email,
//             };
//             const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // token will expire after 8 hours

//             const cookieOptions = {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === 'production',
//                 sameSite: 'Strict',
//                 path: '/',
//             };

//             console.log("Setting cookie with options:", cookieOptions); // Debugging log

//             res.cookie("token", token, cookieOptions).json({
//                 message: "Login Successfully",
//                 data: tokenData,
//                 success: true,
//                 error: false
//             });
//         } else {
//             throw new Error("Please check Password");
//         }
//     } catch (err) {
//         res.json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = userSignInController;



/*const bcrypt = require('bcryptjs');
const userModel = require("../../models/userModel");
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
        if (checkPassword) {
            const tokenData = {
                _id: user.id,
                email: user.email,
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 }); // token will expire after 8 hours

            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure cookies in production
                sameSite: 'Strict', // Adjust according to your needs
                path: '/', // Ensure this matches the path used when setting the cookie
            };

            res.cookie("token", token, cookieOptions).json({
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
const User = require('../../models/userModel'); // Ensure this path is correct

async function UserSignUpController(req, res) {
    try {
        const { email, password, name, location, hostel } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User with this email already exists', 
                error: true, 
                success: false 
            });
        }

        // Validate required fields
        if (!email || !password || !name) {
            return res.status(400).json({ 
                message: 'Please provide email, password, and name', 
                error: true, 
                success: false 
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user payload
        const payload = {
            ...req.body,     // Includes all fields such as email, name, location, hostel
            role: "GENERAL", // Default role
            password: hashedPassword, // Overwrite the plain password with the hashed one
        };

        // Save user to database
        const userData = new User(payload);
        const savedUser = await userData.save();

        // Remove password from the response object for security
        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        // Respond with success message and user details (excluding password)
        return res.status(201).json({
            data: userWithoutPassword,  // User data without the password field
            success: true,
            error: false,
            message: 'User created successfully',
        });

    } catch (err) {
        // Catch and handle any errors
        return res.status(500).json({
            message: err.message || 'Server error',
            error: true,
            success: false,
        });
    }
}

module.exports = UserSignUpController;*/



/*const bcrypt = require('bcryptjs');
//const userModel = require('../models/userModel');  // Ensure this path is correct
const User = require('../../models/userModel');

async function UserSignUpController(req, res) {
    try {
        const { email, password, name, location, hostel } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ 
                message: 'User with this email already exists', 
                error: true, 
                success: false 
            });
        }

        // Validate required fields
        if (!email || !password || !name) {
            return res.status(400).json({ 
                message: 'Please provide email, password, and name', 
                error: true, 
                success: false 
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user payload
        const payload = {
            ...req.body,     // Includes all fields such as email, name, location, hostel
            role: "GENERAL", // Default role
            password: hashedPassword, // Overwrite the plain password with the hashed one
        };

        // Save user to database
        const userData = new userModel(payload);
        const savedUser = await userData.save();

        // Remove password from the response object for security
        const { password: _, ...userWithoutPassword } = savedUser.toObject();

        // Respond with success message and user details (excluding password)
        return res.status(201).json({
            data: userWithoutPassword,  // User data without the password field
            success: true,
            error: false,
            message: 'User created successfully',
        });

    } catch (err) {
        // Catch and handle any errors
        return res.status(500).json({
            message: err.message || 'Server error',
            error: true,
            success: false,
        });
    }
}

module.exports = UserSignUpController;*/





/*const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');  // Ensure this path is correct

async function UserSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        console.log("req.body", req.body)

        // Validate request body
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please provide email, password, and name', error: true, success: false });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user object
        const payload = {
            email,
            name,
            password: hashedPassword,
        };

        // Save user to database
        const userData = new userModel(payload);
        await userData.save();

        res.status(201).json({
            data: userData,
            success: true,
            error: false,
            message: 'User created successfully!',
        });

    } catch (err) {
        console.error('Error in UserSignUpController:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            error: true,
            success: false,
        });
    }
}

module.exports = UserSignUpController;*/



/*async function UserSignUpController(req, res) {
  try {
      const { email, password, name } = req.body;
      if (!email) throw new Error("Please provide email");
      if (!password) throw new Error("Please provide password");
      if (!name) throw new Error("Please provide name");

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const payload = {
          email,
          name,
          password: hashedPassword
      };

      const userData = new userModel(payload);
      const saveUser = await userData.save();

      res.status(201).json({
          data: saveUser,
          success: true,
          error: false,
          message: "User created successfully!"
      });

  } catch (err) {
      console.error(err.stack);  // Log the error stack
      res.status(500).json({
          message: "Internal server error",
          error: err.message,
          success: false
      });
  }
}

module.exports = UserSignUpController;  // Export the controller*/





/*const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function UserSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: "Please provide all fields (email, password, name)." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            email,
            password: hashPassword,
            name
        };

        const userData = new userModel(payload);
        const savedUser = await userData.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            message: "User created successfully!"
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong",
            error: true,
        });
    }
}

module.exports = UserSignUpController;*/




/*const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function UserSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    // Input validation
    if (!email) throw new Error("Please provide email");
    if (!password) throw new Error("Please provide password");
    if (!name) throw new Error("Please provide name");

    // Hash the password using bcrypt
    const saltRounds = 10; // You can change the number of rounds based on security needs
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user object with hashed password
    const payload = {
      ...req.body,
      password: hashPassword // Store the hashed password
    };

    // Save the user in the database
    const userData = new userModel(payload);
    const saveUser = await userData.save(); // await the save operation

    // Send a success response
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!"
    });

  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = UserSignUpController;*/





/*const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function UserSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    // Validate inputs
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    // Hash the password
    const saltRounds = 10;  // Number of salt rounds for bcrypt
    const hashPassword = await bcrypt.hash(password, saltRounds);

    if (!hashPassword) {
      throw new Error("Error hashing password");
    }

    // Create the user payload
    const payload = {
      ...req.body,
      password: hashPassword  // Store hashed password
    };

    // Save user data to the database
    const userData = new userModel(payload);
    const saveUser = await userData.save();

    // Return success response
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!"
    });
    
  } catch (err) {
    // Return error response
    res.status(400).json({
      message: err.message,
      error: true,
      success: false
    });
  }
}

module.exports = UserSignUpController;*/




/*const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')

async function UserSignUpController(req, res){
    try{
            const {email, password, name} = req.body
    if(!email){
        throw new Error("Please provide email")
    }
    if(!password){
        throw new Error("Please provide password")
    }
    if(!name){
        throw new Error("Please provide name")
    }

    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

    if(!hashPassword){
        throw new Error("something is wrong")
    }

    const payload = {
         ...req.body,
        password : password
    }
       
    

    const userData = new userModel(payload)

    const saveUser = userData.save()

    res.status(201).json({
        data : saveUser,
        success : true,
        error : false,
        message : "User created Successfully!"
    })

    }catch(err){
            res.json({
                message: err,
                error : true,
                success : false,
            })
    }
}

module.exports = UserSignUpController*/


