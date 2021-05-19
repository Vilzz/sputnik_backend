import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import fileupload from 'express-fileupload'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'

dotenv.config({
  path: './config/config.env',
})
import connectDB from './config/db.js'
connectDB()

const app = express()

import auth from './routes/auth.js'
import categories from './routes/categories.js'
import makets from './routes/makets.js'
import prices from './routes/prices.js'
import orders from './routes/orders.js'
import images from './routes/images.js'

import errorHandler from './middleware/errorHandler.js'

app.use(express.json())
app.use(cookieParser())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('short'))
}
app.use(express.static(path.join(path.resolve(path.dirname('')), 'public')))
app.use(fileupload())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
const limiter = rateLimit({
  windowMs: 10 * 60 * 100, //10 min
  max: 10,
})
app.use(limiter)
app.use(hpp())
app.use(cors())

app.use('/api/v1/auth', auth)
app.use('/api/v1/categories', categories)
app.use('/api/v1/makets', makets)
app.use('/api/v1/prices', prices)
app.use('/api/v1/orders', orders)
app.use('/api/v1/images', images)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT.red}`.blue.bold)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
