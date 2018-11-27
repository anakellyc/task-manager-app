var express = require("express")
var app = express()

var Project = require("../models/projects")

app.get('/', function(req, res) {
  res.render('create-project')
})

app.get('/:id', (req, res, next) => {
  let userId = req.query.user_id;
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) { 
    return res.status(404).render('not-found');
  }
  User.findOne({'_id': userId})
    .populate('projects')
    .then(result => {
      if (!projects) {
          return res.status(404).render('not-found');
      }
      res.render("dashboard", {result})
    })
    .catch(next)
});

app.post('/', (req, res ) => {
  const { projectName, description, startDate, endDate } = req.body;
  const newProject = new Project({projectName, description, startDate, endDate})
  newProject.save()
  .then((result) => {
    res.redirect('/dashboard')
  })
  .catch((error) => {
    console.log(error)
  })
});

app.get('/:id', (req, res, next) => {
  let userId = req.query.user_id;
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) { 
    return res.status(404).render('not-found');
  }
  User.findOne({'_id': userId})
    .populate('projects')
    .then(result => {
      if (!projects) {
          return res.status(404).render('not-found');
      }
      res.render("dashboard", {result})
    })
    .catch(next)
});

module.exports = app