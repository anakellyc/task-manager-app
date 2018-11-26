const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

function capitalize (val) {
  if (typeof val !== 'string') {
      val = '';
  }
  return val.charAt(0).toUpperCase() + val.substring(1);
}

const projectSchema = new Schema({
  name: {Type: String, required: true, set: capitalize},
  description: {Type: String, required: true},
  startDate: { Type: Date},
  endDate: { Type: Date},
  status: {Type: Boolean}
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;