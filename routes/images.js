import express from 'express'
import { protect, authorise } from '../middleware/auth.js'
import { imageUpload, getImgList } from '../controllers/images.js'

const router = express.Router()

router.route('/').post(protect, authorise('Admin', 'Super'), imageUpload)
router.route('/:folder').get(protect, authorise('Admin', 'Super'), getImgList)

export default router
