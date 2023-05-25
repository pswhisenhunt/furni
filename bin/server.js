#!/usr/bin/env node
const app = require('../backend/app')
const config = require('../backend/utils/config')
const logger = require('../backend/utils/logger')

const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackComplier = webpack(webpackConfig)
const wpmw = webpackMiddleware(webpackComplier)

app.use(wpmw)

app.listen(config.PORT , () => {
  logger.info(`Server running on ${config.PORT}`)
})
