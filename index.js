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

require('./googleAuth')

app.get("/google",passport.authenticate("google",{scope: ["profile","email"]}));


app.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),(req,res)=>{
    res.send('logged in!')
})


app.listen('3000',()=>console.log('app : 3000'))