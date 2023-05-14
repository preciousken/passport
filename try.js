const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
require('dotenv').config()

// Initialize Express app
const app = express();
const port = 3000;

// Configure Passport with Facebook strategy
passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // This callback function is called when a user is successfully authenticated
    // You can perform actions like saving the user to a database or creating a session here
    console.log(profile);
    return done(null, profile);
  }
));

passport.serializeUser((user,done) => {
    done(null, user);
  })
  
  
  passport.deserializeUser((user,done) => {
    done(null, user);
  })
  
// Middleware for session support
app.use(session({
  secret: 'YOUR_SESSION_SECRET',
  resave: true,
  saveUninitialized: true,
}));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Facebook authentication route
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook callback route
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});