import axios from 'axios'

export const get = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

export const post = async (url: string, data: object = {}, token?: string) => {
  try {
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const response = await axios.post(url, data, config)
      return response.data
    }
    const response = await axios.post(url, data)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}