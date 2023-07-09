const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department_id: {
    type: String,
    required: true
  },
  sub_department_id: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Roles', RolesSchema);
