import { getLyric, getSongUrl } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
// import { rejects } from 'assert'

export default class Song {
  constructor({ id, artists, name, album, duration, image, url }) {
    this.id = id
    this.artists = artists
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong(item) {
  return new Song({
    id: item.id,
    artists: getArtists(item.artists),
    name: item.name,
    album: item.album,
    duration: item.duration,
    image: item.image
  })
}

export function getArtists(arr) {
  const artists = []
  arr.forEach(item => {
    artists.push(item.name)
  })
  return artists.join('/')
}

export function filterSinger(singer) {
  const ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function isValidMusic(item) {
  return (
    item.songid && item.albummid && (!item.pay || item.pay.payalbumprice === 0)
  )
}

export function processSongsUrl(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  songs.forEach(item => {
    getSongUrl(item.id).then(res => {
      item.url = res.data.data[0].url
    })
  })
  return songs
}
