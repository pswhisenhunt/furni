const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helpers = require('./user_test_helpers')
const mongoose = require('mongoose')

describe('/api/users', () => {
  const END_POINT = '/api/users'

  beforeEach(async () => {
    await User.deleteAll()

    const passwordHash = await bcrypt.hash('sekret', 10)
    await User.save({ email: 'test@test.com', passwordHash })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('SAVE', () => { 
    it('should create a new user', async () => {
      const usersAtStart = await helpers.usersInDb()
      const newUser = {
        email: 'newuser@test.com',
        firstName: 'Bobby',
        lastName: 'Test',
        password: 'test123'
      }
      await api
        .post(END_POINT)
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const usersAtEnd = await helpers.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const userNames = usersAtEnd.map(u => u.firstName)
      expect(userNames).toContain(newUser.firstName)
    })

    it('should not create a new user if an email already exists', async () => {
      const usersAtStart = await helpers.usersInDb()
      const newUser = {
        email: 'test@test.com',
        firstName: 'Tracy',
        lastName: 'Test',
        password: 'test123'
      }
      await api
        .post(END_POINT)
        .send(newUser)
        .expect(500)
    
      const usersAtEnd = await helpers.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})