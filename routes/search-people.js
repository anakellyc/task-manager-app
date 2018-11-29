var express = require("express")
var app = express()

var User = require("../models/users")
var Project = require("../models/projects")

app.get('/', function(req, res) {
  let projectId = req.query.projectid
  if (req.signedCookies.loggedIn == "true") {
    res.render('search-people', {loggedIn:true, projectid: projectId})
  }
  else {
    res.render('error')
  }
})

app.post('/', function(req, res) { 
  let projectId = req.query.projectid
  let regex = new RegExp(".*"+req.body.search+".*", "i")
  User.find({$or: [{firstName: regex}, {lastName: regex}]})
  .then((result)=> { 
  
      if (req.signedCookies.loggedIn == "true") {
        res.render("search-people", {result: result, loggedIn:true, projectid: projectId})
      }
      else {
        res.render("search-people", {result: result, loggedIn:false, projectid: projectId})
      }
  })
  .catch(err =>{
    throw err;
  })
})

// app.post("/add-people", function(req, res) {
//   let projectId = req.query.projectid
//   let newuserid = req.query.userid
//   Project.find({_id: projectId})
//   .then((project)=>{
//     User.findOneAndUpdate({'_id': newuserid}, {"$push": {"projects": {projectName: project.projectName, projectId: project.id}}}, function (err, result) {
//             res.redirect("/search-people")
//         })
//       })
//   .catch ((err) => {
//     res.render("error")
//   })   
// })
// const addpeople = document.getElementById('mandioca')
// addpeople.addEventListener('click', function(e) {
//   console.log('button was clicked');
// });


// var projectToAdd;
// //button event {
// //let userId = req.signedCookies.userId

// User.findOneAndUpdate({'_id': userId}, {"$push": {"projects": {projectName: projectToAdd.projectName, projectToAdd: newproject.id}}})
//   console.log("this result is?", result)
//   .then((result) =>{
//     projectToAdd = result
//     console.log(result)
//     if (req.signedCookies.loggedIn == "true") {
//       res.render('search-project', {result: result, loggedIn:true})
//     }
//     else {
//       res.render('search-project', {result: result, loggedIn:false})
//     }
module.exports = app