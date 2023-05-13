require('dotenv').config();


const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user,done) => {
    done(null, user.id);
})

passport.deserializeUser((user,done) => {
    done(null, user.id);
})


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
   // Register user here.
   console.log(profile)
   cb(null,profile);
  }
));