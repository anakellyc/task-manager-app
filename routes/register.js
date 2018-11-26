var express = require("express")
var app = express()
const bcrypt = require('bcrypt');

var User = require("../models/users")

app.get('/', function(req, res) {
  res.render('register')
})

app.post('/', function(req, res) {
  var user = new User(req.body);
  User.find({email: req.body.email})
  .then((result)=>{
    if (result.length == 0) {
      bcrypt.hash(req.body.password, 5, function(err, encryptedPassword) {
        if (err) res.send("ERROR")
        else {
          User.create({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword,
            // avatarUrl: { ???, default: 'images/default-avatar.png' }
          }) 
          .then(()=>{
            res.cookie("loggedIn", "true", {signed: true})
            res.render("dashboard", {loggedIn: true})
          })
          .catch((err)=>{
            res.end("ERROR", err)
          })
        }
      });
    }
    else {
      res.render("register", {loggedIn: false})
    }
  })
})

module.exports = app