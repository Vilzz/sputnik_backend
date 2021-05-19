import express from 'express'
import { protect, authorise } from '../middleware/auth.js'
import { imageUpload, getImgList } from '../controllers/images.js'

const router = express.Router()

router.route('/').post(protect, authorise('Admin', 'User'), imageUpload)
router.route('/:folder').get(protect, authorise('Admin', 'User'), getImgList)
export default router
