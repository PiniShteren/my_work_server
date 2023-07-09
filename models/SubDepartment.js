const mongoose = require('mongoose');

const SubDepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  department_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('SubDepartment', SubDepartmentSchema);
