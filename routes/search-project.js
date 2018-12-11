var express = require("express");
var app = express();

const Project = require("../models/projects.js");

app.get("/", function(req, res) {
  if (req.signedCookies.loggedIn == "true") {
    res.render("search-project", { loggedIn: true });
  } else {
    res.render("search-project", { loggedIn: false });
  }
});

app.post("/", function(req, res) {
  let regex = new RegExp(".*" + req.body.search + ".*", "i");
  Project.find({ projectName: regex })
    .then(result => {
      // console.log(result)
      if (req.signedCookies.loggedIn == "true") {
        res.render("search-project", { result: result, loggedIn: true });
      } else {
        res.render("search-project", { result: result, loggedIn: false });
      }
    })
    .catch(err => {
      throw err;
    });
});

module.exports = app;
