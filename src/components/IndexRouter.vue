<template>
  <div class="index">
    <router-view @nowActive="nowActive" @showLogin="$emit('showLogin')"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'IndexRouter',
    methods: {
      nowActive(i) {
        this.$emit('nowActive', i)
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .index
    width: 100%
    height: 100%
</style>
