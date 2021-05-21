import mongoose from 'mongoose'

const MainMenuSchema = new mongoose.Schema({
  menutitle_ru: {
    type: String,
    required: [true, 'Требуется добавить заголовок меню'],
    maxlength: [15, 'Максимальная длина ниаменования меню - 15 знаков'],
  },
  menutitle_en: {
    type: String,
    required: [true, 'Требуется добавить заголовок меню на английском'],
    maxlength: [15, 'Максимальная длина ниаменования меню - 15 знаков'],
  },
  menulink: {
    type: String,
    required: [true, 'Требуется добавить адрес страницы'],
  },
  order: {
    type: Number,
    unique: true,
  },
})

export default mongoose.model('MainMenu', MainMenuSchema)
