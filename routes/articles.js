import express from 'express'
import {
  getArticles,
  getArticle,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articles.js'
import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import Article from '../models/Article.js'
const router = express.Router()
router
  .route('/')
  .get(advancedRes(Article), getArticles)
  .post(protect, authorise('Admin', 'Super'), createArticle)

router
  .route('/:id')
  .get(getArticle)
  .put(protect, authorise('Admin', 'Super'), updateArticle)
  .delete(protect, authorise('Admin', 'Super'), deleteArticle)

router.route('/:slug').post(getArticleBySlug)

export default router
