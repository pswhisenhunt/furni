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
  street: {
    type: String,
    trim: true
  },
  number: {
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
    street: user.street,
    number: user.number,
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
      street: data.street || '',
      number: data.number || '',
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
  deleteAll: async () => {
    return await User.deleteMany({})
  }
}