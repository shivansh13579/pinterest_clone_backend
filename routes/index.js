var express = require('express');
var router = express.Router();
const userModel = require("./users.js");
const postModel = require("./post.js");
const passport = require('passport');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next){
  res.render('login')
});

router.get('/feed',function (req,res,next){
  res.render('feed');
})

router.get('/profile',isLoggedIn,function(req,res,next){
  res.render("profile")
});

router.post("/register",function(req,res){
  // const userData = new userModel({
  //   username: req.body.username,
  //   email: req.body.email,
  //   fullName: req.body.fullName,
  const {username,email,fullname} = req.body;
  const userData = new userModel({username,email,fullname});

  userModel.register(userData,req.body.password)                  
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
  });

router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/login"
}),function(req,res){
});


router.get("/logout",function(req,res){
  req.logOut(function(err){
    if(err){return next(err);}
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}



module.exports = router;
