const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/task-manager')
const Schema   = mongoose.Schema;

function capitalize (val) {
  if (typeof val !== 'string') {
      val = '';
  }
  return val.charAt(0).toUpperCase() + val.substring(1);
}

const taskSchema = new Schema({
  taskName: {type: String, required: true, set: capitalize},
  lenght: {type: Number},
  goals: { type: String},
  status: {type: String, default:"To do"}
});

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;