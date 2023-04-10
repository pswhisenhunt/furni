const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helpers = require('./product_test_helpers')

const Product = require('../models/product')


describe('/api/products', () => {
  const URL = '/api/products'
  
  beforeEach(async () => {
    await Product.deleteMany({})
    await Product.insertMany(helpers.initialProducts)
  })
  
  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('GET', () => {
    it('should return the products as json', async () => {
      await api
        .get(URL)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  
    it('should return all the products', async () => {
      const response = await api.get(URL)
      expect(response.body).toHaveLength(helpers.initialProducts.length)
    })
  
    it('should return the expected data', async () => {
      const response = await api.get(URL)
      const productNames = response.body.map(p => p.name)
      helpers.initialProducts.forEach(p => {
        expect(productNames).toContain(p.name)
      })
    })

    it('should return a specific product when provided valid id', async () => {
      const productsAtStart = await helpers.productsInDb()
      const productToView = productsAtStart[0]
      const resultProduct = await api
        .get(`${URL}/${productToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      expect(resultProduct.body).toEqual(productToView)
    })

    it('should return a 404 if product does not exist', async () => {
      const validNonExistingId = await helpers.nonExistingId()
      await api
        .get(`${URL}/${validNonExistingId}`)
        .expect(404)
    })

    it('returns a 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      await api
        .get(`${URL}/${invalidId}`)
        .expect(500)
    })
  })

  describe('POST', () => {
    it('should add a valid product', async () => {
      const newProduct =  {
        categories: [],
        name: 'table',
        description: '',
        materials: [],
        color: [],
        price: 789
      }
      await api
        .post(URL)
        .send(newProduct)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const productsAtEnd = await helpers.productsInDb()
      expect(productsAtEnd).toHaveLength(helpers.initialProducts.length + 1)      
    })

    it('should not add an invalid product', async () => {
      const newProduct =  {
        categories: [],
        name: '',
        description: '',
        materials: [],
        color: [],
        price: 789
      }
    
      await api
        .post('/api/products')
        .send(newProduct)
        .expect(500)
      
      const productsAtEnd = await helpers.productsInDb()
      expect(productsAtEnd).toHaveLength(helpers.initialProducts.length)
    })
  })

  describe('DELETE', () => {
    it('should return a 204 if id is valid', async () => {
      const productsAtStart = await helpers.productsInDb()
      const productToDelete = productsAtStart[0]

      await api
        .delete(`${URL}/${productToDelete.id}`)
        .expect(204)
      
      const productsAtEnd = await helpers.productsInDb()
      expect(productsAtEnd).toHaveLength(helpers.initialProducts.length - 1)
        
      const productNames = productsAtEnd.map(p => p.name)
      expect(productNames).not.toContain(productToDelete.name)
    })
  })
})