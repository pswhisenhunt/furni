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
  'pillow',
  'other'
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
    default: 'other'
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
  },
  images: [{
    type: String
  }]
})

const normalizeProduct = (product) => {
  return {
    id: product._id.toString(),
    name: product.name,
    type: product.type,
    description: product.description,
    materials: product.materials,
    colors: product.colors,
    price: product.price,
    images: product.images
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
      type: data.type || 'other',
      name: data.name || '',
      description: data.description || '',
      materials: data.materials || [],
      colors: data.colors || [],
      price: data.price || [],
    })
    const newProduct = await product.save()
    return newProduct ? normalizeProduct(newProduct) : null
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
    const updatedProduct = await Product.findByIdAndUpdate(id, newData, { new: true, runValidators: true, content: 'query' })
    return updatedProduct ? normalizeProduct(updatedProduct) : null
  }
}