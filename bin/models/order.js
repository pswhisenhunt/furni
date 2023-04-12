const mongoose  = require('mongoose')

const VALID_STATUSES = [
  'pending',
  'processing',
  'shipped',
  'delivered'
]

const orderSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  shipping_address: {
    required: true,
    street: {
      type: String,
      trim: true,
      required: true,
    },
    number: {
      type: String,
      trim: true,
      required: false,
    },
    zipcode: { 
      type: String,
      trim: true,
      required: true,
    },
    city: { 
      type: String,
      trim: true,
      required: true,
    },
    state: { 
      type: String,
      trim: true,
      required: true,
    }
  },
  billing_address: {
    required: true,
    street: {
      type: String,
      trim: true,
      required: true,
    },
    number: {
      type: String,
      trim: true,
      required: false,
    },
    zipcode: { 
      type: String,
      trim: true,
      required: true,
    },
    city: { 
      type: String,
      trim: true,
      required: true,
    },
    state: { 
      type: String,
      trim: true,
      required: true,
    }
  },
  payment: {
    card_number: {
      type: String,
      required: true,
      min: [15, 'Must be at least 15 digits long, got {VALUE}'],
      max: 16

    },
    card_name: {
      type: String,
      required: true
    },
    card_cvc: {
      type: String,
      required: true,
      min: [3, 'Must be at least 15 digits long, got {VALUE}']
    }
  },
  date_created: {
    type: Date,
    required: true
  },
  status: {
    enum: VALID_STATUSES,
  },
  isPaid: {
    type: Boolean,
    required: true
  }
})

const Order = mongoose.Model('Order', orderSchema)

const normalizeOrder = (order) => {
  return {
    id: order._id.toString(),
    number: order.number,
    userId: order.userId || null,
    products: order.products,
    shipping_address: order.shipping_address,
    billing_address: order.billing_address,
    date_created: order.date_created,
    status: order.status,
    isPaid: order.isPaid
  }
}

module.exports = {
  find: async (id) => {
    const order = await Order.findById(id)
    return order ? normalizeOrder(order) : null
  }
}