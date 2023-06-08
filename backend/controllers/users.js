const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getTokenFrom = require('../utils/getTokenFrom')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.get()
    response.json(users)
  } catch(exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(request.params.id)
    response.json(user)
  } catch(exception) {
    next(exception)
  }
})

usersRouter.delete('/:id', (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  User.delete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

usersRouter.put('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const updatedUser = await User.update(request.params.id, request.body)
    if (updatedUser) {
      response.json(updatedUser)
    }
  } catch(exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { 
    email,
    firstName,
    lastName,
    password
  } = request.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = await User.save({ email, firstName, lastName, passwordHash })
    if (newUser) {
      response.status(201).json(newUser)
    } else {
      response.status(400).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter