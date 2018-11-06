<template>
    <div class="please-login">
      <div class="header">
        <div class="side" @click="$emit('showSide')">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <span class="header-text">历史记录</span>
      </div>
      <div class="login">
        <div class="img"></div>
        <span class="login-text">登陆后历史记录就可以多设备同步啦&sim;</span>
        <div class="btn" @click="$emit('showLogin')">
          立即登录
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'PleaseLogin'
    }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .please-login
    background-color: #fff
    position: relative
    .header
      height: 40px
      background-color: #fa7298
      position: relative
      .side
        position: absolute
        left: 10px
        top: 50%
        transform: translateY(-50%)
        .bar
          height: 2px
          width: 16px
          background-color: #fff
          margin-top: 3px
          &:first-child
            margin-top: 0
      .header-text
        line-height: 40px
        display: inline-block
        font-size: 15px
        margin-left: 50px
        color: #fff
        font-weight: 200
    .login
      position: absolute
      top: 50%
      transform: translateY(-50%)
      width: 100%
      text-align: center
      .img
        display: inline-block
        height: 100px
        width: 120px
        background-image: url("../public/img/please_login_1.png")
        background-size: 100% 100%
      .login-text
        display: block
        font-size: 12px
        color: #9d9d9d
        margin-top: 10px
      .btn
        padding: 0 5px
        display: inline-block
        margin-top: 20px
        background-color: #fa7298
        border-radius: 2px
        font-size: 12px
        color: #fff
        line-height: 30px
        font-weight: 200
</style>
