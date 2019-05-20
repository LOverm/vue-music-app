import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.jinminrui.cn:3001', // api 的 base_url
  timeout: 5000 // request timeout
})

export default service
