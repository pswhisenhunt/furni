const colorsRouter = require('express').Router()
const Color = require('../models/color')

colorsRouter.get('/', async (request, response, next) => {
  try {
    const colors = await Color.get()
    response.json(colors)
  } catch(exception) {
    next(exception)
  }
})

colorsRouter.get('/:id', async (request, response, next) => {
  try {
    const color  = await Color.find(request.params.id) 
    if (color) {
      response.json(color)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

colorsRouter.post('/', async (request, response, next) => {
  try {
    const newColor = await Color.save(request.body)
    response.status(201).json(newColor)
  } catch(exception) {
    next(exception)
  }
})

colorsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedColor = await Color.update(request.params.id, request.body)
    if (updatedColor) {
      response.json(updatedColor)
    } else {
      response.status(400).end()
    }
  } catch(exception) {
    next(exception)
  }
})

colorsRouter.delete('/:id', async (request, response, next) => {
  Color.delete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


module.exports = colorsRouter