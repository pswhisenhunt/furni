import { store } from './store'

export type Product = {
  id: string,
  name: string,
  type: string,
  description: string,
  materials: string[],
  colors: string[],
  price: number,
  images: string[]
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch