const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response, next) => {
  try {
    const { email, password } = request.body
    const user = await User.findBy('email', email)
    console.log(user)
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
    const userForToken = {
      email: user.email,
      id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 86400 })
    response.status(200).send({ token, user })
  } catch (exception) {
    next(exception)
  }
})

module.exports = loginRouter