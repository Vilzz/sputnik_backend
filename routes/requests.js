import express from 'express'
import {
  createRequest,
  deleteRequest,
  getRequests,
  updateRequest,
} from '../controllers/requests.js'

import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import Request from '../models/Request.js'
const router = express.Router()

router.route('/').post(createRequest).get(advancedRes(Request), getRequests)
router
  .route('/:id')
  .put(protect, authorise('Admin', 'Super'), updateRequest)
  .delete(protect, authorise('Admin', 'Super'), deleteRequest)

export default router
