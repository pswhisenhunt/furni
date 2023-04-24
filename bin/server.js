#!/usr/bin/env node
const app = require('../backend/app')
const config = require('../backend/utils/config')
const logger = require('../backend/utils/logger')

app.listen(config.PORT , () => {
  logger.info(`Server running on ${config.PORT}`)
})
