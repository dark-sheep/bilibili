<template>
  <div class="search-view">
    <div class="header">
      <div class="search">
        <div class="input">
            <span class="icon">
              <i class="icon-search"></i>
            </span>
          <div class="input-content">
            <input type="text">
          </div>
        </div>
      </div>
      <div class="cancel" @click="showSearch">
        取消
      </div>
    </div>
    <div class="all-search">
      <div class="left text">大家都在搜</div>
      <div class="right text" @click="showAll = !showAll">
        {{showAll ? '收起' : '展开'}}
      </div>
    </div>
    <div class="hot" :class="{hide: !showAll}">
      <div v-for="(item, index) in allSearch" :key="index" class="item">
        {{item.keyword}}
      </div>
    </div>
  </div>
</template>

<script>
  import {AllSearch} from '../assets/AllSearch'

  export default {
    name: 'SearchView',
    data() {
      return {
        allSearch: AllSearch.list,
        showAll: false
      }
    },
    methods: {
      showSearch() {
        this.$emit('showSearch');
        this.showAll = false;
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .search-view
    width: 100%
    height: 100%
    .header
      width: 100%
      height: 40px
      display: flex
      background-color: #fa7298
      line-height: 40px
      .search
        flex: 9
        padding: 10px 5px
        box-sizing: border-box
        .input
          width: 100%
          height: 100%
          position: relative
          background-color: #fff
          border-radius: 50px
          display: flex
          .icon
            display: inline-block
            flex: 1
            text-align: center
            line-height: 20px
            font-size: 12px
            color: rgba(0, 0, 0, .5)
          .input-content
            flex: 9
            height: 100%
            input
              width: 95%
              height: 80%
              border: none
              outline: none
              background-color: transparent
              transform: translateY(-12px)
              font-size: 12px
      .cancel
        color: #fff
        font-size: 12px
        flex: 1
        text-align: center
    .all-search
      padding: 5px
      border-bottom: 1px solid #eaeaea
      .text
        display: inline-block
        font-size: 12px
        line-height: 12px
      .left
        color: #757575
        vertical-align: top
      .right
        color: #a4a4a4
        float: right
    .hot
      padding: 10px
      overflow: hidden
      &.hide
        height: 60px
      .item
        display: inline-block
        font-size: 12px
        line-height: 30px
        padding: 0 10px
        background-color: #f4f4f4
        border-radius: 3px
        margin: 0 5px 5px 0
</style>
