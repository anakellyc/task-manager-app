var express = require("express")
var app = express()
const bcrypt = require('bcrypt');
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

var User = require("../models/users")

app.get('/', function(req, res) {
  res.render('register', {unequalPassword: false, existingEmail: false})
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
            if (req.file) {
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
            else {
            User.create({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: encryptedPassword,
            }) 
            .then((result)=>{
              res.cookie("loggedIn", "true", {signed: true})
              res.cookie("wrongcredentials", "false", {signed: true})
              res.cookie("userId", `${result.id}`, {signed: true})
              res.cookie("existingproject", "false", {signed: true})
              res.cookie("existingtask", "false", {signed: true})
              res.render("dashboard", {loggedIn: true, result: result})
            })
            .catch((err)=>{
              res.end("ERROR", err)
            })
          }
        }
        });
      }
      else {
      res.render('register', {unequalPassword: true})
      }
    }
    else {
      res.render("register", {loggedIn: false, existingEmail: true})
    }
  })
})

module.exports = app