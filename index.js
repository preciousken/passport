const express = require('express');
const session = require('express-session')
const app = express();
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  

const passport = require('passport');


app.use(passport.initialize());

require('./facebookAuth');

app.get('/login/facebook', passport.authenticate("facebook",{scope:['email']}));

app.get("/facebook",passport.authenticate("facebook"),(req,res)=>{
    // 
    console.log('welcome');
})

app.listen('3000',()=>console.log('app : 3000'))