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
    ref: 'Order'
  }],
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
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
    streetName: user.streetName,
    streetNumber: user.streetNumber,
    unitNumber: user.unitNumber,
    city: user.city,
    state: user.state,
    zipcode: user.zipcode,
    orders: user.orders,
    favorites: user.favorites,
    passwordHash: user.passwordHash,
    role: user.role
  }
}

const User = mongoose.model('User', userSchema)

module.exports = {
  get: async () => {
    const users = await User.find({})
    return users ? users.map(u => normalizeUser(u)) : null
  },
  findById: async (id) => {
    const user = await User.findById(id)
      .populate({ path: 'orders'})
      .populate({ path: 'favorites', select: 'name images'})
    return user ? normalizeUser(user) : null
  },
  findBy: async (attribute, value) => {
    const user = await User.findOne({ [attribute]: value })
      .populate({ path: 'orders'})
      .populate({ path: 'favorites', select: 'name images'})
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
      .populate({ path: 'orders'})
      .populate({ path: 'favorites', select: 'name images'})
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
      .populate({ path: 'orders'})
      .populate({ path: 'favorites', select: 'name images'})
    return updatedUser ? normalizeUser(updatedUser) : null
  },
  deleteAll: async () => {
    return await User.deleteMany({})
  },
  delete: async (id) => {
    return await User.findByIdAndRemove(id)
  }
}