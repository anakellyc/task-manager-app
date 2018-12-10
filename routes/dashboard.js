var express = require("express")
var app = express()

var User = require("../models/users")

app.get('/', (req, res) => {
  let userId = req.signedCookies.userId

  var loggedIn;
  req.signedCookies.loggedIn ? loggedIn = true : loggedIn = false;

  User.findOne({'_id': userId})
  .then((result) => {
    debugger
    res.render('dashboard', {loggedIn:loggedIn, result: result})
  })
  .catch((error) => {
    res.render('error');
  })
})

module.exports = app
