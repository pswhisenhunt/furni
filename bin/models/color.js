const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String,
    required: true,
    unique: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productSchema',
    required: false
  }
})

const Color = mongoose.model('Color', colorSchema)

const normalizeColor = (color) => {
  return {
    id: color._id.toString(),
    name: color.name,
    value: color.value
  }
}

module.exports = {
  get: async () => {
    const colors = await Color.find({})
    return colors ? colors.map(c => normalizeColor(c)) : null
  },
  find: async (id) => {
    const color = await Color.findById(id)
    return color ? normalizeColor(color) : null
  },
  save: async (data) => {
    const color = new Color({
      name: data.name || '',
      value: data.value || ''
    })
    const newColor = await color.save()
    return newColor ? normalizeColor(newColor) : null
  },
  update: async (id, data) => {
    const newData = {
      name: data.name || '',
      value: data.value || ''
    }
    const updatedColor = await Color.findByIdAndUpdate(id, newData, { new: true, runValidators: true, context: 'query' })
    return updatedColor ? normalizeColor(updatedColor) : null
  },
  delete: async (id) => {
    return await Color.findByIdAndRemove(id)
  }
}