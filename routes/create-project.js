var Project = require("../models/projects")
var User = require("../models/users")
var express = require("express")
var app = express()

app.get('/', function(req, res) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
          dd='0'+dd
      } 
      if(mm<10){
          mm='0'+mm
      } 
  today = yyyy+'-'+mm+'-'+dd;

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
        User.findOneAndUpdate({'_id': userId}, {"$push": {"projects": {projectName: newproject.projectName, projectId: newproject.id}}})
  
          .then((result) => {
            res.redirect("/dashboard")
          })
          .catch ((err) => {
            res.render("error")
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