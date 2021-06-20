import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Vacancy from '../models/Vacancy.js'

//*************************************/
// @desc Создать Вакансию
// @route POST /api/v1/vacancies
// @access Закрытый (администратор, разработчик)
//*************************************/
export const createVacancy = asyncHandler(async (req, res, next) => {
  const vacancy = await Vacancy.create(req.body)
  res.status(201).json({
    success: true,
    data: vacancy,
  })
})

//*************************************/
// @desc Получить список всех вакансий из БД
// @route GET /api/v1/vacancies
// @access Открытый
//*************************************/
export const getVacancies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})

//*************************************/
// @desc Получить вакансию из БД
// @route GET /api/v1/vacancies/:id
// @access Открытый
//*************************************/
export const getVacancy = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const vacancy = await Vacancy.findById(id)
  if (!vacancy) {
    return next(new ErrorResponse(`Ресурс с id -${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: vacancy,
  })
})

//*************************************/
// @desc Изменить данные вакансии
// @route PUT /api/v1/vacancies/:id
// @access Закрытый (администратор, разработчик)
//*************************************/
export const updateVacancy = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const vacancy = await Vacancy.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!vacancy) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  res.status(200).json({
    success: true,
    data: vacancy,
  })
})

//*************************************/
// @desc Удалить Вакансию из БД
// @route DELETE /api/v1/vacancies/:id
// @access Закрытый, (администратор, разработчик)
//*************************************/
export const deleteVacancy = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const vacancy = await Vacancy.findById(id)
  if (!vacancy) {
    return next(new ErrorResponse(`Ресурс с id - ${id} не найден`, 404))
  }
  vacancy.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
