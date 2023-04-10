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
  const product = new Product({
    categories: [],
    name: 'table',
    description: '',
    materials: [],
    color: [],
    price: 500
  })
  await product.save()
  await product.deleteOne()
  return product._id.toString()
}

const productsInDb = async () => {
  const products = await Product.find({})
  return products.map(p => p.toJSON())
}

module.exports = {
  initialProducts,
  nonExistingId,
  productsInDb
}