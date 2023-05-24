const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', async (request, response, next) => {
  try {
    const products = await Product.get()
    response.json(products)
  } catch(exception) {
    next(exception)
  }
})

productsRouter.get('/:id', async (request, response, next) => {
  try {
    const product = await Product.get(request.params.id)
    if (product) {
      response.json(product)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

productsRouter.get('/categories/:categoryId', async (request, response, next) => {
  try {
    const products = await Product.findByCategory(request.params.categoryId, Number(request.query.page))
    response.json(products)
  } catch(exception) {
    next(exception)
  }
})

productsRouter.post('/', async (request, response, next) => {
  try {
    const newProduct = await Product.save(request.body)
    response.status(201).json(newProduct)
  } catch(exception) {
    next(exception)
  }
})

productsRouter.post('/suggestions', async (request, response, next) => {
  try {
    const searchTerm = request.query.search
    const products = await Product.getSuggestedProducts(searchTerm)
    response.json(products)
  } catch(exception) {
    next(exception)
  }
})

productsRouter.post('/search', async (request, response, next) => {
  try {
    const searchTerm = request.body.searchTerm
    const limit = Math.min(request.body.limit, 50)
    const page = Math.min(0, request.body.page)
    const searchResults = await Product.search(searchTerm, limit, page)
    response.json(searchResults)
  } catch(exception) {
    next(exception)
  }
})

productsRouter.delete('/:id', (request, response, next) => {
  Product.delete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next((error)))
})

productsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedProduct = await Product.update(request.params.id, request.body)
    if (updatedProduct) {
      response.json(updatedProduct)
    } else {
      response.status(400).end()
    }
  } catch(exception) {
    next(exception)
  }
})

module.exports = productsRouter