import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Request from '../models/Request.js'

//*************************************/
// @desc Создать запрос на звонок
// @route POST /api/v1/requests
// @access Открытый
//*************************************/
export const createRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.create(req.body)
  res.status(201).json({
    success: true,
    data: request,
  })
})

//*************************************/
// @desc Получить список запросов из БД
// @route GET /api/v1/requests
// @access Открытый
//*************************************/
export const getRequests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//*************************************/
// @desc Изменить данные запроса
// @route PUT /api/v1/requests/:id
// @access Закрытый (администратор, разработчик)
//*************************************/
export const updateRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const request = await Request.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!request) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: request,
  })
})

//*************************************/
// @desc Удалить запрос из БД
// @route DELETE /api/v1/requests/:id
// @access Закрытый, (администратор, разработчик)
//*************************************/
export const deleteRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const request = await Request.findById(id)
  if (!request) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  request.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
