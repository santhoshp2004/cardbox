const express = require('express');
const { getClients, getClient, createClient, updateClient, deleteClient } = require('../controllers/clientController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getClients)
  .post(protect, authorize('SA', 'ML'), createClient);

router.route('/:id')
  .get(protect, getClient)
  .put(protect, authorize('SA', 'ML'), updateClient)
  .delete(protect, authorize('SA'), deleteClient);

module.exports = router;
