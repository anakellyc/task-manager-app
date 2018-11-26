var express = require("express")
var app = express()
const bcrypt = require('bcrypt');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

var User = require("../models/users")

app.get('/', function(req, res) {
  res.render('register', {unequalPassword: false})
})

app.post('/', upload.single('photo'), function(req, res) {
  var user = new User(req.body);
  User.find({email: req.body.email})
  .then((result)=>{
    if (result.length == 0) {
      if (req.body.password == req.body.confpassword) {
        bcrypt.hash(req.body.password, 5, function(err, encryptedPassword) {
          if (err) res.send("ERROR")
          else {
            User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: encryptedPassword,
              avatarUrl: `/uploads/${req.file.filename}`
            }) 
            .then((result)=>{
              res.cookie("loggedIn", "true", {signed: true, unequalPassword: false})
              res.render("dashboard", {loggedIn: true, result: result})
            })
            .catch((err)=>{
              res.end("ERROR", err)
            })
          }
        });
      }
      else {
      res.render('register', {unequalPassword: true})
      }
    }
    else {
      res.render("register", {loggedIn: false})
    }
  })
})

module.exports = app