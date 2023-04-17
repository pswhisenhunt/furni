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
  password_hash: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    trim: true
  },
  street_number: {
    type: String,
    trim: true
  },
  street_name: {
    type: String,
    trim: true
  },
  unit_number: {
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
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    street_name: user.street_name,
    street_number: user.street_number,
    unit_number: user.unit_number,
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
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      email: data.email || '',
      password_hash: data.passwordHash || '',
      street_number: data.streetNumber || '',
      street_name: data.streetName || '',
      unit_number: data.unitNumber || '',
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
      first_name: data.firstName || '',
      last_name: data.lastName || '',
      email: data.email || '',
      street_name: data.streetName || '',
      steet_number: data.streetNumber || '',
      unit_number: data.unitNumber || '',
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