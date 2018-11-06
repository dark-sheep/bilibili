<template>
  <div class="dynamics">
    <please-login @showLogin="$emit('showLogin')"></please-login>
  </div>
</template>

<script>
  import PleaseLogin from '../components/PleaseLogin2'

  export default {
    name: 'DynamicView',
    created() {
      this.$emit('nowActive', 2)
    },
    components: {
      PleaseLogin
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .dynamics
    width: 100%
    height: 100%
</style>
