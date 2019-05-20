<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bgImage="bgImage"
      :songs="songs"
    ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '../music-list/music-list'
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { createSong } from '@/common/js/song'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  computed: {
    title() {
      return this.disc.name
    },
    bgImage() {
      return this.disc.coverImgUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    _getSongList() {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.id).then((res) => {
        if (res.data.code === ERR_OK) {
          const tracks = res.data.playlist.tracks
          this.songs = this._processSongList(tracks)
        }
      })
    },

    _processSongList(songs) {
      const ret = []
      songs.forEach(song => {
        const temp = {}
        temp.id = song.id
        temp.name = song.name
        temp.artists = song.ar
        temp.album = song.al
        temp.duration = song.dt / 1000
        temp.image = song.al.picUrl
        ret.push(createSong(temp))
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slider-enter-active, .slider-leave-active
  transition all 0.3s
.slider-enter, .slider-leave-to
  transform translate3d(100%, 0, 0)
</style>
