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
  number: {
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
    required: false,
    ref: 'Material'
  }],
  colors: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Color'
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Category'
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
    number: product.number,
    type: product.type,
    description: product.description,
    materials: product.materials && product.materials.map((p) => {
      return { id: p._id.toString(), name: p.name }
    }),
    categories:  product.categories && product.categories.map((p) => {
      return { id: p._id.toString(), name: p.name }
    }),
    colors:  product.colors && product.colors.map((p) => {
      return { id: p._id.toString(), name: p.name, value: p.value }
    }),
    price: product.price,
    images: product.images
  }
}

const Product = mongoose.model('Product', productSchema)

module.exports = {
  get: async (id) => {
    if (id) {
      const product = await Product.findById(id)
        .populate({ path: 'colors', select: 'name value'})
        .populate({ path: 'categories', select: 'name'})
        .populate({ path: 'materials', select: 'name'})
      return product ? normalizeProduct(product) : null
    }
    const products = await Product.find()
      .populate({ path: 'colors', select: 'name value'})
      .populate({ path: 'categories', select: 'name'})
      .populate({ path: 'materials', select: 'name'})
    return products.map(p => normalizeProduct(p))
  },

  getSearchTerms: async (attribute = 'description', limit = 50) => {
    const products = await Product.find({})
      .select(attribute)
      .limit(limit)
    return products ? products.map((p) => {
      return { id: p._id.toString(), term: p[attribute] }
    }) : null
  },

  search: async (searchTerm, limit = 25, page = 0) => {
    page = Math.max(0, page)
    const matchingProducts = await Product.find({ 'description': { $regex: searchTerm, $options: 'i' } })
      .select('description price images')
      .limit(limit)
      .skip(limit * page)
    return matchingProducts ? matchingProducts.map(p => normalizeProduct(p)) : null
  },

  delete: async (id) => {
    return await Product.findByIdAndRemove(id)
  },

  deleteAll: async () => {
    return await Product.deleteMany({})
  },

  save: async (data) => {
    const product = new Product({
      categories: data.categories || [],
      type: data.type || 'other',
      number: data.number || '',
      description: data.description || '',
      materials: data.materials || [],
      colors: data.colors || [],
      price: data.price || [],
    })
    const newProduct = await product.save()
    return newProduct ? normalizeProduct(newProduct) : null
  },

  saveAll: async (products) => {
    return await Product.insertMany(products)
  },

  update: async (id, data) => {    
    const newData = {
      categories: data.categories || [],
      type: data.type || '',
      number: data.number || '',
      description: data.description || '',
      materials: data.materials || [],
      colors: data.colors || [],
      price: data.price || [],
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, newData, { new: true, runValidators: true, content: 'query' })
    return updatedProduct ? normalizeProduct(updatedProduct) : null
  }
}