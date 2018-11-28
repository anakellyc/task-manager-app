var Project = require("../models/projects")
var User = require("../models/users")
var express = require("express")
var app = express()

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render('create-project', {loggedIn:true})
  }
  else {
    res.redirect('/error')
  }
})

app.post('/', (req, res ) => {
  let userId = req.signedCookies.userId
  const { projectName, description, startDate, endDate } = req.body;
  Project.find({projectName: req.body.projectName})
  .then((project)=>{
    if (project.length == 0) {
      Project.create( {projectName, description, startDate, endDate})
      .then((newproject) => {
        User.findOneAndUpdate({'_id': userId}, {"$push": {"projects": {projectName: newproject.projectName, projectId: newproject.id}}}, function (err, result) {
          console.log("this result is?", result)
            res.redirect("/dashboard")

        })
      })
      .catch ((err) => {
        res.render("error")
      })
    }
    else {
      res.cookie("existingproject", "true", {signed: true})
      res.render('create-project', {loggedIn: true, existingproject:true})
    }  
  })
  .catch ((err) => {
    res.render("error")
  })  
});


module.exports = app