var Project = require("../models/projects")
var User = require("../models/users")
var express = require("express")
var app = express()

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render('create-project', {loggedIn:true})
  }
  else {
    res.render('create-project', {loggedIn:false}) //you can only create a project if you are logged in, right?
  }
})

app.post('/', (req, res ) => {
  let userId = req.signedCookies.userId
  const { projectName, description, startDate, endDate } = req.body;
  Project.create( {projectName, description, startDate, endDate})
  .then((newproject) => {
    User.findOneAndUpdate({'_id': userId}, {"$push": {"projects": newproject.id}}, function (err, result) {
      console.log(result)
      // res.redirect("/dashboard")
      setTimeout (function () {
        res.render("dashboard", {loggedIn: true, result: result})
      }, 1000)
    })
  })
  .catch ((err) => {
    //debugger
    res.send(err)
  })
});

module.exports = app