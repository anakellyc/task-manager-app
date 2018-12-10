var express = require("express")
var app = express()

var User = require("../models/users")
var Project = require("../models/projects")

app.post("/", function (req, res) {
  let projectSearchedId = req.query.projectid
  console.log("projectSearchedIdNew", projectSearchedId)
  let userId = req.signedCookies.userId

  Project.findOne({
      _id: projectSearchedId
    })
    .then((project) => {
    

      User.findOneAndUpdate({
          '_id': userId,
          "projects.projectId": {"$nin": [projectSearchedId]}
        }, {
          "$push": {
            "projects": {
              projectName: project.projectName,
              projectId: project.id
            }
          }
        })
        .then((result) => {
          debugger;
          console.log("result:", result)
          if(!result){
            
            res.render("search-project", {projectExists:true, result:result,loggedIn:true})
            
          }
          
          else {
            res.redirect("dashboard")
          }
        
        })
        .catch(err => {
          throw err;
        })
     
    })

})


module.exports = app;