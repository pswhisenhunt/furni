const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const VALID_ROLES = [
  'admin',
  'customer',
  'support'
]

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: VALID_ROLES,
    default: 'customer'
  },
  orders: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orderSchema'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productSchema'
  }],
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  streetNumber: {
    type: String,
    trim: true
  },
  streetName: {
    type: String,
    trim: true
  },
  unitNumber: {
    type: String,
    trim: true
  },
  zipcode: { 
    type: String,
    trim: true
  },
  city: { 
    type: String,
    trim: true
  },
  state: { 
    type: String,
    trim: true
  }
})

userSchema.plugin(uniqueValidator)

const normalizeUser = (user) => {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    street_name: user.streetName,
    street_number: user.streetNumber,
    unit_number: user.unitNumber,
    city: user.city,
    state: user.state,
    zipcode: user.zipcode 
  }
}

const User = mongoose.model('User', userSchema)

module.exports = {
  get: async () => {
    const users = await User.find({})
    return users.map(u => normalizeUser(u))
  },
  find: async (id) => {
    const user = await User.findById(id)
    return user ? normalizeUser(user) : null
  },
  save: async (data) => {
    const user = new User({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      passwordHash: data.passwordHash || '',
      streetNumber: data.streetNumber || '',
      streetName: data.streetName || '',
      unitNumber: data.unitNumber || '',
      city: data.city || '',
      state: data.state || '',
      zipcode: data.zipcode || '',
      role: data.role || 'customer',
      orders: data.orders || [],
      favorites: data.favorites || []
    })
    const savedUser = await user.save()
    return savedUser ? normalizeUser(savedUser) : null
  },
  update: async (id,data) => {
    const newData = {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      streetName: data.streetName || '',
      steetNumber: data.streetNumber || '',
      unitNumber: data.unitNumber || '',
      city: data.city || '',
      state: data.state || '',
      zipcode: data.zipcode || '',
      role: data.role || 'customer',
      orders: data.orders || [],
      favorites: data.favorites || []
    }
    const updatedUser = await User.findByIdAndUpdate(id, newData, { new: true, content: 'query'})
    return updatedUser ? normalizeUser(updatedUser) : null
  },
  deleteAll: async () => {
    return await User.deleteMany({})
  },
  delete: async (id) => {
    return await User.findByIdAndRemove(id)
  }
}