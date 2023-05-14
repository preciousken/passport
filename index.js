const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');


// Middleware for session support
app.use(session({
  secret: 'YOUR_SESSION_SECRET',
  resave: true,
  saveUninitialized: true,
}));

require('./facebookAuth')

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());


// Facebook authentication route
app.get('/auth/facebook', passport.authenticate('facebook'));


// Facebook callback route
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
);


// Dashboard
app.get('/dashboard',(req,res)=>{
  res.send('welcome to dashboard')
})


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});