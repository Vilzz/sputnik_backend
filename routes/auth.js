import express from 'express'
import {
  getMe,
  register,
  login,
  logout,
  //forgotPassword,
  //resetPassword,
  //updatePassword,
} from '../controllers/auth.js'
import { protect, saybyebye } from '../middleware/auth.js'
const router = express.Router()

router.get('/me', protect, getMe)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', saybyebye, logout)
//router.post('/forgotpassword', forgotPassword)
//router.put('/resetpassword/:resettoken', resetPassword)
//router.put('/updatepassword', protect, updatePassword)
export default router
