var express = require("express")
var app = express()

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.clearCookie('loggedIn')
    res.clearCookie('userId')
    res.clearCookie('wrongcredentials')
    res.clearCookie('existingproject')
    res.clearCookie('existingtask')
    res.render('login', {loggedIn: false})
  } else {
    res.redirect("login")
  }
})

module.exports = app
