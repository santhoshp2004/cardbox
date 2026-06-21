const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  supplierCode: {
    type: String,
    required: true,
    unique: true
  },
  supplierName: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  gstNumber: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  materialType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplier', SupplierSchema);
