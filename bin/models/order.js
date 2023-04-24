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
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'productSchema',
    required: true
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userSchema',
    required: true
  },
  shippingAddress: {
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
  },
  billingAddress: {
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
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: VALID_STATUSES,
    default: 'pending'
  },
  isPaid: {
    type: Boolean,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema)

const normalizeOrder = (order) => {
  return {
    id: order._id.toString(),
    number: order.number,
    firstName: order.firstName,
    lastName: order.lastName,
    userId: order.userId || null,
    products: order.products,
    shippingAddress: { ...order.shippingAddress },
    billingAddress: { ...order.billingAddress },
    dateCreated: order.dateCreated,
    status: order.status,
    isPaid: order.isPaid,
    amount: order.amount
  }
}

module.exports = {
  get: async () => {
    const orders = await Order.find({})
    console.log(orders)
    return orders ? orders.map(o => normalizeOrder(o)) : null
  },
  find: async (id) => {
    const order = await Order.findById(id)
    return order ? normalizeOrder(order) : null
  },
  update: async (id, data) => {
    const newData = {
      number: data.number || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      userId: data.userId || null,
      products: data.products,
      shippingAddress: {
        streetName: data.shippingAddress.streetName || '',
        streetNumber: data.shippingAddress.streetNumber || '',
        unitNumber: data.shippingAddress.unitNumber || '',
        city: data.shippingAddress.city || '',
        state: data.shippingAddress.state || '',
        zipcode: data.shippingAddress.zipcode || ''
      },
      billingAddress: {
        streetName: data.billingAddress.streetName || '',
        streetNumber: data.billingAddress.streetNumber || '',
        unitNumber: data.billingAddress.unitNumber || '',
        city: data.billingAddress.city || '',
        state: data.billingAddress.state || '',
        zipcode: data.billingAddress.zipcode || ''
      },
      dateCreated: data.dateCreated || new Date(),
      status: data.status || 'pending',
      isPaid: data.isPaid || false,
      amount: data.amount || 0
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, newData, { new: true, runValidators: true, context: 'query' })
    return updatedOrder ? normalizeOrder(updatedOrder) : null
  },
  save: async (data) => {
    const order = new Order({
      number: data.number || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      userId: data.userId || null,
      products: data.products,
      shippingAddress: {
        streetName: data.shippingAddress.streetName || '',
        streetNumber: data.shippingAddress.streetNumber || '',
        unitNumber: data.shippingAddress.unitNumber || '',
        city: data.shippingAddress.city || '',
        state: data.shippingAddress.state || '',
        zipcode: data.shippingAddress.zipcode || ''
      },
      billingAddress: {
        streetName: data.billingAddress.streetName || '',
        streetNumber: data.billingAddress.streetNumber || '',
        unitNumber: data.billingAddress.unitNumber || '',
        city: data.billingAddress.city || '',
        state: data.billingAddress.state || '',
        zipcode: data.billingAddress.zipcode || ''
      },
      dateCreated: data.dateCreated || new Date(),
      status: data.status || 'pending',
      isPaid: data.isPaid || false,
      amount: data.amount || 0
    })
    const savedOrder = await order.save()
    return savedOrder ? normalizeOrder(savedOrder) : null
  },
  delete: async (id) => {
    return Order.findByIdAndRemove(id)
  }
}