import express from 'express'
import {
  getMenus,
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from '../controllers/mainmenu.js'
import { protect, authorise } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import MainMenu from '../models/MainMenu.js'
const router = express.Router()
router
  .route('/')
  .get(getMenus)
  .post(protect, authorise('Admin', 'Super'), createMenu)

router
  .route('/:id')
  .get(getMenu)
  .put(protect, authorise('Admin', 'Super'), updateMenu)
  .delete(protect, authorise('Admin', 'Super'), deleteMenu)

export default router
