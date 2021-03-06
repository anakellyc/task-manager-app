//Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost/task-manager",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Express View engine setup
const express = require("express");
const app = express();

//HBS
const hbs = require("hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static("public"));

// Middleware Setup - BodyParser and CookieParser
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var config = require("./config");
app.use(cookieParser(config.cookieParserSecret));

// default value for title local
app.locals.title = "Task Manager App";

//Routes
const index = require("./routes/index");
app.use("/", index);

app.use("/index", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/logout", require("./routes/logout"));
app.use("/search-project", require("./routes/search-project"));
app.use("/create-project", require("./routes/create-project"));
app.use("/add-task", require("./routes/add-task"));
app.use("/search-people", require("./routes/search-people"));
app.use("/detail-project", require("./routes/detail-project"));
app.use("/add-people", require("./routes/add-people"));
app.use("/view-project", require("./routes/view-project"));
app.use("/add-project", require("./routes/add-project"));

app.get("/layout", function(req, res) {
  res.render("layout");
});

module.exports = app;

app.listen(3000);
