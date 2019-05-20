<template>
  <scroll
    class="suggest"
    :data="result"
    :pullup="pullup"
    @scrollToEnd="searchMore"
    ref="suggest"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
  >
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item, index) in result"
        :key="index"
        @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p
            class="text"
            v-html="getDisplayName(item)"
          ></p>
        </div>
      </li>
      <loading
        v-show="hasMore"
        title=""
      ></loading>
    </ul>
    <div class="no-result-wrapper">
      <no-result
        v-show="!hasMore && !result.length"
        title="抱歉，暂无搜索结果"
      ></no-result>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { mapMutations, mapActions } from 'vuex'
import { getSongUrl, getSongDetail } from 'api/song'
import { createSong } from '@/common/js/song'

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 0,
      perpage: 30,
      pullup: true,
      beforeScroll: true,
      hasMore: true,
      result: []
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    search() {
      this.page = 0
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.perpage).then(res => {
        if (res.data.code === ERR_OK) {
          if (!res.data.result.songs) {
            this.hasMore = false
            return
          }
          this.result = res.data.result.songs
          this._checkMore(res.data.result)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.perpage).then((res) => {
        if (res.data.code === ERR_OK) {
          this.result = this.result.concat(res.data.result.songs)
        }
      })
    },
    selectItem(item) {
      const temp = {}
      getSongDetail(item.id).then(res => {
        if (res.data.code === ERR_OK) {
          const song = res.data.songs[0]
          temp.id = song.id
          temp.name = song.name
          temp.artists = song.ar
          temp.album = song.al
          temp.duration = song.dt / 1000
          temp.image = song.al.picUrl
          return createSong(temp)
        }
      }).then(song => {
        getSongUrl(song.id).then(res => {
          if (res.data.code === ERR_OK) {
            song.url = res.data.data[0].url
            this.insertSong(song)
            this.$emit('select', song)
          }
        })
      })
    },
    getDisplayName(item) {
      return item.name + this._getArtists(item.artists)
    },
    getIconCls(item) {
      return 'icon-music'
    },
    listScroll() {
      this.$emit('listScroll')
    },
    _getArtists(arr) {
      const artists = []
      arr.forEach(item => {
        artists.push(item.name)
      })
      return artists.join('/')
    },
    _checkMore(data) {
      const songs = data.songs
      if (!songs.length || this.result.length >= data.songCount) {
        this.hasMore = false
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        return
      }
      this.search(newQuery)
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.suggest
  height 100%
  overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^='icon-']
        font-size 14px
        color $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
