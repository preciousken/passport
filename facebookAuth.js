const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
require('dotenv').config()



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