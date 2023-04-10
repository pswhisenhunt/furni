const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', async (request, response, next) => {
  try {
    const products = await Product.find({})
    response.json(products)
  } catch(exception) {
    next(exception)
  }
})

productsRouter.get('/:id', async (request, response, next) => {
  Product.findById(request.params.id)
    .then(product => {
      if (product) {
        response.json(product)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

productsRouter.post('/', async (request, response, next) => {
  const body = request.body
  
  const product = new Product({
    categories: body.categories || [],
    name: body.name || '',
    description: body.description || '',
    materials: body.materials || [],
    colors: body.colors || [],
    price: body.price || [],
  })

  try {
    const savedProduct = await product.save()
    response.status(201).json(savedProduct)
  } catch(exception) {
    next(exception)
  }
})

productsRouter.delete('/:id', (request, response, next) => {
  Product.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next((error)))
})

productsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const product = {
    categories: body.categories || [],
    name: body.name || '',
    description: body.description || '',
    materials: body.materials || [],
    colors: body.colors || [],
    price: body.price || [],
  }

  Product.findByIdAndUpdate(request.params.id, product, { new: true, runValidators: true, context: 'query' })
    .then(updatedProduct => {
      response.json(updatedProduct)
    })
    .catch(error => next(error))
})

module.exports = productsRouter