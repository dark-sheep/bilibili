<template>
  <div class="sidebar">
    <div class="background" @click="$emit('showSide')"></div>
    <div class="side">
      <div class="header">
        <div class="avatar">
          <div class="content" @click="$emit('showLogin')"></div>
          <span class="text">点击头像登录</span>
        </div>
      </div>
      <div class="list">
        <div v-for="(text, index) in textList" :key="index" :class="{active: nowActive === index}" @click="go(index)">
          <i :class="iconList[index]"></i>
          <span>{{text}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    data() {
      return {
        nowActive: 0,
        iconList: [
          'icon-home',
          'icon-clock2',
          'icon-download2',
          'icon-star-b',
          'icon-play-history'
        ],
        textList: [
          '首页',
          '历史记录',
          '离线缓存',
          '我的收藏',
          '稍后再看'
        ]
      }
    },
    methods: {
      go(i) {
        this.$emit('showSide');
        if (i === 0) {
          this.$emit('hidePleaseLogin');
          this.nowActive = i;
        } else if (i === 1) {
          this.$emit('showPleaseLogin');
          this.nowActive = i;
        } else {
          this.$emit('showLogin');
        }
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .sidebar
    position: fixed
    z-index: 100
    top: 0
    bottom: 0
    left: 0
    right: 0
    .background
      position: absolute
      z-index: 101
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(0, 0, 0, .5)
    .side
      position: absolute
      z-index: 102
      top: 0
      left: 0
      width: 220px
      height: 100%
      background-color: #fff
      .header
        display: flex
        height: 95px
        width: 100%
        background-color: #fa7298
        background-image: url("../public/img/side-bg.png")
        background-size: auto 95px
        background-repeat: no-repeat
        background-position: 97px 0
      .avatar
        flex: 0 0 95px
        height: 95px
        padding: 10px
        box-sizing: border-box
        .content
          width: 40px
          height: 40px
          border-radius: 50%
          border: 1px solid #fcfcfc
          background: url("../public/img/avatar.png")
          background-size: 100% 100%
        .text
          display: inline-block
          font-size: 18px
          line-height: 30px
          transform: scale(.5) translateX(-50px)
          color: #fff
          white-space: nowrap
      .list
        padding: 7px 0
        & > div
          padding: 0 10px
          color: #7f7f7f
          line-height: 30px
          font-size: 10px
          & > span
            display: inline-block
            width: 72px
            transform: scale(.5) translate(-5px, 5px)
            font-size: 18px
            color: #000
            font-weight: 200
          &.active
            background-color: #d4d4d4
            color: #fa7298
</style>
