var express = require("express")
var app = express()
const bcrypt = require('bcrypt');

var User = require("../models/users")

app.get('/', function(req, res) {
  res.render('login', {wrongcredentials: false})
})

app.post("/", function(req, res) {
  let email = req.body.email
  User.find({email: email})
  .then((result)=> {
    if (result.length == 0) {
      res.redirect("register")
    }
    else {
      bcrypt.compare(req.body.password, result[0].password, function(err, match) {
        if (match == true) {
          res.cookie("loggedIn", "true", {signed: true})
          res.cookie("wrongcredentials", "false", {signed: true})
          res.cookie("userId", `${result[0].id}`, {signed: true})
          res.render("dashboard", {loggedIn: true, result: result})
        }
        else {
          res.render("login", {wrongcredentials:true})
        }
      })
    }
  })
  .catch((err)=>{
    res.end("ERROR", err)
  })
})

module.exports = app