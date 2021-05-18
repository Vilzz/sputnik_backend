import express from 'express'
import {
  createOrder,
  getOrders,
  deleteOrder,
  getOrder,
  updateOrder,
} from '../controllers/orders.js'
import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import Order from '../models/Order.js'
const router = express.Router()

router
  .route('/')
  .get(advancedRes(Order), getOrders)
  .post(protect, authorise('User', 'Admin'), createOrder)
router
  .route('/:id')
  .get(getOrder)
  .delete(protect, authorise('User', 'Admin'), deleteOrder)
  .put(protect, authorise('Admin', 'User'), updateOrder)
export default router
