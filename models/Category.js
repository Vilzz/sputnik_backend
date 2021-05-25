import mongoose from 'mongoose'
import slugify from 'slugify'

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Требуется ввести наименование категории'],
      maxlength: [100, 'Максимальное количество знаков - 100'],
    },
    name_en: {
      type: String,
      required: [true, 'Please provide the category name'],
      maxlength: [100, 'Max length of the name - 100'],
    },
    description: {
      type: String,
      required: [true, 'Требуется ввести описание категории'],
      maxlength: [1000, 'Максимальное количество знаков описания - 1000'],
    },
    description_en: {
      type: String,
      required: [true, 'Please provide category description'],
      maxlength: [1000, 'Max length of description - 1000'],
    },
    image: {
      type: String,
      default: '/images/categories/no-image.jpg',
    },
    showinmenu: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

CategorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

CategorySchema.virtual('makets', {
  ref: 'Maket',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
})

export default mongoose.model('Category', CategorySchema)
