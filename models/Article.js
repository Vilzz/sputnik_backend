import mongoose from 'mongoose'
import slugify from 'slugify'

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [100, 'Максимальная длина заголовка - 60 знаков'],
    },
    text: {
      type: String,
      maxLength: [1000, 'Максимальная длина статьи - 1000 знаков'],
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
