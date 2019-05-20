import request from '@/common/js/request'

// const debug = process.env.NODE_ENV !== 'production'

export function getHotKey() {
  const url = '/search/hot'
  return request.get(url)
}

export function search(key, page, perpage) {
  // const url = debug ? '/api/search' : 'http://ustbhuangyi.com/music/api/search'
  const url = `/search?keywords=${key}&offset=${page}&limit=${perpage}`
  return request.get(url)
}
