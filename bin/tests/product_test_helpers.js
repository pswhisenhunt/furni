const Product = require('../models/product')

const initialProducts = [
  {
    categories: [],
    name: 'bed',
    description: '',
    materials: [],
    color: [],
    price: 450
  },
  {
    categories: [],
    name: 'couch',
    description: '',
    materials: [],
    color: [],
    price: 275
  }
]

const nonExistingId = async () => {
  const data = {
    categories: [],
    name: 'table',
    description: '',
    materials: [],
    color: [],
    price: 500
  }
  const product = await Product.save(data)
  Product.delete(product.id)
  return product.id
}

const productsInDb = async () => {
  return await Product.get()
}

module.exports = {
  initialProducts,
  nonExistingId,
  productsInDb
}