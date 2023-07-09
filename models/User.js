const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  /// 1 for god; 2 for admin in company; 
  /// 3 for manage in company; 
  /// 4 for shift-manager/category-manager;
  /// 5 for employee
  permission: {
    type: String,
    required: true
  },
  profile_image: {
    link: String,
  },
  phone_number: {
    type: String,
    required: true,
  },
  sessionKey: {
    type: String,
    required: false
  },
  sessionAddedAt: {
    type: Date,
    required: false,
  },
  id_number: {
    type: String,
  },
  roles: {
    type: [String],
  }
});

module.exports = mongoose.model('User', UserSchema);
