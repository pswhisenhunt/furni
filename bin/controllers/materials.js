const materialsRouter = require('express').Router()
const Material = require('../models/material')

materialsRouter.get('/', async (request, response, next) => {
  try {
    const materials = await Material.get()
    response.json(materials)
  } catch(exception) {
    next(exception)
  }
})

materialsRouter.get('/:id', async (request, response, next) => {
  try {
    const material = await Material.find(request.params.id)
    if (material) {
      response.json(material)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

materialsRouter.post('/', async (request, response, next) => {
  try {
    const newMaterial = await Material.save(request.body)
    response.status(201).json(newMaterial)
  } catch(exception) {
    next(exception)
  }
})

materialsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedMaterial = await Material.update(request.params.id, request.body)
    if (updatedMaterial) {
      response.json(updatedMaterial)
    }
  } catch(exception) {
    next(exception)
  }
})

materialsRouter.delete('/:id', async (request, response, next) => {
  Material.delete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


module.exports = materialsRouter