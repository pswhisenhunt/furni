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
  images: string[]
}

export type SearchTerm = {
  id: string,
  term: string
}

export type Category = {
  id: string,
  name: string
}

export type Status = 'pending' | 'fulfilled' | 'rejected'

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch