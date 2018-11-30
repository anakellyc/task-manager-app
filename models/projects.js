const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task-manager')
const Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId
var Task = require("../models/tasks")

function capitalize (val) {
  if (typeof val !== 'string') {
      val = '';
  }
  return val.charAt(0).toUpperCase() + val.substring(1);
}

const projectSchema = new Schema({
  projectName: {type: String, required: true, set: capitalize},
  description: {type: String, required: true},
  startDate: { type: Date},
  endDate: { type: Date},
  status: {type: Boolean, default: false},
  tasks: [{ type: Schema.Types.ObjectId, ref: 'tasks' }],
});

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;