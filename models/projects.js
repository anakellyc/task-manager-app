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

// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1;
// var yyyy = today.getFullYear();
// if(dd<10) {
//     dd = '0'+dd
// } 

// if(mm<10) {
//     mm = '0'+mm
// } 

// today = mm + '/' + dd + '/' + yyyy;

const projectSchema = new Schema({
  projectName: {type: String, required: true, set: capitalize},
  description: {type: String, required: true},
  startDate: { type: String},
  endDate: { type: String},
  status: {type: Boolean, default: false},
  tasks: [{ type: Schema.Types.ObjectId, ref: 'tasks' }],
});

const Project = mongoose.model('projects', projectSchema);
module.exports = Project;