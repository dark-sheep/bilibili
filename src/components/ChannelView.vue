<template>
  <div class="channel">
    <div v-for="(item, index) in channelList" :key="index" v-if="item.id" class="channel-item" @click="goDetail(tidArray[index], item.id, item)">
      <div class="icon">
        <i :class="iconList[index]">
          <i class="path1"></i>
          <i class="path2"></i>
          <i class="path3"></i>
          <i class="path4"></i>
        </i>
      </div>
      <div class="text">
        {{item.title}}
      </div>
    </div>
    <transition name="detail">
      <channel-detail :defaultList="result" :topList="topList" v-if="showDetail" @goDetail="goDetail"></channel-detail>
    </transition>
  </div>
</template>

<script>
  import {TopList} from '../assets/data'
  import {getAniList} from '../public/api/animation'
  import ChannelDetail from './ChannelDetail'

  export default {
    name: 'ChannelView',
    created() {
      this.$emit('nowActive', 1)
    },
    data() {
      return {
        channelList: TopList,
        iconList: [
          'icon-home',
          'icon-play-tv-1',
          'icon-drama',
          'icon-The-gen',
          'icon-headset',
          'icon-dance',
          'icon-science',
          'icon-game-2',
          'icon-star-b',
          'icon-demon'
        ],
        tidArray: [
          130,
          24,
          33,
          153,
          28,
          20,
          37,
          17,
          71,
          22
        ],
        result: [],
        topList: {},
        showDetail: false
      }
    },
    methods: {
      goDetail(tid, id, topList) {
        if (!this.showDetail) {
          getAniList(tid, id)
            .then((res) => {
              this.result = res.data.archives;
              this.topList = topList;
            })
        }
        this.showDetail = !this.showDetail;
      }
    },
    components: {
      ChannelDetail
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .channel
    width: 100%
    height: 100%
    padding: 10px 20px
    box-sizing: border-box
    .channel-item
      display: inline-block
      width: 33.33%
      text-align: center
      padding: 15px 0
      .icon
        font-size: 30px
        color: #fa7298
      .text
        font-size: 12px
        margin-top: 10px
    .channel-detail
      position: fixed
      top: 0
      bottom: 0
      left: 0
      right: 0
      background-color: #eaeaea
    .detail-enter, .detail-leave-to
      opacity: 0
      left: 50%
      right: 50%
      transform: translate(-50%) scale(0)
    .detail-enter-active, .detail-leave-active
      transition: all .5s
</style>
