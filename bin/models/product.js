const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  categories: Array,
  name: {
    type: String,
    required: true
  },
  description: String,
  materials: Array,
  colors: Array,
  price: {
    type: Number,
    required: true
  }
})

const normalizeDbModel = (dbModel) => {
  return {
    id: dbModel._id.toString(),
    name: dbModel.name,
    description: dbModel.description,
    materials: dbModel.materials,
    colors: dbModel.colors,
    price: dbModel.price
  }
}

const Product = mongoose.model('Product', productSchema)

module.exports = {
  get: async () => {
    const products = await Product.find({})
    return products.map(p => normalizeDbModel(p))
  },

  find: async (id) => {
    const product = await Product.findById(id)
    return product ? normalizeDbModel(product) : null
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
      name: data.name || '',
      description: data.description || '',
      materials: data.materials || [],
      colors: data.colors || [],
      price: data.price || [],
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, newData, { new: true, runValidators: true, content: 'query'})
    return updatedProduct ? normalizeDbModel(updatedProduct) : null
  }
}