var express = require("express")
var app = express()

var Task = require("../models/tasks")
var Project = require("../models/projects")

app.get('/', function(req, res) {
  let projectId = req.query.projectid
  if (req.signedCookies.loggedIn == "true") {
    res.render('add-task', {loggedIn:true, projectid: projectId})
  }
  else {
    res.render('error')
  }
})

app.post('/', (req, res ) => {
  let projectId = req.query.projectid
  const { taskName, length, goals } = req.body;
      Task.create( {taskName, length, goals})
      .then((newtask) => {
        Project.findOneAndUpdate({'_id': projectId}, {"$push": {"tasks": newtask._id}}, function (err, result) {
            res.redirect(`/detail-project?projectid=${projectId}`)
        })
      })
      .catch ((err) => {
        res.render("error")
      })
});


module.exports = app