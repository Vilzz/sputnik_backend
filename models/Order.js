import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'
const AutoIncrement = AutoIncrementFactory(mongoose)

const OrderSchema = new mongoose.Schema(
  {
    ordernum: {
      type: Number,
    },
    userid: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    items: [
      {
        item: {
          type: mongoose.Schema.ObjectId,
          ref: 'Maket',
        },
        qty: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
)
OrderSchema.pre('save', function (next) {
  console.log(this)
  next()
})
OrderSchema.plugin(AutoIncrement, { inc_field: 'ordernum' })
export default mongoose.model('Order', OrderSchema)
