const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/task-manager");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Project = require("../models/projects");

function capitalize(val) {
  if (typeof val !== "string") {
    val = "";
  }
  return val.charAt(0).toUpperCase() + val.substring(1);
}

const userSchema = new Schema({
  firstName: { type: String, required: true, set: capitalize },
  lastName: { type: String, required: true, set: capitalize },
  email: { type: String },
  password: { type: String, minlength: 8 },
  avatarUrl: {
    type: String,
    required: false,
    default: "img/default-avatar.png"
  },
  // projects: [ { type : ObjectId, ref: "projects" } ],
  projects: { type: Array }
});

const User = mongoose.model("users", userSchema);
module.exports = User;
