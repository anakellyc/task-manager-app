var express = require("express")
var app = express()

const Project = require("../models/projects.js")

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render('search-project', {loggedIn:true})
  }
  else {
    res.render('search-project', {loggedIn:false})
  }
})


app.post('/', function(req, res) {
   
  Project.find( { projectName: { $regex: req.body.search, $options:'i'}})
  .then((result) =>{
    
      // console.log(result)
      if (req.signedCookies.loggedIn == "true") {
        res.render('search-project', {result: result, loggedIn:true})
      }
      else {
        res.render('search-project', {result: result, loggedIn:false})
      }
      
  })
  .catch(err =>{
    throw err;
  })
})


// ///////////////////////////
// var projectToAdd;
// //button event {
// let userId = req.signedCookies.userId

// User.findOneAndUpdate({'_id': userId}, {"$push": {"projects": {projectName: projectToAdd.projectName, projectToAdd: newproject.id}}})
//   // console.log("this result is?", result)
//   .then((result) =>{
//     // projectToAdd = result
//     // console.log(result)

//     if (req.signedCookies.loggedIn == "true") {
//       res.render("dashboard", {result: result, loggedIn:true})
//     }
//     else {
//       res.render("search-project", {result: result, loggedIn:false})
//     }
    
// })

// //}
/////////////////////////////
module.exports = app


