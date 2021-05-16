import mongoose from 'mongoose'

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  console.log(
    `Server connected to data base "${conn.connection.name}" on: ${conn.connection.host}`
      .yellow.bold
  )
}

export default connectDB
