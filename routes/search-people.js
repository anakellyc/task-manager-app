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

// var projectToAdd;
// //button event {
// //let userId = req.signedCookies.userId

module.exports = app