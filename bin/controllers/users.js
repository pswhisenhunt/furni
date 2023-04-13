const bcrypt = require('bcrypt')
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