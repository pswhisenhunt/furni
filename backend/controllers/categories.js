const categoriesRouter = require('express').Router()
const Category = require('../models/category')

categoriesRouter.get('/', async (request, response, next) => {
  try {
    const categories = await Category.get()
    response.json(categories)
  } catch(exception) {
    next(exception)
  }
})

categoriesRouter.post('/:id/products', async (request, response, next) => {
  try {
    const productsForCategory = await Category.findProducts(request.params.id)
    response.json(productsForCategory)
  } catch (exception) {
    next(exception)
  }
})

categoriesRouter.post('/', async (request, response, next) => {
  try {
    const newCategory = await Category.save(request.body)
    response.status(201).json(newCategory)
  } catch(exception) {
    next(exception)
  }
})

categoriesRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedCategory = await Category.update(request.params.id, request.body)
    if (updatedCategory) {
      response.json(updatedCategory)
    } else {
      response.status(400).end()
    }
  } catch(exception) {
    next(exception)
  }
})

categoriesRouter.delete('/:id', async (request, response, next) => {
  Category.delete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = categoriesRouter