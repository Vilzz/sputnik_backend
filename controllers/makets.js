import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Maket from '../models/Maket.js'

//*************************************/
// @desc Получить список всех Макетов из БД
// @route GET /api/v1/makets
// @access Открытый
//*************************************/
export const getMakets = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//*************************************/
// @desc Получить Макет из БД
// @route GET /api/v1/makets/:id
// @access Открытый
//*************************************/
export const getMaket = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const maket = await Maket.findById(id)
  if (!maket) {
    return next(new ErrorResponse(`Ресурс с id -${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: maket,
  })
})

//*************************************/
// @desc Создать Макет
// @route POST /api/v1/makets
// @access Закрытый (администратор, разработчик)
//*************************************/
export const createMaket = asyncHandler(async (req, res, next) => {
  const maket = await Maket.create(req.body)
  res.status(201).json({
    success: true,
    data: maket,
  })
})

//*************************************/
// @desc Изменить данные макета
// @route PUT /api/v1/makets/:id
// @access Закрытый (администратор, разработчик)
//*************************************/
export const updateMaket = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const maket = await Maket.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!maket) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: maket,
  })
})

//*************************************/
// @desc Удалить макет из БД
// @route DELETE /api/v1/makets/:id
// @access Закрытый, (администратор, разработчик)
//*************************************/
export const deleteMaket = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const maket = await Maket.findById(id)
  if (!maket) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  maket.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
