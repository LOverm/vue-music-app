// import jsonp from '../common//js/jsonp'
import request from '@/common/js/request'

export function getBanner() {
  const url = '/banner'

  return request.get(url)
}

export function getDiscList() {
  const url = '/top/playlist/highquality'
  return request.get(url)
}

export function getSongList(id) {
  const url = `/playlist/detail?id=${id}`
  return request.get(url)
}
