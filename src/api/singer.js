import request from '@/common/js/request'

export function getSingerList() {
  const url = '/toplist/artist'
  return request.get(url)
}

export function getSingerDetail(singerId) {
  const url = `/artists?id=${singerId}`
  return request.get(url)
}
