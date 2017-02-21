var express = require('express');
var router = express.Router();
var User = require('../lib/User');

// GET home page.
router.get('/', function(req, res, next){
  res.render('index', {title: 'Express'});
});

router.post('/', function(req, res, next){
  res.render('index', { title: 'Express'});
});

router.post('/login', function(req, res,){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username, password: password}, function(err, user){
      if(err) {
        console.log(err);
        return res.status(500).send();
      }

      if(!user) {
        return res.status(404).send();
      }

      return res.status(200).send(); 

    })
});

router.post('/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  var newuser = new User();
  newuser.username = username;
  newuser.password = password;

  newuser.save(function(err, savedUser){
    if(err){
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  })
})

module.exports = router;
