var express = require('express');
var router = express.Router();
const userModel = require("./users.js");
const postModel = require("./post.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alluserpost',async function(req,res,next){
let user = await userModel
.findOne({_id:"656679f5629463c09d7e30d8"})
.populate('posts')
res.send(user);
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
    postText: "hello shivam",
    user: "656679f5629463c09d7e30d8"
  });
let user = await userModel.findOne({_id:"656679f5629463c09d7e30d8"});
user.posts.push(createdPost._id);
await user.save()
res.send("done");

});

module.exports = router;
