var express = require("express")
var app = express()


app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render('search-project', {loggedIn:true})
  }
  else {
    res.render('search-project', {loggedIn:false})
  }
})

module.exports = app