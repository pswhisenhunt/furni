import axios from 'axios'

export const get = async (url: string) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}

export const post = async (url: string, data: object) => {
  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (exception) {
    console.error(exception)
  }
}
