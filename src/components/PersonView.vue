<template>
  <div class="member">
    <div class="member-please-login">
      <please-login @showLogin="$emit('showLogin')"></please-login>
    </div>
  </div>
</template>

<script>
  import PleaseLogin from './PleaseLogin2'

  export default {
    name: 'MemberView',
    created() {
      this.$emit('nowActive', 3)
    },
    components: {
      PleaseLogin
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .member
    .member-please-login
      position: fixed
      top: 40px
      left: 0
      right: 0
      bottom: 45px
</style>
