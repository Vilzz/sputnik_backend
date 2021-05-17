import mongoose from 'mongoose'

const PriceSchema = new mongoose.Schema(
  {
    maket: {
      type: mongoose.Schema.ObjectId,
      ref: 'Maket',
      required: [true, 'Требуется указать ID макета'],
    },
    scale: {
      type: String,
      required: [true, 'Требуется указать масштаб изделия'],
      enum: ['1:250', '1:144', '1:100', '1:72', '1:50', '1:25'],
    },
    prices: {
      rub: {
        price: String,
        currency: {
          type: String,
          default: 'Руб',
        },
        symb: {
          type: String,
          default: '₽',
        },
      },
      usd: {
        price: String,
        currency: {
          type: String,
          default: 'USD',
        },
        symb: {
          type: String,
          default: '$',
        },
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
)

export default mongoose.model('Price', PriceSchema)
