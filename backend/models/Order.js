const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: true
  },
  productType: {
    type: String,
    required: true
  },
  boxSpecifications: {
    length: Number,
    width: Number,
    height: Number,
    ply: Number, // e.g., 3-ply, 5-ply
    material: String
  },
  quantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['CREATED', 'APPROVED', 'IN_PRODUCTION', 'READY_FOR_DISPATCH', 'DISPATCHED', 'DELIVERED', 'CANCELLED'],
    default: 'CREATED'
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  assignedEmployee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    description: 'End Level User responsible for manufacturing this order'
  },
  assignedVehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    description: 'Vehicle assigned for dispatch'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
