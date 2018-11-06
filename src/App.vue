<template>
  <div id="app">
    <header-view @showSide="showSide" :nowPage="nowActive" @showSearch="isShowSearch = !isShowSearch"></header-view>
    <div class="view">
      <router-view @showLogin="showLogin" @nowActive="changeNowActive"></router-view>
    </div>
    <div class="footer">
      <div v-for="(item, index) in routeList" :class="{active: nowActive === index}" :key="index" class="list" @click="goRoute(item.path, index)">
        <div class="content">
          <i :class="item.icon" class="icon"></i>
          <div class="text">{{item.text}}</div>
        </div>
      </div>
    </div>
    <transition name="side">
      <side-bar v-show="isShowSide" @showLogin="showLogin" @hidePleaseLogin="hidePleaseLogin" @showPleaseLogin="showPleaseLogin" @showSide="showSide"></side-bar>
    </transition>
    <transition name="login">
      <login v-if="isShowLogin" @showLogin="showLogin"></login>
    </transition>
    <div class="please-login" v-if="isShowPleaseLogin">
      <please-login @showSide="showSide" @showLogin="showLogin"></please-login>
    </div>
    <transition name="search">
      <div class="search-view" v-if="isShowSearch">
        <search-view @showSearch="isShowSearch = !isShowSearch"></search-view>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getAniList} from './public/api/animation'
  import {getPlayer} from './public/api/player'
  import HeaderView from './components/HeaderView'
  import SideBar from './components/SideBar'
  import Login from './components/LoginView'
  import PleaseLogin from './components/PleaseLogin'
  import SearchView from './components/SearchView'

  export default {
    name: 'App',
    data() {
      return {
        url: '',
        isShowSide: false,
        video: '',
        isShowLogin: false,
        nowActive: 0,
        routeList: [
          {
            icon: 'icon-home',
            path: '/',
            text: '主页'
          },
          {
            icon: 'icon-app',
            path: '/channel',
            text: '频道'
          },
          {
            icon: 'icon-flower',
            path: '/dynamic',
            text: '动态'
          },
          {
            icon: 'icon-person',
            path: '/person',
            text: '个人'
          }
        ],
        isShowPleaseLogin: false,
        isShowSearch: false
      }
    },
    created() {
      getAniList(21, 1)
        .then((res) => {
          // console.log(res);
        });
      // 根据av号拿到数据
      getPlayer(34453209)
        .then((res) => {
          this.url = res.durl[0].url
        });
    },
    components: {
      HeaderView,
      SideBar,
      Login,
      PleaseLogin,
      SearchView
    },
    methods: {
      goRoute(path, index) {
        this.$router.push(path);
        this.nowActive = index;
      },
      showSide() {
        this.isShowSide = !this.isShowSide
      },
      showPleaseLogin() {
        this.isShowPleaseLogin = true
      },
      hidePleaseLogin() {
        this.isShowPleaseLogin = false
      },
      showLogin() {
        this.isShowLogin = !this.isShowLogin
      },
      changeNowActive(i) {
        this.nowActive = i;
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass">
  #app
    width: 100%
    height: 100%
    .view
      position: fixed
      top: 40px
      bottom: 45px
      width: 100%
      background-color: #f4f4f4
      & > .play-video
        position: fixed
        top: 0
        bottom: 0
        width: 100%
        z-index: 10000
        background-color: #fff
    .footer
      position: fixed
      bottom: 0
      left: 0
      height: 45px
      background-color: #fbfbfb
      width: 100%
      z-index: -1
      display: flex
      .list
        flex: 1
        width: 25%
        height: 45px
        text-align: center
        font-size: 18px
        color: #ccc
        display: table
        .content
          display: table-cell
          vertical-align: middle
          .icon
            line-height: 18px
          .text
            font-size: 10px
            line-height: 12px
            margin-top: 4px
        &.active
          color: #fa7298
    .side-enter,.side-leave-to
      .background
        opacity: 0
      .side
        left: -220px
    .side-enter-active,.side-leave-active
      transition: all .5s
      div
        transition: all .5s
    .login-enter,.login-leave-to
      opacity: 0
      left: 50%
      right: 50%
      transform: translate(-50%) scale(0)
    .login-enter-active,.login-leave-active
      transition: all .5s
    .please-login
      position: fixed
      top: 0
      bottom: 0
      right: 0
      left: 0
      z-index: 99
    .search-view
      position: fixed
      top: 0
      bottom: 0
      right: 0
      left: 0
      z-index: 50
      background-color: #fff
      transition: all .5s
    .search-enter,.search-leave-to
      opacity: 0
      left: 50%
      right: 50%
      transform: translate(-50%) scale(0)
</style>
