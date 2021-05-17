import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Price from '../models/Price.js'

//*************************************/
// @desc Создать Цену
// @route POST /api/v1/prices
// @access Закрытый (администратор, разработчик)
//*************************************/
export const createPrice = asyncHandler(async (req, res, next) => {
  const price = await Price.create(req.body)
  res.status(201).json({
    success: true,
    data: price,
  })
})

//*************************************/
// @desc Получить список всех цен из БД
// @route GET /api/v1/prices
// @access Открытый
//*************************************/
export const getPrices = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//*************************************/
// @desc Получить цену из БД
// @route GET /api/v1/prices/:id
// @access Открытый
//*************************************/
export const getPrice = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const price = await Price.findById(id)
  if (!price) {
    return next(new ErrorResponse(`Ресурс с id -${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: price,
  })
})

//*************************************/
// @desc Изменить данные цены
// @route PUT /api/v1/prices/:id
// @access Закрытый (администратор, разработчик)
//*************************************/
export const updatePrice = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const price = await Price.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!price) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: price,
  })
})

//*************************************/
// @desc Удалить цену из БД
// @route DELETE /api/v1/prices/:id
// @access Закрытый, (администратор, разработчик)
//*************************************/
export const deletePrice = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const price = await Price.findById(id)
  if (!price) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  price.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
