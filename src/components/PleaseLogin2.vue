<template>
  <div class="please-login2">
    <div class="login">
      <div class="img"></div>
      <span class="login-text">你还没有登录哦&sim;</span>
      <span class="login-text">赶紧登录打开新世界的大门</span>
      <div class="btn" @click="$emit('showLogin')">
        登录
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PleaseLogin2'
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .please-login2
    width: 100%
    height: 100%
    position: relative
    .login
      position: absolute
      top: 50%
      transform: translateY(-50%)
      width: 100%
      text-align: center
      .img
        display: inline-block
        height: 100px
        width: 186px
        background-image: url("../public/img/please_login_2.png")
        background-size: 100% 100%
      .login-text
        display: block
        font-size: 12px
        color: #9d9d9d
        margin-top: 10px
        &:nth-child(3)
          margin-top: 3px
      .btn
        padding: 0 40px
        display: inline-block
        margin-top: 30px
        background-color: #fa7298
        border-radius: 2px
        font-size: 12px
        color: #fff
        line-height: 30px
        font-weight: 200
</style>
