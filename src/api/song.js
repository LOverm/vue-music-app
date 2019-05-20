import { commonParams } from './config'
import axios from 'axios'
import request from '@/common/js/request'

// const debug = process.env.NODE_ENV !== 'production'

export function getLyric(mid) {
  // const url = debug ? '/api/lyric' : 'http://localhost:8080/music/api/lyric'
  const url = '/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios
    .get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
}

export function getSongUrl(songId) {
  const url = `/song/url?id=${songId}`
  return request.get(url)
}

export function getSongDetail(songId) {
  const url = `/song/detail?ids=${songId}`
  return request.get(url)
}
