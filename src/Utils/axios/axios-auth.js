import axios from 'axios'
const baseURL = process.env.REACT_APP_AUTH_BASE_URL
const instance = axios.create({
  baseURL: baseURL
})

export default instance
