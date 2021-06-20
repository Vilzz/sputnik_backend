import express from 'express'
import {
  createVacancy,
  deleteVacancy,
  getVacancy,
  getVacancies,
  updateVacancy,
} from '../controllers/vacancy.js'

import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import Vacancy from '../models/Vacancy.js'
const router = express.Router()

router
  .route('/')
  .post(protect, authorise('Admin', 'Super'), createVacancy)
  .get(advancedRes(Vacancy), getVacancies)
router
  .route('/:id')
  .get(getVacancy)
  .put(protect, authorise('Admin', 'Super'), updateVacancy)
  .delete(protect, authorise('Admin', 'Super'), deleteVacancy)

export default router
