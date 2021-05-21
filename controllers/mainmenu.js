import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import MainMenu from '../models/MainMenu.js'

//*************************************/
// @desc Получить пунктов меню
// @route GET /api/v1/mainmenu
// @access Открытый
//*************************************/
export const getMenus = asyncHandler(async (req, res, next) => {
  const menu = await MainMenu.find()
  res.status(200).json({ success: true, data: menu })
})

//*************************************/
// @desc Получить пункт меню из БД
// @route GET /api/v1/mainmenu/:id
// @access Открытый
//*************************************/
export const getMenu = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const menu = await MainMenu.findById(id)
  if (!menu) {
    return next(new ErrorResponse(`Ресурс с id -${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: menu,
  })
})

//*************************************/
// @desc Создать пункт
// @route POST /api/v1/mainmenu
// @access Закрытый (администратор, разработчик)
//*************************************/
export const createMenu = asyncHandler(async (req, res, next) => {
  const menu = await MainMenu.create(req.body)
  res.status(201).json({
    success: true,
    data: menu,
  })
})

//*************************************/
// @desc Изменить пункт меню
// @route PUT /api/v1/mainmenu/:id
// @access Закрытый (администратор, разработчик)
//*************************************/
export const updateMenu = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const menu = await MainMenu.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!menu) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: menu,
  })
})

//*************************************/
// @desc Удалить пункт меню
// @route DELETE /api/v1/mainmenu/:id
// @access Закрытый, (администратор, разработчик)
//*************************************/
export const deleteMenu = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const menu = await MainMenu.findById(id)
  if (!menu) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  menu.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
