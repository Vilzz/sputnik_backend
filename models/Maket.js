import mongoose from 'mongoose'

const MaketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Требуется добавить наименование макета'],
      maxlength: [100, 'Максимальная длина наименования 100 знаков'],
      trim: true,
    },
    name_en: {
      type: String,
      required: [
        true,
        'Требуется добавить наименование макета на английском языке',
      ],
      maxlength: [100, 'Максимальная длина наименования 100 знаков'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Требуется добавить описание макета'],
      maxlength: [1000, 'Максимальная длина описания 1000 знаков'],
    },
    description_en: {
      type: String,
      required: [
        true,
        'Требуется добавить описание макета на английском языке',
      ],
      maxlength: [1000, 'Максимальная длина описания 1000 знаков'],
    },
    scales: [
      {
        type: String,
        enum: ['1:250', '1:144', '1:100', '1:72', '1:50', '1:25'],
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
)
MaketSchema.statics.deletePrices = async function (id) {
  try {
    await this.model('Price').deleteMany({ maket: id })
  } catch (error) {
    console.log(error)
  }
}
MaketSchema.pre('remove', function (next) {
  this.constructor.deletePrices(this._id)
  next()
})

MaketSchema.virtual('prices', {
  ref: 'Price',
  localField: '_id',
  foreignField: 'maket',
  justOne: false,
})

export default mongoose.model('Maket', MaketSchema)
