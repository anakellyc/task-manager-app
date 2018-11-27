var express = require("express")
var app = express()

var Project = require("../models/projects")

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render('create-project', {loggedIn:true})
  }
  else {
    res.render('create-project', {loggedIn:false})
  }
})

app.get('/', (req, res, next) => {
  let userId = req.query.user_id;
  // if (!/^[0-9a-fA-F]{24}$/.test(userId)) { 
  //   return res.status(404).render('not-found');
  // }
  User.findOne({'_id': userId})
    .populate('projects')
    .then(result => {
      // if (!projects) {
      //     return res.status(404).render('not-found');
      // }
      res.render("dashboard", {result})
    })
    .catch(next)
});

app.post('/', (req, res ) => {
  const { projectName, description, startDate, endDate } = req.body;
  const newProject = new Project({projectName, description, startDate, endDate})
  newProject.save()
  .then((result) => {
    res.render('dashboard')
  })
  .catch((error) => {
    console.log(error)
  })
});

module.exports = app