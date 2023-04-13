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
  full_name: {
    type: String,
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productSchema',
    required: true
  }],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userSchema',
    required: true
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
  is_paid: {
    type: Boolean,
    required: true
  }
})

const Order = mongoose.Model('Order', orderSchema)

const normalizeOrder = (order) => {
  return {
    id: order._id.toString(),
    number: order.number,
    fullName: order.full_name,
    userId: order.user_d || null,
    products: order.products,
    shippingAddress: order.shipping_address,
    billingAddress: order.billing_address,
    dateCreated: order.date_created,
    status: order.status,
    isPaid: order.is_paid
  }
}

module.exports = {
  find: async (id) => {
    const order = await Order.findById(id)
    return order ? normalizeOrder(order) : null
  }
}