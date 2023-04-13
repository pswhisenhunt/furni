const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  product_id: {
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
  find: async (id) => {
    const category = await Category.findById(id)
    return category ? normalizeCategory(category) : null
  }
}