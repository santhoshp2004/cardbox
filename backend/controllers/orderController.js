const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('client', 'companyName')
      .populate('assignedEmployee', 'fullName')
      .populate('assignedVehicle', 'vehicleNumber currentStatus');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    // Emit socket event if we had req.app.get('io')
    const order = await Order.create(req.body);
    
    // Real-time Notification
    const io = req.app.get('io');
    if (io) {
      io.emit('new_order', order);
    }
    
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, {
      new: true,
      runValidators: true
    });
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Real-time Notification
    const io = req.app.get('io');
    if (io) {
      io.emit('order_status_updated', order);
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
