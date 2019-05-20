<template>
  <transition name="slide">
    <music-list
      :title="title"
      :bg-image="bgImage"
      :songs="songs"
    ></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import MusicList from '../music-list/music-list'
import { createSong } from '@/common/js/song'
export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then(res => {
        if (res.data.code === ERR_OK) {
          this.songs = this._processSongList(res.data.hotSongs)
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
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
