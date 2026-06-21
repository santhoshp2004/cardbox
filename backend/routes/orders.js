const express = require('express');
const { getOrders, createOrder, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post(protect, authorize('SA', 'ML'), createOrder);

router.route('/:id/status')
  .put(protect, authorize('SA', 'ML', 'EL'), updateOrderStatus);

module.exports = router;
