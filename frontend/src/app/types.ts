import { store } from './store'

export type Product = {
  id: string,
  number: string,
  type: string,
  description: string,
  materials: string[],
  categories: string[],
  colors: string[],
  price: number,
  images: string[],
  averageRating: number
}

export type Material = {
  id: string,
  name: string
}

export type Color = {
  id: string,
  name: string,
  value: string
}

export type Category = {
  id: string,
  name: string
}

export type Favorite = {
  id: string,
  name: string,
  images: string[]
}


export type Order = {
  number: string,
  firstName: string,
  lastName: string,
  userId: string,
  products: Product[]
  shippingAddress: {
    streetName: string,
    streetNumber: string,
    unitNumber: string,
    city: string,
    state: string,
    zipcode: string
  },
  billingAddress: {
    streetName: string,
    streetNumber: string,
    unitNumber: string,
    city: string,
    state: string,
    zipcode: string
  },
  dateCreated: Date
  status: string
  isPaid: boolean
  amount: number
}

export type User = {
  id: string,
  token: string,
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  orders: Order[],
  favorites: Favorite[],
  streetName: string,
  unitNumber: string,
  city: string,
  state: string,
  zipcode: string
}

export type Status = 'pending' | 'fulfilled' | 'rejected'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch