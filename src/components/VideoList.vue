<template>
  <div class="video-list" v-show="result.img">
    <div class="video" ref="video" @click="showVideo(result, video)">
      <div class="video-desc">
        <div class="left">
          <span class="play">
            <i class="icon-play-tv-1"></i>
            {{video.play}}
          </span>
          <span class="danmaku">
            <i class="icon-menu"></i>
            {{video.stat.danmaku}}
          </span>
        </div>
        <div class="right">
          {{duration}}
        </div>
      </div>
    </div>
    <div class="desc">
      <div class="title">
        {{video.title}}
      </div>
      <div class="content">
        <span class="text">{{video.dynamic}}</span>
        <span class="icon"><i class="icon-more"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPlayer} from '../public/api/player'
  import {disposeTime} from '../public/js/tool'

  export default {
    name: 'VideoList',
    created() {
      this.duration = disposeTime(this.video.duration);
      getPlayer(this.video.aid)
        .then((res) => {
          this.$refs.video.style.background = `url("${res.img}")`;
          this.$refs.video.style.backgroundColor = `#000`;
          this.$refs.video.style.backgroundSize = `auto 100%`;
          this.$refs.video.style.backgroundPosition = `50% 0`;
          this.$refs.video.style.backgroundRepeat = `no-repeat`;
          this.result = res
        });
    },
    data() {
      return {
        result: '',
        duration: 0
      }
    },
    watch: {
      video() {
        this.duration = disposeTime(this.video.duration);
        getPlayer(this.video.aid)
          .then((res) => {
            this.$refs.video.style.background = `url(${res.img})`;
            this.$refs.video.style.backgroundColor = `#000`;
            this.$refs.video.style.backgroundSize = `auto 100%`;
            this.$refs.video.style.backgroundPosition = `50% 0`;
            this.$refs.video.style.backgroundRepeat = `no-repeat`;
            this.result = res;
          });
      }
    },
    props: {
      video: {
        required: true
      }
    },
    methods: {
      showVideo(v, video) {
        this.$emit('showVideo');
        this.$router.push({path: '/play', query: {v: v, video: video}})
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .video-list
    padding: 5px 5px
    box-sizing: border-box
    width: 50%
    display: inline-block
    .video
      height: 120px
      border-top-right-radius: 5px
      border-top-left-radius: 5px
      position: relative
      .video-desc
        position: absolute
        bottom: 0
        width: 100%
        color: #fff
        font-size: 12px
        padding: 2px 4px
        box-sizing: border-box
        .left
          display: inline-block
        .right
          display: inline-block
          float: right
    .desc
      height: 50px
      padding: 6px 7px
      font-size: 12px
      background-color: #fff
      border-bottom-right-radius: 5px
      border-bottom-left-radius: 5px
      box-shadow: 1px 1px 1px 1px #ccc
      .title
        height: 25px
        overflow: hidden
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        text-overflow: ellipsis
      .content
        width: 100%
        height: 25px
        position: relative
        .text
          display: inline-block
          position: absolute
          left: -31px
          bottom: -5px
          width: 80%
          text-overflow: ellipsis
          overflow: hidden
          white-space: nowrap
          font-size: 20px
          transform: scale(.5)
          color: #7a7a7a
        .icon
          display: inline-block
          width: 100%
          text-align: right
          margin-top: 15px
</style>
