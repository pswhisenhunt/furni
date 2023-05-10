const config = require('./utils/config')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')
const materialsRouter = require('./controllers/materials')
const colorsRouter = require('./controllers/colors')
const categoriesRouter = require('./controllers/categories')
const ordersRouter = require('./controllers/orders')

const BUILD_DIR = path.join(__dirname, 'build')
const HTML_FILE = path.join(BUILD_DIR, 'index.html')

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
app.use(express.static('build'))
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/materials', materialsRouter)
app.use('/api/colors', colorsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/orders', ordersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.get('/', (request, response) => {
  response.sendFile(HTML_FILE, function(err) {
    if (err) {
      response.status(500).send(err)
    }
  })
})

module.exports = app