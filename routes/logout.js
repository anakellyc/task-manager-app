var express = require("express")
var app = express()

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.clearCookie('loggedIn')
    res.render('login')
  } else {
    res.redirect("login")
  }
})

module.exports = app
