import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Article from '../models/Article.js'

//*************************************/
// @desc Получить список всех статей из БД
// @route GET /api/v1/articles
// @access Открытый
//*************************************/
export const getArticles = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//*************************************/
// @desc Получить статью из БД
// @route GET /api/v1/articles/:id
// @access Открытый
//*************************************/
export const getArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const article = await Article.findById(id)
  if (!article) {
    return next(new ErrorResponse(`Ресурс с id -${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: article,
  })
})

//*************************************/
// @desc Получить Категорию из БД по псевдониму
// @route POST /api/v1/articles/:slug
// @access Открытый
//*************************************/
export const getArticleBySlug = asyncHandler(async (req, res, next) => {
  const { slug } = req.params
  const article = await Article.findOne({ slug })
  if (!article) {
    return next(new ErrorResponse(`Ресурс - ${slug} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: article,
  })
})

//*************************************/
// @desc Создать Категорию
// @route POST /api/v1/articles
// @access Закрытый (администратор, разработчик)
//*************************************/
export const createArticle = asyncHandler(async (req, res, next) => {
  const article = await Article.create(req.body)
  res.status(201).json({
    success: true,
    data: article,
  })
})

//*************************************/
// @desc Изменить данные категории
// @route PUT /api/v1/articles/:id
// @access Закрытый (администратор, разработчик)
//*************************************/
export const updateArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const article = await Article.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!article) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: article,
  })
})

//*************************************/
// @desc Удалить категорию из БД
// @route DELETE /api/v1/articles/:id
// @access Закрытый, (администратор, разработчик)
//*************************************/
export const deleteArticle = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const article = await Article.findById(id)
  if (!article) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  article.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
