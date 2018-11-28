var express = require("express")
var app = express()

var User = require("../models/users")

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render('search-people', {loggedIn:true})
  }
  else {
    res.render('error')
  }
})

module.exports = app