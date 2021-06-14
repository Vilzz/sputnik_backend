import express from 'express'
import {
  getMaket,
  getMakets,
  createMaket,
  updateMaket,
  deleteMaket,
} from '../controllers/makets.js'

import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import Maket from '../models/Maket.js'
const router = express.Router()

router
  .route('/')
  .get(
    advancedRes(Maket, [
      { path: 'prices' },
      { path: 'category', select: '_id name' },
    ]),
    getMakets
  )
  .post(protect, authorise('Admin', 'Super'), createMaket)
router
  .route('/:id')
  .get(getMaket)
  .put(protect, authorise('Admin', 'Super'), updateMaket)
  .delete(protect, authorise('Admin', 'Super'), deleteMaket)

export default router
