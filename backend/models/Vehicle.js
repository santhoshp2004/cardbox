const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  driverName: {
    type: String,
    required: true
  },
  driverContact: {
    type: String,
    required: true
  },
  driverEmail: {
    type: String
  },
  merchantName: {
    type: String,
    required: true
  },
  payloadCapacity: {
    type: Number,
    required: true
  },
  currentStatus: {
    type: String,
    enum: ['AVAILABLE', 'ON_DELIVERY', 'MAINTENANCE'],
    default: 'AVAILABLE'
  },
  deliveryStatus: {
    type: String,
    enum: ['IDLE', 'IN_TRANSIT', 'DELIVERED'],
    default: 'IDLE'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
