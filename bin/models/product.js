const mongoose = require('mongoose')

const VALID_TYPES = [
  'couch',
  'bed',
  'bedframe',
  'mattress',
  'table',
  'chair',
  'mirror',
  'plant',
  'pillow'
]

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: VALID_TYPES,
    required: false
  },
  materials: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }],
  colors: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }],
  price: {
    type: Number,
    required: true
  }
})

const normalizeProduct = (product) => {
  return {
    id: product._id.toString(),
    name: product.name,
    type: product.type,
    description: product.description,
    materials: product.materials,
    colors: product.colors,
    price: product.price
  }
}

const Product = mongoose.model('Product', productSchema)

module.exports = {
  get: async () => {
    const products = await Product.find({})
    return products.map(p => normalizeProduct(p))
  },

  find: async (id) => {
    const product = await Product.findById(id)
    return product ? normalizeProduct(product) : null
  },

  delete: async (id) => {
    return await Product.findByIdAndRemove(id)
  },

  deleteAll: async () => {
    return await Product.deleteMany({})
  },

  saveAll: async (products) => {
    return await Product.insertMany(products)
  },

  save: async (data) => {
    const product = new Product({
      categories: data.categories || [],
      type: data.type || '',
      name: data.name || '',
      description: data.description || '',
      materials: data.materials || [],
      colors: data.colors || [],
      price: data.price || [],
    })
    return await product.save()
  },

  update: async (id, data) => {
    const newData = {
      categories: data.categories || [],
      type: data.type || '',
      name: data.name || '',
      description: data.description || '',
      materials: data.materials || [],
      colors: data.colors || [],
      price: data.price || [],
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, newData, { new: true, runValidators: true, content: 'query'})
    return updatedProduct ? normalizeProduct(updatedProduct) : null
  }
}