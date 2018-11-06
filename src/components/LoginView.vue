<template>
  <div class="login">
    <div class="header">
      <div class="back" @click="$emit('showLogin')">
        <i class="icon-arrow-left"></i>
      </div>
      <div class="text">
        <span>登录</span>
      </div>
      <div class="forget">
        <span>忘记密码？</span>
      </div>
    </div>
    <div class="login-img" :class="nowFocus === 1 ? 'hide' : ''">
      <div class="left"></div>
      <div class="logo"></div>
      <div class="right"></div>
    </div>
    <div class="login-desc">
      <div class="person clearfix" :class="nowFocus === 0 ? 'active' : ''">
        <i class="icon-person1 icon"></i>
        <div class="input">
          <input type="text" placeholder="你的手机号/邮箱" :autofocus="nowFocus === 0" @click="nowFocus = 0">
        </div>
      </div>
      <div class="psd clearfix" :class="nowFocus === 1 ? 'active' : ''">
        <i class="icon-block icon second"></i>
        <div class="input">
          <input type="text" placeholder="请输入密码" :autofocus="nowFocus === 1" @click="nowFocus = 1">
        </div>
      </div>
    </div>
    <div class="login-register">
      <div class="login-btn">
        注册账号
      </div>
      <div class="register-btn">
        登录
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginView',
    created() {
      this.nowFocus = 0;
    },
    data() {
      return {
        nowFocus: 0
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .login
    width: 100%
    height: 100%
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 1500
    background-color: #eaeaea
    .header
      height: 40px
      background-color: #fa7298
      padding: 5px
      display: flex
      box-sizing: border-box
      line-height: 30px
      .back
        flex: 0 0 50px
        height: 100%
        text-align: center
        color: #fff
        font-weight: 200
      .text
        flex: 1
        font-size: 12px
        color: #fff
      .forget
        flex: 0 0 60px
        height: 30px
        text-align: center
        color: #fff
        font-weight: 200
        font-size: 10px
    .login-img
      height: 60px
      margin-top: 20px
      text-align: center
      .left
        width: 60px
        height: 60px
        background: url('../public/img/login_1.png')
        background-size: 100% 100%
        float: left
      .right
        width: 60px
        height: 60px
        background: url('../public/img/login_2.png')
        background-size: 100% 100%
        float: right
      &.hide
        .left
          background: url('../public/img/login_1_hide.png')
          background-size: 100% 100%
        .right
          background: url('../public/img/login_2_hide.png')
          background-size: 100% 100%
      .logo
        display: inline-block
        height: 30px
        width: 95px
        background: url('../public/img/bili_logo.png')
        background-size: 100% 100%
    .login-desc
      padding: 0 15px
      width: 100%
      box-sizing: border-box
      .person, .psd
        height: 30px
        width: 100%
        border-bottom: 1px solid #b5b5b5
        padding-top: 10px
        display: flex
        .icon
          flex: 1
          font-size: 20px
          text-align: center
          line-height: 30px
          color: #b5b5b5
          &.second
            font-size: 14px
        .input
          height: 20px
          width: 90%
          flex: 0 0 310px
          padding: 5px 0
          input
            width: 100%
            height: 100%
            background-color: transparent
            border: none
            outline: none
            font-size: 10px
            font-weight: 200
        &.active
          border-bottom: 1px solid #fa7298
          .icon
            color: #fa7298
    .login-register
      display: flex
      height: 30px
      margin: 10px 0
      padding: 0 10px
      & > div
        flex: 1
        margin: 0 5px
        box-sizing: border-box
        border-radius: 2px
        text-align: center
        line-height: 30px
        font-size: 12px
      .login-btn
        border: 1px solid rgba(250, 114, 152, .7)
        line-height: 28px
        color: #fa7298
      .register-btn
        background-color: rgba(250, 114, 152, .4)
        color: #fff
</style>
