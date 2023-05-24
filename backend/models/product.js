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
    return products ? products.map((p) => normalizeProduct(p)) : null
  },

  findByCategory: async (categoryId, limit = 24, page) => {
    const query = { categories: { $in: [categoryId] } }
    const count = await Product.find(query).count()
    const products = await Product.find(query)
      .select('description price images')
      .populate({ path: 'categories', select: 'name'})
      .limit(limit)
      .skip(limit * page)
    
    return {
      count: count,
      products: products ? products.map((p) => normalizeProduct(p)) : null
    }
  },

  getSuggestedProducts: async (searchTerm) => {
    return await Product.find({ 'description': { $regex: searchTerm, $options: 'i' } }).distinct('description')
  },

  search: async (searchTerm, limit = 100, page = 0) => {
    const matchingProductsQuery = {'description': { $regex: searchTerm, $options: 'i' }}
    const count = await Product.find(matchingProductsQuery).count()
    const matchingProducts = await Product.find(matchingProductsQuery).select('description price type images').limit(limit).skip(limit * page)
    
    return {
      count: count,
      products: matchingProducts ? matchingProducts.map(p => normalizeProduct(p)) : null
    }
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