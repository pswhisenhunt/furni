const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true,
    min: [7, 'Colors must be in HEX Code format, i.e. #123456']
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  }
})

const Color = mongoose.Model('Color', colorSchema)

const normalizeColor = async (color) => {
  return {
    id: color._id.toString(),
    name: color.name,
    value: color.value
  }
}

module.exports = {
  find: async (id) => {
    const color = await Color.findById(id)
    return color ? normalizeColor(color) : null
  }
}