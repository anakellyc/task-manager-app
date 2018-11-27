var express = require("express")
var app = express()

var Task = require("../models/tasks")
var Project = require("../models/projects")

app.get('/', function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render('add-task', {loggedIn:true})
  }
  else {
    res.render('error')
  }
})

app.post('/', (req, res ) => {
  const { taskName, length, goals } = req.body;
  Task.create( {taskName, length, goals})
  .then((newtask) => {
    console.log(newtask.taskName)
    res.render("create-project", {loggedIn: true, newtask: newtask})
  })
});

// app.post('/', (req, res ) => {
//   let projecId = req.signedCookies.userId
//   const { taskName, length, goals } = req.body;
//   Project.find({taskName: req.body.taskName})
//   .then((task)=>{
//     if (task.length == 0) {
//       Task.create( {taskName, length, goals})
//       .then((newtask) => {
//         User.findOneAndUpdate({'_id': userId}, {"$push": {"tasks": {taskName: newtask.taskName, taskId: newtask.id}}}, function (err, result) {
//           console.log("this result is?", result)
//             res.redirect("/create-project")
//         })
//       })
//       .catch ((err) => {
//         res.render("error")
//       })
//     }
//     else {
//       res.cookie("existingtask", "true", {signed: true})
//       res.render('add-task', {loggedIn: true, existingtask:true})
//     }  
//   })
//   .catch ((err) => {
//     res.render("error")
//   })  
// });

module.exports = app