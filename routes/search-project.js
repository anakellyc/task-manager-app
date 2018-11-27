var express = require("express")
var app = express()

app.get('/', function(req, res) {
  res.render('search-project')
})

module.exports = app