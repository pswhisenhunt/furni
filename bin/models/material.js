const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    requried: false
  }
})

const normalizeMaterial = (material) => {
  return {
    id: material._id.toString(),
    name: material.name
  }
}

const Material = mongoose.Model('Material', materialSchema)

module.exports = {
  find: async (id) => {
    const material = await Material.findById(id)
    return material ? normalizeMaterial(material) : null
  }
}