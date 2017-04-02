//ROUTER SETUP
//=========================================
var express = require('express');
var router = express.Router();

//EXTERNAL FILES
//======================================
var User = require('../models/user');
var Sitter = require('../models/sitter').model;
var findSitterIndex = require('../public/js/logic.js');


// Adding a new sitter
router.post('/add-sitter', function(req, res){
  console.log("new sitter", req.body);
  User.findOne({
    username: req.user.username
  })
  .then(function(user){
    if(!req.body.done){
      var done = false;
    }
    user.sitterList.push({
      name: req.body.name,
      age: req.body.age,
      rate: req.body.rate,
      stars: req.body.stars,
      comments: req.body.comments,
    });
    user.save();
    res.json(user);
    console.log(user);
  })
  .catch(function(err){
    console.log(err);
  });
});

// Editing an existing sitter
router.put('/edit/:userid/:id', function(req, res){
  var userId = req.params.userid;
  var sitterId = req.params.id;
   User.findOne({
     _id: userId
  }, function(err, user){
    var sitterIndex = findSitterIndex(sitterId, user.sitterList);

    user.sitterList[sitterIndex].name = req.body.name;
    user.sitterList[sitterIndex].age = req.body.age;
    user.sitterList[sitterIndex].rate = req.body.rate;
    user.sitterList[sitterIndex].stars = req.body.stars;
    user.sitterList[sitterIndex].comments = req.body.comments;

    user.save(function(err){

      if(err) console.log(err);
      console.log("Edited Sitter Saved to User!!!");
      res.json(user);
    });

  });
});

// Deleting a sitter
router.delete('/delete/:userid/:id', function(req, res){
   var userId = req.params.userid;
   var sitterId = req.params.id;
  User.findOne({
    _id: userId
  }, function(err, user){

    var sitterIndex = findSitterIndex(sitterId, user.sitterList);
    user.sitterList.splice(sitterIndex, 1);
    user.save(function(err){

      if(err) console.log(err);
      console.log("Sitter deleted from User");
      res.json(user);
    });

  });
});

module.exports = router;
