<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header.vue'
import Tab from './components/tab/tab'
import Player from './components/player/player'

export default {
  name: 'App',
  data() {
    return {
      stop: false
    }
  },
  mounted() {
    const m = document.querySelector('#app')
    m.addEventListener('touchend', this.firstPlay)
  },
  methods: {
    firstPlay() {
      const music = document.querySelector('#music-audio')
      music.play()
      if (music.src !== '') {
        this.stop = true
      }
    }
  },
  watch: {
    stop() {
      const m = document.querySelector('#app')
      m.removeEventListener('touchend', this.firstPlay)
    }
  },
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus" scoped>
@import './common/stylus/variable'

#app
  color $color-theme
</style>
