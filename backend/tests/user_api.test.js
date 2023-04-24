const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helpers = require('./user_test_helpers')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')

describe('/api/users', () => {
  const URL = '/api/users'

  beforeEach(async () => {
    await User.deleteAll()
    
    for (let i = 0; i <= helpers.initialUsers.length-1; i++) {
      const passwordHash = await bcrypt.hash('sekret', 10)
      const userData = {passwordHash, ...helpers.initialUsers[i]}
      await User.save(userData)
    }
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('POST', () => { 
    it('should create a new user', async () => {
      const usersAtStart = await helpers.usersInDb()
      const newUser = {
        email: 'newuser@test.com',
        firstName: 'Bobby',
        lastName: 'Test',
        password: 'test123'
      }
      await api
        .post(URL)
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
        .post(URL)
        .send(newUser)
        .expect(500)
    
      const usersAtEnd = await helpers.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

  describe('GET', () => {
    it('should return all the users in the db', async () => {
      const response = await api.get(URL)
      expect(response.body).toHaveLength(helpers.initialUsers.length)
    })

    it('should return a specific user when provided a valid id', async () => {
      const usersAtStart = await helpers.usersInDb()
      const userToGet = usersAtStart[0]
      const response = await api
        .get(`${URL}/${userToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.id).toEqual(userToGet.id)
    })

    it('returns a 500 if an invalid id is provided', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api
        .get(`${URL}/${invalidId}`)
        .expect(500)
    })
  })

  describe('DELETE', () => {
    it('should return a 204 if the id is valid and the user successfully deleted', async () => {
      const usersAtStart = await helpers.usersInDb()
      const userToDelete = await usersAtStart[0]

      await api
        .delete(`${URL}/${userToDelete.id}`)
        .expect(204)
      
      const usersAtEnd = await helpers.usersInDb()
      expect(usersAtEnd).toHaveLength(helpers.initialUsers.length - 1)
        
      const userEmails = usersAtEnd.map(u => u.email)
      expect(userEmails).not.toContain(userToDelete.email)
    })
  })
})