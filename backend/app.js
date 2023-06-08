const config = require('./utils/config')
const express = require('express')
// const session = require('express-session')
// const redis = require('redis')
// const connectRedis = require('connect-redis')
const app = express()
const path = require('path')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// const RedisStore = connectRedis(session)

// const redisClient = redis.createClient({
//   host: 'localhost',
//   port: 6379
// })

// redisClient.on('error', (error) => {
//   console.log('Count not establish a connection with redis. ' + error)
// })

// redisClient.on('connect', (error) => {
//   console.log('Could not establish a connection with redis. ' + error)
// })

const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')
const materialsRouter = require('./controllers/materials')
const colorsRouter = require('./controllers/colors')
const categoriesRouter = require('./controllers/categories')
const ordersRouter = require('./controllers/orders')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '..', 'build')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

// app.use(session({
//   store: new RedisStore({ client: redisClient }),
//   secret: 'secret$123',
//   resave: false,
//   saveUnintialized: false,
//   cookie: {
//     secure: true,
//     httpOnly: false,
//     maxAge: 1000 * 60 * 10
//   }
// }))

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/materials', materialsRouter)
app.use('/api/colors', colorsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/orders', ordersRouter)
app.use('/login', loginRouter)

app.use('/api/*', (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
})

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.use(middleware.errorHandler)


module.exports = app