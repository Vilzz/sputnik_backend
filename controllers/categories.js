import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Category from '../models/Category.js'

//*************************************/
// @desc Получить список всех Категорий из БД
// @route GET /api/v1/categories
// @access Открытый
//*************************************/
export const getCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//*************************************/
// @desc Получить Категорию из БД
// @route GET /api/v1/categories/:id
// @access Открытый
//*************************************/
export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const category = await Category.findById(id)
  if (!category) {
    return next(new ErrorResponse(`Ресурс с id -${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: category,
  })
})

//*************************************/
// @desc Получить Категорию из БД по псевдониму
// @route POST /api/v1/categories/:slug
// @access Открытый
//*************************************/
export const getCategoryBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params
  const category = await Category.findOne({ slug })
  if (!category) {
    return next(new ErrorResponse(`Ресурс - ${slug} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: category,
  })
})

//*************************************/
// @desc Создать Категорию
// @route POST /api/v1/categories
// @access Закрытый (администратор, разработчик)
//*************************************/
export const createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body)
  res.status(201).json({
    success: true,
    data: category,
  })
})

//*************************************/
// @desc Изменить данные категории
// @route PUT /api/v1/categories/:id
// @access Закрытый (администратор, разработчик)
//*************************************/
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!category) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: category,
  })
})

//*************************************/
// @desc Удалить категорию из БД
// @route DELETE /api/v1/categories/:id
// @access Закрытый, (администратор, разработчик)
//*************************************/
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const category = await Category.findById(id)
  if (!category) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  category.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
