import express from 'express'
import {
  getMe,
  getUsers,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  deleteUser,
  //updatePassword,
} from '../controllers/auth.js'
import { authorise, protect, saybyebye } from '../middleware/auth.js'
import advancedRes from '../middleware/advancedRes.js'
import User from '../models/User.js'
const router = express.Router()

router.get(
  '/users',
  protect,
  authorise('Admin', 'Super'),
  advancedRes(User),
  getUsers
)
router.delete('/users/:id', protect, authorise('Admin'), deleteUser)
router.get('/me', protect, getMe)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', saybyebye, logout)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)
//router.put('/updatepassword', protect, updatePassword)
export default router
