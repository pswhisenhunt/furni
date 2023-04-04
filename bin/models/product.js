const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  categories: Array,
  name: {
    type: String,
    required: true
  },
  description: String,
  materials: Array,
  colors: Array,
  price: {
    type: Number,
    required: true
  }
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema)

// const normalizeDbModel = (dbModel) => {
//   return {
//     id: dbModel._id.toString(),
//     ...
//   }
// }

// module.exports = {
//   find: (id) => {
//     const data = await Product.find(id);
//     return normalizeDbModel(data);
//   }
// }