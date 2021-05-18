import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Order from '../models/Order.js'
//*************************************/
// @desc Создать Заказ
// @route POST /api/v1/orders
// @access Закрытый (администратор, пользователь)
//*************************************/
export const createOrder = asyncHandler(async (req, res, next) => {
  const { _id } = req.user
  if (!_id) {
    return next(new ErrorResponse(`Отсутствует информация о пользователе`, 500))
  }
  const order = await Order.create({ ...req.body, userid: _id })
  res.status(201).json({
    success: true,
    data: order,
  })
})

//*************************************/
// @desc Получить список всех заказов из БД
// @route GET /api/v1/orders
// @access Открытый
//*************************************/
export const getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//*************************************/
// @desc Удалить заказ из БД
// @route DELETE /api/v1/orders
// @access Закрытый (администратор, пользователь)
//*************************************/

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { _id, role } = req.user
  const order = await Order.findById(id)
  if (!order) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  if (order.userid !== _id && role !== 'Admin') {
    return next(
      new ErrorResponse('Не достаточно прав для удаления данного ресурса', 403)
    )
  }
  await order.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})

//*************************************/
// @desc Получить Заказ из БД
// @route GET /api/v1/orders/:id
// @access Открытый
//*************************************/
export const getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const order = await Order.findById(id)
  if (!order) {
    return next(new ErrorResponse(`Ресурс с id -${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: order,
  })
})

//*************************************/
// @desc Изменить данные макета
// @route PUT /api/v1/orders/:id
// @access Закрытый (администратор, пользователь)
//*************************************/
export const updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const { _id, role } = req.user
  const order = await Order.findById(id)
  if (!order) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  if (order.userid !== _id && role !== 'Admin') {
    return next(
      new ErrorResponse('Не достаточно прав для изменения данного ресурса', 403)
    )
  }
  const updated = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    success: true,
    data: updated,
  })
})
