<template>
  <div class="home-page">
    <div class="top-list" ref="topList">
      <div class="all">
        <div v-for="(item, index) in topList" :key="index" class="class-item" @click="getNowList(index)"
             :class="{active: nowClass === index}">
          {{item.title}}
        </div>
      </div>
    </div>
    <div class="partition">
      <i :class="iconClass[nowClass]"
         :style="iconClass[nowClass] === 'icon-drama' ? '' : 'display: inline-block; width: 15px;'">
        <i class="path1"></i>
        <i class="path2"></i>
        <i class="path3"></i>
        <i class="path4"></i>
      </i>
      <span class="desc" style="color: #333; vertical-align: middle">{{topList[nowClass].title}}</span>
    </div>
    <div class="category" v-show="nowClass" ref="category">
      <div class="scroll" ref="scroll">
        <div ref="categoryItems" v-for="(item, index) in topList[nowClass].topTList" :key="index" class="category-item"
             @click="getNowList2(item.tid, index)" :class="{active: nowActive === index}">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="all-video" ref="allVideo" :class="nowClass ? '' : 'null'">
      <div>
        <video-list v-for="(item, index) in nowList" :key="index" :video="item"></video-list>
      </div>
    </div>
    <div class="play-video" v-if="show">
      <play-video :result="result" :video="video"></play-video>
    </div>
  </div>
</template>

<script>
  import VideoList from './VideoList'
  import {getAniList} from '../public/api/animation'
  import {TopList} from '../assets/data'
  import BScroll from 'better-scroll'
  import PlayVideo from './PlayVideo'

  export default {
    name: 'HomePageView',
    created() {
      this.$emit('nowActive', 0);
      getAniList(27, 1)
        .then((res) => {
          this.nowList = res.data.archives;
          this.$nextTick(() => {
            this.topScroll = new BScroll(this.$refs.topList, {
              click: true,
              scrollX: true
            });
            this.videoScroll = new BScroll(this.$refs.allVideo, {
              click: true
            });
            this.categoryScroll = new BScroll(this.$refs.category, {
              click: true,
              scrollX: true
            });
          })
        })
    },
    data() {
      return {
        topList: TopList,
        nowList: [],
        nowClass: 0,
        result: {},
        show: false,
        iconClass: [
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
        nowActive: 0,
        video: ''
      }
    },
    watch: {
      nowList(newVal, oldVal) {
        if (oldVal.length && this.$refs.categoryItems) {
          let categoryItems = this.$refs.categoryItems;
          let width = 0;
          for (let i = 0; i < categoryItems.length; i++) {
            width += categoryItems[i].offsetWidth
          }
          this.$refs.scroll.style.width = width + 'px';
          this.categoryScroll.scrollTo(0, 0);
          this.categoryScroll.refresh();
        }
      }
    },
    components: {
      VideoList,
      PlayVideo
    },
    methods: {
      getNowList(i) {
        this.nowClass = i;
        getAniList(this.tidArray[i], i)
          .then((res) => {
            this.nowList = res.data.archives;
          });
        this.videoScroll.scrollTo(0, 0, 0);
        this.nowActive = 0;
      },
      getNowList2(tid, i) {
        this.nowActive = i;
        getAniList(tid, this.nowClass)
          .then((res) => {
            this.nowList = res.data.archives;
          });
        this.videoScroll.scrollTo(0, 0, 0);
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .home-page
    .top-list
      border-bottom: 1px solid #f8f8f8
      overflow: hidden
      background-color: #fff
      .all
        text-align: center
        width: 500px
        .class-item
          width: 50px
          font-size: 10px
          line-height: 30px
          display: inline-block
          &.active
            color: #fa7298
            border-bottom: 2px solid #fa7298
    .partition
      height: 50px
      line-height: 50px
      padding: 0 10px
      font-size: 17px
      color: #fa7298
      .desc
        display: inline-block
        vertical-align: middle
        font-size: 12px
    .category
      height: 30px
      width: 100%
      background-color: #f6f6f6
      .scroll
        height: 100%
        display: inline-block
        .category-item
          float: left
          font-size: 12px
          padding: 0 11px
          text-align: center
          line-height: 30px
          &.active
            color: #fa7298
    .all-video
      position: fixed
      left: 0
      right: 0
      top: 153px
      bottom: 45px
      overflow: hidden
      background-color: #f4f4f4
      &.null
        top: 117px
    .play-video
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      z-index: 1500
      background-color: #fff
</style>
