import mongoose from 'mongoose'
import slugify from 'slugify'

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [100, 'Максимальная длина заголовка - 60 знаков'],
      required: [true, 'Требуется добавить заголовок статьи'],
    },
    title_en: {
      type: String,
      maxLength: [100, 'Максимальная длина заголовка - 60 знаков'],
      required: [true, 'Требуется добавить заголовок статьи на английском'],
    },
    text: {
      type: String,
      maxLength: [1000, 'Максимальная длина статьи - 1000 знаков'],
      required: [true, 'Требуется добавить текст статьи '],
    },
    text_en: {
      type: String,
      maxLength: [1000, 'Максимальная длина статьи - 1000 знаков'],
      required: [true, 'Требуется добавить текст на английском'],
    },
    keywords: {
      type: String,
    },
    keywords_en: {
      type: String,
    },
    image: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

ArticleSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})

export default mongoose.model('Article', ArticleSchema)
