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
      debugger
      console.log("promise-project111111", project)
      console.log("promise-project222", project._id)

      if (projectSearchedId != project._id) {
        debugger
        User.findOneAndUpdate({
            '_id': userid
          }, {
            "$push": {
              "projects": {
                projectName: project.projectName,
                projectId: project.id
              }
            }
          })
          .then((result) => {
            if (req.signedCookies.loggedIn == "true") {
              res.redirect("dashboard")
            } else {
              res.redirect("dashboard")
            }
          })
          .catch(err => {
            throw err;
          })
      } else if (projectSearchedId === project._id) {
        debugger
        res.render("search-project", {
          projectExists: true
        })
      }
    })

})

// app.post("/", function (req, res) {
//   let projectSearchedId = req.query.projectid
//   console.log("projectSearchedIdNew", projectSearchedId)
//   let userId = req.signedCookies.userId

//   Project.findOne({
//       _id: projectSearchedId
//     })
//     .then((project) => {
//       debugger
//       console.log("promise-project111111", project)
//       console.log("promise-project222", project._id)

//       if (projectSearchedId != project._id) {
//         debugger
//         User.findOneAndUpdate({
//             '_id': userid
//           }, {
//             "$push": {
//               "projects": {
//                 projectName: project.projectName,
//                 projectId: project.id
//               }
//             }
//           })
//           .then((result) => {
//             if (req.signedCookies.loggedIn == "true") {
//               res.redirect("dashboard")
//             } else {
//               res.redirect("dashboard")
//             }
//           })
//           .catch(err => {
//             throw err;
//           })
//       } else if (projectSearchedId === project._id) {
//         debugger
//         res.render("search-project", {
//           projectExists: true
//         })
//       }
//     })

// })

// if(projectSearchedId === project._id){
// res.render("search-project", {projectExists: true})
// }
// else if (projectSearchedId != project._id) {
//   User.findOneAndUpdate({'_id': userid}, {"$push": {"projects": {projectName: project.projectName, projectId: project.id}}})
//     .then((result)=> { 
//       if (req.signedCookies.loggedIn == "true") {
//         res.redirect("dashboard")
//       }
//       else {
//         res.redirect("dashboard")
//       }
//     })
//     .catch(err => {
//       throw err;
//     })
// }




// app.post("/", function(req, res) {

//   let projectSearchedId = req.query.projectid
//   let userid = req.signedCookies.userId

//   console.log("projectId", projectSearchedId)

//   Project.findOne({_id: projectSearchedId})
//   .then((project)=>{


//       User.findOneAndUpdate({'_id': userid}, {"$push": {"projects": {projectName: project.projectName, projectId: project.id}}})
//         .then((result)=> { 
//           if (req.signedCookies.loggedIn == "true") {
//             res.redirect("dashboard")
//           }
//           else {
//             res.redirect("dashboard")
//           }
//         })
//         .catch(err => {
//           throw err;
//         })

//   })
//   .catch ((err) => {
//     res.render("error")
//   })   
// })

module.exports = app;