const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productSchema'
  }
})

const Category = mongoose.model('Category', categorySchema)

const normalizeCategory = (category) => {
  return {
    id: category._id.toString(),
    name: category.name
  }
}

module.exports = {
  get: async () => {
    const categories = await Category.find({})
    return categories ? categories.map(c => normalizeCategory(c)) : null
  },
  find: async (id) => {
    const category = await Category.findById(id)
    return category ? normalizeCategory(category) : null
  },
  save: async (data) => {
    const category = new Category({
      name: data.name || '',
      productId: data.productId
    })
    const newCategory = await category.save()
    return newCategory ? normalizeCategory(newCategory) : null
  },
  update: async (id, data) => {
    const newData = {
      name: data.name || '',
      productId: data.productId
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, newData, { new: true, runValidators: true, context: 'query' })
    return updatedCategory ? normalizeCategory(updatedCategory) : null
  },
  delete: async (id) => {
    return Category.findByIdAndRemove(id)
  }
}