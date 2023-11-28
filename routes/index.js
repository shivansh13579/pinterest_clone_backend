var express = require('express');
var router = express.Router();
const userModel = require("./users.js");
const postModel = require("./post");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser', async function(req,res,next){
  let createduser = await userModel.create({
    username: "shivam",
    password: "harsh",
    posts: [],
    email: "shvam@gmail.com",
    fullName: "shivam kumar singh" 
  });
  res.send(createduser);
});

router.get('/createpost', async function(req,res,next){
const createdPost = await postModel.create({
    postText:"hello everyone",
    user: "65653402d7841c61e81d835b"
  });
  let user = await userModel.findOne({_id: "65653402d7841c61e81d835b"});
  user.posts.push(createdPost._id);
  await user.save();
  res.send("done");
});

module.exports = router;
