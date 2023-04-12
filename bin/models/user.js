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
  passwordHash: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
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
    firstname: user.firstname,
    lastname: user.lastname,
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