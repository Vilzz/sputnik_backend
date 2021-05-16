import mongoose from 'mongoose'

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  console.log(
    `Server connected to data base "${conn.connection.name.red}" on: ${conn.connection.host.red}`
      .yellow.bold
  )
}

export default connectDB
