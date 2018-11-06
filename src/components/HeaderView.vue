<template>
  <div class="header">
    <div class="sideBar" @click="$emit('showSide')">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div class="avatar"></div>
    </div>
    <div class="middle">
      <div class="search" v-if="nowPage === 0" @click="$emit('showSearch')">
        <i class="icon-search"></i>
        <div></div>
      </div>
    </div>
    <div class="title" v-if="nowPage === 1">频道</div>
    <div class="title" v-if="nowPage === 2">动态</div>
    <div class="title" v-if="nowPage === 3">个人</div>
    <div class="option">
      <div class="game">
        <i class="icon-game-1" v-if="nowPage === 0"></i>
      </div>
      <div class="download">
        <i class="icon-download" v-if="nowPage === 0 || nowPage === 1"></i>
      </div>
      <div class="msg">
        <i class="icon-msg-1" v-if="nowPage === 0"></i>
        <i class="icon-search" v-if="nowPage === 1"></i>
        <i class="icon-alter" v-if="nowPage === 2"></i>
        <i class="icon-person" v-if="nowPage === 3"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'headerView',
    props: {
      nowPage: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .header
    height: 40px
    box-sizing: border-box
    background-color: #fa7298
    position: relative
    display: flex
    line-height: 40px
    padding: 8px 0
    .sideBar
      height: 25px
      ul
        height: 14px
        position: absolute
        top: 50%
        left: 0
        margin-top: -7px
        li
          height: 2px
          width: 8px
          background-color: #fff
          margin-top: 4px
          &:first-child
            margin-top: 0
      .avatar
        width: 25px
        height: 25px
        background: url("../public/img/avatar.png")
        background-size: 100% 100%
        margin-left: 20px
        border-radius: 50%
      .logo
        width: 62px
        height: 30px
        background: url("../public/img/bannerTop.d651f31.png")
    .middle
      flex: 1
      height: 25px
      padding: 0 10px 0 17px
      box-sizing: border-box
      font-weight: 200
      .search
        height: 100%
        position: relative
        .icon-search
          position: absolute
          top: 50%
          transform: translateY(-50%)
          color: rgba(255, 255, 255, .2)
          left: 15px
          font-size: 10px
        div
          background-color: rgba(0, 0, 0, .1)
          border-radius: 12px
          width: 100%
          height: 25px
    .title
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      color: #fff
    .option
      width: 100px
      display: flex
      div
        flex: 1
        height: 25px
        line-height: 25px
        text-align: center
        color: #fff
        font-size: 17px
        font-weight: 100
</style>
