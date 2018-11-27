var express = require("express")
var app = express()

var User = require("../models/users")

app.get('/', (req, res) => {
  User.findOne({'_id': req.query.user_id})
  .then((result) => {
    res.render('dashboard', {result})
  })
  .catch((error) => {
    res.render('error');
  })
})

module.exports = app
