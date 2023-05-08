import axios from 'axios'
const baseURL = 'http://localhost:3001/api/products'

export const getAll = async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data
  } catch(exception) {
    console.error(exception)
  }
}