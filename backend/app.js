const config = require('./utils/config')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
var compiler = webpack(webpackConfig)

const productsRouter = require('./controllers/products')
const usersRouter = require('./controllers/users')
const materialsRouter = require('./controllers/materials')
const colorsRouter = require('./controllers/colors')
const categoriesRouter = require('./controllers/categories')
const ordersRouter = require('./controllers/orders')

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

app.use('/api/products', productsRouter)
app.use('/api/users', usersRouter)
app.use('/api/materials', materialsRouter)
app.use('/api/colors', colorsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/orders', ordersRouter)

app.use(webpackDevMiddleware(compiler))

app.use(webpackHotMiddleware(compiler, {
  reload: true,
  quite: true,
  path: '/__webpack_hmr'
}))

app.use('/api/*', (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
})

app.get('*', (request, response) => {
  response.setHeader('Content-Type', 'application/json')  
  response.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.use(middleware.errorHandler)


module.exports = app