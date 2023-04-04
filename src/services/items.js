import axios from 'axios'
const baseURL = 'http:/localhost:3001/api/items'

const getAll = () => {
  const req = axios.get(baseURL)
  return req.then(res => res.data)
}

export default { getAll }