import express from 'express';
import { createOrder, getOrder, updatePaymentStatus } from '../controllers/orderController.js';

const router = express.Router();

// Create new order
router.post('/create', createOrder);

// Get order by ID
router.get('/:orderId', getOrder);

// Update payment status
router.patch('/:orderId/payment', updatePaymentStatus);

export default router; 