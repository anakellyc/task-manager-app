var express = require("express")
var app = express()

app.get('/', function(req, res) {
  res.render('dashboard')
})

module.exports = app
