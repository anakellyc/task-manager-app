var express = require("express")
var app = express()

var Project = require("../models/projects")
var User = require("../models/users")

app.get('/', (req, res) => {
  let projectId = req.query.projectid
  User.find({'projects.projectId':  projectId})
  .then((users) => {
    var loggedIn;
    req.signedCookies.loggedIn ? loggedIn = true : loggedIn = false;
    debugger
    Project.findOne({'_id': projectId})
    .populate('tasks')
    .exec((err, result) => {
        debugger
        if (err) res.render('error');
        res.render('detail-project', {loggedIn:loggedIn, result: result, users: users})
    })  
  })
  .catch((error) => {
    throw error;
    res.render('error');
  })
})

module.exports = app