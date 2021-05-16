import crypto from 'crypto'
import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/User.js'

//*************************************/
// @desc    Регистрация пользователя
// @route   POST /api/v1/auth/register
// @access  Публичный
//*************************************/
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body
  // Создаем пользователя
  const user = await User.create({
    name,
    email,
    password,
    role,
  })
  sendtokenResponse(user, 200, res)
})

//*************************************/
// @desc    Вход пользователя
// @route   POST /api/v1/auth/login
// @access  Публичный
//*************************************/
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(
      new ErrorResponse('Отсутствует адрес электронной почты или пароль'),
      400
    )
  }
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new ErrorResponse('Данные пользователя не верны'), 401)
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('Данные пользователя не верны'), 401)
  }
  sendtokenResponse(user, 200, res)
})

//***********************************/
// @desc Выход пользователя
// @route GET /api/v2/auth/logout
// @access Закрытый
//***********************************/
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  const { name } = req.name
  res.status(200).json({
    success: true,
    data: name,
  })
})

//********************************************/
// @desc Данные авторизованного пользователя
// @route GET /api/v2/auth/me
// @access Закрытый
//********************************************/
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({ path: 'contacts' })
  res.status(200).json({
    success: true,
    data: user,
  })
})

const sendtokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}
