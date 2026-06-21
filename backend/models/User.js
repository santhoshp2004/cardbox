const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Please add a name']
  },
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  mobileNumber: {
    type: String,
    required: [true, 'Please add a mobile number']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['SA', 'ML', 'EL'],
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'DISABLED'],
    default: 'ACTIVE'
  },
  lastLogin: {
    type: Date
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);
