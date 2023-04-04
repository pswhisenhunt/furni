const productsRouter = require('express').Router()
const Product = require('../models/product')

productsRouter.get('/', (request, response) => {
  Product.find({}).then(products => {
    response.json(products)
  })
})

productsRouter.get('/:id', (request, response, next) => {
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

productsRouter.post('/', (request, response, next) => {
  const body = request.body
  
  const product = new Product({
    categories: body.categories || [],
    name: body.name || '',
    description: body.description || '',
    materials: body.materials || [],
    colors: body.colors || [],
    price: body.price || [],
  })

  product.save()
    .then(savedProduct => {
      response.json(savedProduct)
    })
    .catch(error => next(error))
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