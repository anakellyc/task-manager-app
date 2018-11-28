var express = require("express")
var app = express()

var Project = require("../models/projects")
var User = require("../models/users")

app.get('/', (req, res) => {
  let projectId = req.query.projectid
  let ownerId = req.signedCookies.userId
  let ownerName;
  User.findOne({'_id': ownerId})
  .then((owner) => {
    ownerName = owner.firstName + " " + owner.lastName
  })

  var loggedIn;
  req.signedCookies.loggedIn ? loggedIn = true : loggedIn = false;

  Project.findOne({'_id': projectId})
  .then((result) => {
    res.render('detail-project', {loggedIn:loggedIn, result: result, owner: ownerName})
  })
  .catch((error) => {
    res.render('error');
  })
})

module.exports = app