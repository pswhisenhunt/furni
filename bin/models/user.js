const mongoose = require('mongoose')

const VALID_ROLES = [
  'admin',
  'customer',
  'support'
]

const userSchema = new mongoose.Schema({
  role: {
    required: true,
    enum: VALID_ROLES,
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
    unique: true,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    trim: true,
    required: false
  },
  last_name: {
    type: String,
    trim: true,
    required: false
  },
  address: {
    required: false,
    street: {
      type: String,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    zipcode: { 
      type: String,
      trim: true,
    },
    city: { 
      type: String,
      trim: true,
    },
    state: { 
      type: String,
      trim: true,
    }
  }
})

const normalizeUser = (user) => {
  return {
    id: user._id.toString(),
    firstName: user.first_name,
    lastName: user.last_name,
    address: {
      street: user.address ? user.address.street : null,
      number: user.address ? user.address.number : null,
      city: user.address ? user.address.city : null,
      state: user.address ? user.address.state : null,
      zipcode: user.address ? user.address.zipcode : null ,
    }
  }
}

const User = mongoose.Model('User', userSchema)

module.exports = {
  get: async (id) => {
    const user = await User.findById(id)
    return user ? normalizeUser(user) : null
  }
}