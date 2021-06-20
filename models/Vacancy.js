import mongoose from 'mongoose'

const VacancySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Требуется указать наименование вакансии'],
    },
    description: {
      type: String,
      required: [true, 'Требуется указать описание вакансии'],
      maxLength: [250, 'Максимальное количество знаков - 250'],
    },
    salary: {
      type: String,
      required: [true, 'Требуется указать размер оплаты'],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Vacancy', VacancySchema)
