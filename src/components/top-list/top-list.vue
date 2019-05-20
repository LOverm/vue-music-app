<template>
  <transition name="slide">
    <music-list
      :rank="rank"
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
    ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '../music-list/music-list'
import { mapGetters } from 'vuex'
import { createSong } from '@/common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    title() {
      return this.topList.name
    },
    bgImage() {
      return this.topList.coverImgUrl
    },
    ...mapGetters(['topList'])
  },
  created() {
    this._getMusicList()
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      this.songs = this._processSongList(this.topList.tracks)
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
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
  transition all 0.3s ease
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
