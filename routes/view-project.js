var express = require("express")
var app = express()

var Project = require("../models/projects")
var Task = require("../models/tasks")
var User = require("../models/users")

app.get('/', (req, res) => {
  
  var loggedIn;
  req.signedCookies.loggedIn ? loggedIn = true : loggedIn = false;
  let projectId = req.query.projectid
  
  Project.findOne({"_id" : projectId})
  .populate({
    path: 'tasks',
    populate: { path: 'owner' }
  })
  .exec((err, result) => {
    if (err) res.render("error")
    res.render("view-project", {loggedIn:loggedIn, result: result})
  })
})

app.post('/', (req, res) => {
  var loggedIn;
  req.signedCookies.loggedIn ? loggedIn = true : loggedIn = false;
  let userId = req.signedCookies.userId
  let selectedtask = req.body.selectedtask;

  if(selectedtask) {
  if(typeof req.body.selectedtask === "string"){
    selectedtask = [req.body.selectedtask]
  }

  User.findOne({"_id" : userId})
  .then((owner) => {

    selectedtask.forEach(element => {
        Task.findOneAndUpdate({'_id': element}, {"$set": {owner: owner._id}})
        .populate('owner')
        .exec((err, ownerupdate) => {
      })
    })
   }).then(()=>{
    res.redirect("/dashboard")
  })
}
else {
  res.redirect("/dashboard")
}
})

module.exports = app;
