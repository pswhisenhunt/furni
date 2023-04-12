const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
})

const Category = mongoose.Model('Category', categorySchema)

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