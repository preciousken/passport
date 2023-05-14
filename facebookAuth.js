require('dotenv').config();


const passport = require('passport')

passport.serializeUser((user,done) => {
  done(null, user);
})


passport.deserializeUser((user,done) => {
  done(null, user);
})


var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['emails','displayName','name','picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('welcome');
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

