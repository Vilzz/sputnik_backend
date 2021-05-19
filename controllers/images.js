import fs from 'fs'
import path from 'path'
import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import { v4 as uuidv4 } from 'uuid'

//*********************************************************/
// @desc Получить список изображений из заданного каталога
// @route GET /api/v1/images/:folder
// @access  @access Закрытый (администратор, разработчик)
//*********************************************************/
export const getImgList = asyncHandler(async (req, res, next) => {
  const { folder } = req.params
  const __dirname = path.resolve(path.dirname(''))
  await fs.readdir(
    `${__dirname}/${process.env.FILE_UPLOAD_PATH}/${folder}`,
    (err, files) => {
      if (err) {
        console.log(err)
        return next(
          new ErrorResponse(`Проблема при загрузке списка файлов`, 500)
        )
      } else {
        const filesObj = files.map((file) => {
          return {
            _id: uuidv4(),
            name: `/images/${folder}/${file}`,
          }
        })

        res.status(200).json({ success: true, data: filesObj })
      }
    }
  )
})

//*************************************/
// @desc Загрузить изображение для слайдера
// @route POST /api/v1/images
// @access Закрытый (администратор, разработчик)
//*************************************/
export const imageUpload = (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse('Добавь файл с изображением', 400))
  }
  const folder = req.body.folder || 'img'
  const file = req.files.file

  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Требуется файл изображения', 400))
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Размер файла изображения не более ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    )
  }
  //file.name = `img_${maket.slug}${path.parse(file.name).ext}`;
  const fullpath = `${process.env.FILE_UPLOAD_PATH}${folder}/${file.name}`

  if (fs.existsSync(fullpath)) {
    fs.unlink(fullpath, (err) => {
      if (err) throw err
      file.mv(fullpath, (err) => {
        if (err) {
          console.error(err)
          return next(new ErrorResponse(`Проблема при загрузке файла`, 500))
        }

        res.status(200).json({
          success: true,
          data: file.name,
        })
      })
    })
  } else {
    file.mv(fullpath, (err) => {
      if (err) {
        console.error(err)
        return next(new ErrorResponse(`Проблема при загрузке файла`, 500))
      }

      res.status(200).json({
        success: true,
        data: file.name,
      })
    })
  }
}
