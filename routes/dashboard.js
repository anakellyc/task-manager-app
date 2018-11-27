var express = require("express")
var app = express()

var User = require("../models/users")

app.get('/', (req, res) => {
  let userId = req.signedCookies.userId
  debugger
  User.findOne({'_id': userId})
  .then((result) => {
    console.log("one user:" , result)
    debugger
    res.render('dashboard', {result: result})
    debugger
  })
  .catch((error) => {
    res.render('error');
  })
})

module.exports = app
