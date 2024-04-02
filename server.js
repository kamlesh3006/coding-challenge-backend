const { Sequelize ,DataTypes} = require('sequelize');
const express = require("express");
const bodyParser = require('body-parser');
const compilex = require('compilex');
const passport = require('passport');
const session = require('express-session');
require("dotenv").config();

const errorHandler = require("./middleware/errorHandler")
const port = process.env.PORT;
const cors = require("cors")
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json()) //middleware


app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Initialize compilex with options
const options = { stats: true };
compilex.init(options);

app.post('/compile', (req, res) => {
  const code = req.body.code;
  const language = 'python';
  const envData = { OS: 'windows' };

  compilex.compilePython(envData, code, (data) => {
    console.log("Compilation response:", data); // Log the response data
    if (data.error) {
        // If there's a compilation error, send it back to the client
        res.status(400).json({ error: data.error });
    } else {
        res.json({ output: data.output });
    }
});
});
// Configure Passport to use Google Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
<<<<<<< HEAD
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
=======
  clientID: 'google_client_id',
  clientSecret: 'google_client_secret',
>>>>>>> d0cf7d66058ca764433cf6277e431463172c0dd6
  callbackURL: 'http://localhost:3001/api/users/auth/google/callback', // Adjust the callback URL
},
(accessToken, refreshToken, profile, done) => {
  // Use the profile information (id, displayName, emails, etc.) to create or update a user
  return done(null, profile);
}));

// Configure Passport to use GitHub Strategy
const GitHubStrategy = require('passport-github').Strategy;
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/github/callback', // Adjust the callback URL
},
(accessToken, refreshToken, profile, done) => {
  // Use the profile information (id, username, emails, etc.) to create or update a user
  return done(null, profile);
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id); // Use user's ID as the session key
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
  // Use the user's ID to fetch the user from your database
  done(null, id);
});



app.use('/api/users/',require("./routes/authRoutes"));



app.use(errorHandler)

app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/questions",require("./routes/questionRoutes"));

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    console.error('Missing required environment variables for database connection.');
    process.exit(1); // Exit the application if required variables are not present
  }
  
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});
