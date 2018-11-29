var express = require("express")
var app = express()

var User = require("../models/users")
var Project = require("../models/projects")

app.post("/", function(req, res) {

  let projectId = req.query.projectid
  let newuserid = req.query.userid

  Project.findOne({_id: projectId})
  .then((project)=>{

    User.findOneAndUpdate({'_id': newuserid}, {"$push": {"projects": {projectName: project.projectName, projectId: project.id}}})
            // res.render("/detail-project", {result: result})
            .then(()=> { 
              if (req.signedCookies.loggedIn == "true") {
                res.redirect(`/detail-project?projectid=${projectId}`)
              }
              else {
                res.redirect(`/detail-project?projectid=${projectId}`)
              }
          })
          .catch(err =>{
            throw err;
          })
        })
      
  .catch ((err) => {
    res.render("error")
  })   
})

module.exports = app;
