const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierCode: { type: String, required: true, unique: true },
  merchantName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String },
  mobileNumber: { type: String, required: true },
  address: { type: String },
  materialType: { type: String },
  // Vehicle / Load Info
  vehicleType: { 
    type: String, 
    enum: ['truck', 'van', 'lorry', 'other'], 
    required: true 
  },
  vehicleNumber: { type: String, required: true },
  driverName: { type: String, required: true },
  payloadDetails: { type: String },
  
  status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
  managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
