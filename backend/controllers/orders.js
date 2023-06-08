const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/getTokenFrom')
const ordersRouter = require('express').Router()
const Order = require('../models/order')

ordersRouter.get('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const orders = await Order.get()
    if (orders) {
      response.json(orders)
    } else {
      response.status(404).end
    }
  } catch(exception) {
    next(exception)
  }
})

ordersRouter.get('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const order = await Order.find(request.params.id)
    if (order) {
      response.json(order)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

ordersRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const newOrder = await Order.save(request.body)
    response.status(201).json(newOrder)
  } catch(exception) {
    next(exception)
  }
})

ordersRouter.put('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const updatedOrder = await Order.update(request.params.id, request.body)
    if (updatedOrder) {
      response.json(updatedOrder)
    } else {
      response.status(400).end()
    }
  } catch(exception) {
    next(exception)
  }
})

ordersRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  Order.delete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = ordersRouter