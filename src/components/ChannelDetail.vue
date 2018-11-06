<template>
  <div class="channel-detail">
    <div class="header">
      <div class="back">
        <i class="icon-arrow-left" @click="$emit('goDetail')"></i>
      </div>
      <div class="text">
        <span>
          {{topList.title}}
        </span>
      </div>
      <div class="icon">
        <div class="download">
          <i class="icon-download"></i>
        </div>
        <div class="search">
          <i class="icon-search"></i>
        </div>
      </div>
    </div>
    <div class="desc">
      <div ref="descItem" class="tap" v-for="(item, index) in topList.topTList" :key="index"
           :class="{active: nowActive === index}" @click="getNowList(item.tid, index)">
        {{item.name}}
      </div>
    </div>
    <div class="video-detail" ref="videoDetail">
      <div class="content">
        <video-list :video="item" v-for="(item, index) in list || defaultList" :key="index"></video-list>
      </div>
    </div>
  </div>
</template>

<script>
  import VideoList from './VideoList';
  import BScroll from 'better-scroll';
  import {getAniList} from '../public/api/animation';

  export default {
    name: 'ChannelDetail',
    props: {
      defaultList: {
        type: Array,
        required: true
      },
      topList: {
        type: Object,
        require: true
      }
    },
    mounted() {
      this.videoScroll = new BScroll(this.$refs.videoDetail, {
        click: true
      })
    },
    data() {
      return {
        nowActive: 0,
        list: ''
      }
    },
    methods: {
      showVideo(i) {
        this.nowActive = i;
      },
      getNowList(tid, i) {
        this.nowActive = i;
        getAniList(tid, this.nowClass)
          .then((res) => {
            this.list = res.data.archives;
          });
        this.videoScroll.scrollTo(0, 0, 0);
      }
    },
    components: {
      VideoList
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .channel-detail
    .header
      width: 100%
      height: 40px
      background-color: #fa7298
      color: #fff
      line-height: 40px
      padding: 0 10px
      display: flex
      box-sizing: border-box
      .back
        flex: 0 0 40px
      .text
        flex: 1
        font-size: 15px
      .icon
        flex: 0 0 66px
        text-align: center
        color: #fff
        font-size: 17px
        font-weight: 100
        display: flex
        & > div
          flex: 1
    .desc
      background-color: #fa7298
      color: #fff
      font-size: 12px
      white-space: nowrap
      .tap
        display: inline-block
        padding: 8px 10px
        &.active
          border-bottom: 2px solid #fff
    .video-detail
      position: absolute
      width: 100%
      top: 70px
      bottom: 0
      overflow: hidden
</style>
