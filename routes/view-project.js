var express = require("express")
var app = express()

var Project = require("../models/projects")

app.get('/', (req, res) => {
  var loggedIn;
  req.signedCookies.loggedIn ? loggedIn = true : loggedIn = false;
  let projectId = req.query.projectid
  Project.findOne({"_id" : projectId})
  .then((result) => {
  res.render("view-project", {loggedIn:loggedIn, result: result})
  })
  .catch((err) => {
    res.render("error")
  })
})

module.exports = app;
