const { Sequelize ,DataTypes } = require('sequelize');
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const db = require('../config/dbconnection.js');
const User = db.user;

const Joi = require('joi');

// Define Joi schema for your data
const registrationSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?`\-=[\];',./\\^]*).{8,}$/)
  .required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict(),
  year: Joi.string().valid('FE', 'SE', 'TE', 'BE').required(),
  branch: Joi.string().valid('Computer', 'IT', 'Mechanical', 'Civil').required(),

});

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { firstname, lastname, email, password, confirmPassword, year, branch } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({ error: 'Both password and confirmPassword are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      year,
      branch,
  
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if the user with the given email exists
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token for authentication using the secret key from the environment variable
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24hr' });

    res.status(200).json({ userId: user.id, role: user.role, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





const editUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
    const updatedFields = req.body;

    try {
        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's profile with the provided optional fields
        await user.update({
            ...updatedFields,
            profilePicture: req.file ? req.file.filename : user.profilePicture, // Update the profile picture if a new file is uploaded
            email: user.email, // Assuming email is not updatable
            password: user.password, // Assuming password is not updatable
            confirmPassword: user.confirmPassword, // Assuming confirmPassword is not updatable
            role: user.role, // Assuming role is not updatable
        });

        // Optionally, you can return the updated user
        return res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
const viewProfileall = asyncHandler(async (req, res) => {
  try {
    // Fetch all user details from the database
    const allUsers = await User.findAll();

    if (!allUsers || allUsers.length === 0) {
      res.status(404).json({ error: 'No users found' });
      return;
    }

    // Respond with the array of user details
    res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const viewProfile = asyncHandler(async (req, res) => {
  try {
    // Fetch the user details from the database using the decoded user ID
    const userId = req.user.id;
    const currentUser = await User.findByPk(userId);

    if (!currentUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Respond with the user details
    res.status(200).json({ user: currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//private access
const currentUser = asyncHandler(async (req, res) => {
  try {
    // Fetch the user details from the database using the decoded user ID
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Respond with the user details
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports={
    registerUser,
    loginUser,
    editUser,
    currentUser,
    viewProfile,
    viewProfileall
   
}