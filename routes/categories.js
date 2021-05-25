import express from 'express'
import {
  getCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js'
import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import Category from '../models/Category.js'
const router = express.Router()
router
  .route('/')
  .get(advancedRes(Category, { path: 'makets' }), getCategories)
  .post(protect, authorise('Admin', 'Super'), createCategory)

router
  .route('/:id')
  .get(getCategory)
  .put(protect, authorise('Admin', 'Super'), updateCategory)
  .delete(protect, authorise('Admin', 'Super'), deleteCategory)

router.route('/:slug').post(getCategoryBySlug)

export default router
