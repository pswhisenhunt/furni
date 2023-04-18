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
  get: async () => {
    const materials = await Material.find({})
    return materials ? materials.map(m => normalizeMaterial(m)) : null
  },
  find: async (id) => {
    const material = await Material.findById(id)
    return material ? normalizeMaterial(material) : null
  },
  save: async (data) => {
    const material = new Material({
      name: data.name || '',
      product_id: data.productId
    })
    return await material.save()
  },
  delete: async (id) => {
    return await Material.findByIdAndRemove(id)
  },
  update: async (id, data) => {
    const newData = {
      name: data.name || ''
    }
    const updatedMaterial = await Material.findByIdAndUpdate(id, newData, { new: true, runValidators: true, content: 'query' })
    return updatedMaterial ? normalizeMaterial(updatedMaterial) : null
  }
}
