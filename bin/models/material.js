const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productSchema',
    requried: false
  }
})

const normalizeMaterial = (material) => {
  return {
    id: material._id.toString(),
    name: material.name
  }
}

const Material = mongoose.model('Material', materialSchema)

module.exports = {
  find: async (id) => {
    const material = await Material.findById(id)
    return material ? normalizeMaterial(material) : null
  }
}