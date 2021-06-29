import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Требуется добавить имя'],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Необходимо добавить номер для связи'],
    match: [
      /^((\+7|7|8)+([0-9]){10})$/,
      'Номер телефона не соответствует формату 89997777777 или +79997777777 или 79995555555',
    ],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Request', RequestSchema)
