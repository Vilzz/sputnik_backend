import express from 'express'
import {
  createPrice,
  deletePrice,
  getPrice,
  getPrices,
  updatePrice,
} from '../controllers/prices.js'

import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import Price from '../models/Price.js'
const router = express.Router()

router
  .route('/')
  .post(protect, authorise('Admin', 'Super'), createPrice)
  .get(advancedRes(Price, { path: 'maket', select: 'name' }), getPrices)
router
  .route('/:id')
  .get(getPrice)
  .put(protect, authorise('Admin', 'Super'), updatePrice)
  .delete(protect, authorise('Admin', 'Super'), deletePrice)

export default router
