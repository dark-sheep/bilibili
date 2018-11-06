<template>
  <div class="play-video" ref="videoScroll">
    <div>
      <div class="video">
        <div class="control" @click="showControl" v-show="isShowControl">
          <div class="top">
            <div class="back" @click="back">
              <i class="icon-arrow-left"></i>
            </div>
            <div class="aid">
              av{{video.aid}}
            </div>
            <div class="more">
              <i class="icon-more"></i>
            </div>
          </div>
          <div class="bottom">
            <div class="play">
              <i :class="isPlay ? 'icon-pause' : 'icon-play'" @click="play"></i>
            </div>
            <div class="progress-bar">
              <div class="content" ref="bar" @touchstart="touchStart" @touchmove="touchMove">
                <div class="now" ref="progress">
                  <i class="icon-ghost" v-show="nowTime"></i>
                </div>
              </div>
            </div>
            <div class="time">
              {{nowTime}}/{{fullTime}}
            </div>
            <div class="full-screen">
              <i class="icon-full-screen"></i>
            </div>
          </div>
        </div>
        <video @click="showControl" ref="video" :src="result.durl ? result.durl[0].url : ''" autoplay></video>
      </div>
      <div class="video-desc">
        <div class="author-desc">
          <div class="avatar">
            <img :src="video.face" alt="" style="width: 100%; height: 100%;">
          </div>
          <div class="author">
        <span class="text">
          {{video.author}}
        </span>
          </div>
          <div class="btn" @click="showLogin">
            <div>+ 关注</div>
          </div>
        </div>
        <div class="detail" @click="showDescription = !showDescription">
          <div class="title">{{video.title}}</div>
          <div class="arrow">
            <i :class="{'icon-down-2': !showDescription, 'icon-up-2': showDescription}"></i>
          </div>
          <div class="detail-content">
            <div class="left">
            <span class="play">
              <i class="icon-play-tv-1"></i>
              {{video.play}}
            </span>
              <span class="danmaku">
              <i class="icon-menu"></i>
              {{video.stat.danmaku}}
            </span>
              <span class="create">{{video.create}}</span>
            </div>
            <div class="forbid">
              <i class="icon-forbid" style="color: #fa7298"></i>
              未经作者授权禁止转载
            </div>
          </div>
          <div class="description">
            <transition name="desc">
              <!-- eslint-disable-next-line -->
              <div v-show="showDescription">{{`${video.description.length < 5 ? video.title : video.description}`}}
              </div>
            </transition>
          </div>
        </div>
        <div class="options">
          <div class="icon" @click="showLogin">
            <i class="icon-up-1"></i>
            <div class="count">{{video.stat.like}}</div>
          </div>
          <div class="icon" @click="showLogin">
            <i class="icon-down-1"></i>
            <div class="count">差评</div>
          </div>
          <div class="icon" @click="showLogin">
            <i class="icon-coin"></i>
            <div class="count">{{video.stat.coin}}</div>
          </div>
          <div class="icon" @click="showLogin">
            <i class="icon-star-b"></i>
            <div class="count">{{video.stat.reply}}</div>
          </div>
          <div class="icon" @click="showLogin">
            <i class="icon-transpond"></i>
            <div class="count">{{video.stat.share}}</div>
          </div>
        </div>
      </div>
      <div class="more" v-if="this.dynamic.length">
        <div class="dynamic" v-for="(item, index) in this.dynamic" :key="index">
          {{item}}
        </div>
      </div>
      <div class="more-video">
        <div class="video-item" v-for="(item, index) in videoList" :key="index">
          <div class="pic">
            <img :src="item.pic" alt="" style="width: auto; height: 100%;">
          </div>
          <div class="video-item-content">
            <div class="title">
              {{item.title}}
            </div>
            <div class="video-item-detail">
              <div class="up">
                <i class="icon-up-host"></i>
                {{item.author}}
              </div>
              <span class="play">
                <i class="icon-play-tv-1"></i>
                {{item.play}}
              </span>
              <span class="pts">
                <i class="icon-menu"></i>
                {{item.pts}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {disposeTime} from '../public/js/tool';
  import {videoList} from '../assets/videoList';
  import BScroll from 'better-scroll';

  export default {
    name: 'playVideo',
    created() {
      this.result = this.$route.query.v;
      this.video = this.$route.query.video;
      let nowArr = this.video.dynamic.split('#');
      for (let i = 0; i < nowArr.length; i++) {
        if (nowArr[i]) {
          this.dynamic.push(nowArr[i])
        }
      }
      this.$nextTick(() => {
          this.videoScroll = new BScroll(this.$refs.videoScroll, {
            click: true,
            bounce: false
          })
        }
      );
      this.$axios.get('/api/videoList').then((res) => {
        // console.log(res);
      })
    },
    mounted() {
      let videoPlay = this.$refs.video;
      this.$refs.video.addEventListener('timeupdate', () => {
        this.fullTime = disposeTime(parseInt(videoPlay.duration));
        this.nowTime = disposeTime(parseInt(videoPlay.currentTime));
        let proportion = videoPlay.currentTime / videoPlay.duration;
        if (this.$refs.progress) {
          this.$refs.progress.style.left = proportion * this.$refs.bar.offsetWidth + 'px';
        }
        if (videoPlay.duration === videoPlay.currentTime) {
          this.isPlay = false;
        }
      });
      this.hideControl()
    },
    data() {
      return {
        isPlay: true,
        nowTime: '',
        fullTime: '',
        isShowControl: true,
        isTimeOut: false,
        result: {},
        video: {},
        showDescription: false,
        dynamic: [],
        videoList: videoList.data.list
      }
    },
    methods: {
      timeOut() {
        this.isTimeOut = true;
        setTimeout(() => {
          this.isShowControl = false;
          this.isTimeOut = false;
        }, 3000)
      },
      play() {
        if (this.isPlay) {
          this.$refs.video.pause();
          this.isPlay = false;
        } else {
          if (this.$refs.video.currentTime === this.$refs.video.duration) {
            this.$refs.video.currentTime = 0;
            this.$refs.video.play();
          }
          this.$refs.video.play();
          this.isPlay = true;
        }
      },
      touchStart(e) {
        // console.log(e.touches[0].pageX);
        // console.log(this.$refs.bar.offsetLeft);
      },
      touchMove(e) {
        // console.log(e.touches[0].pageX);
      },
      hideControl() {
        this.timeOut();
      },
      showControl() {
        if (!this.isShowControl && !this.isTimeOut) {
          this.timeOut()
        }
        this.isShowControl = !this.isShowControl;
      },
      showLogin() {
        this.$emit('showLogin')
      },
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="sass" ref="stylesheet/sass" scoped>
  .play-video
    .video
      width: 100%
      height: 200px
      text-align: center
      position: relative
      overflow: hidden
      .control
        width: 100%
        height: 100%
        position: absolute
        font-size: 10px
        top: 0
        left: 0
        z-index: 5
        color: #fff
        text-align: center
        .top
          display: flex
          padding: 10px 0
          background: linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0))
          .back
            flex: 1
          .aid
            flex: 5
            text-align: left
          .more
            flex: 1
            font-size: 20px
        .bottom
          display: flex
          position: absolute
          bottom: 0
          left: 0
          padding: 10px 10px
          width: 100%
          height: 40px
          box-sizing: border-box
          line-height: 20px
          background: linear-gradient(to top, rgba(0, 0, 0, .3), rgba(0, 0, 0, 0))
          & > div
            height: 100%
          .play
            text-align: center
          .progress-bar
            flex: 1
            position: relative
            .content
              width: 85%
              position: absolute
              top: 50%
              left: 50%
              transform: translate(-50%)
              height: 2px
              background-color: rgba(255, 255, 255, .5)
              .now
                position: absolute
                left: 0
                top: 50%
                transform: translateY(-50%) translateX(-50%)
          .full-screen
            padding: 0 5px
      video
        width: 100%
        position: absolute
        top: 50%
        left: 0
        transform: translateY(-50%)
        background-color: #000
    .video-desc
      border-bottom: 1px solid #d6d6d6
      padding-bottom: 10px
      .author-desc
        display: flex
        padding: 10px
        align-items: center
        .avatar
          width: 30px
          height: 30px
          border-radius: 50%
          overflow: hidden
        .author
          height: 30px
          font-size: 12px
          display: inline-block
          line-height: 20px
          padding: 0 10px
        .btn
          flex: 1
          text-align: right
          & > div
            text-align: center
            font-size: 12px
            color: #fff
            line-height: 20px
            display: inline-block
            height: 20px
            width: 60px
            background-color: #fa7298
            border-radius: 3px
      .detail
        position: relative
        .title
          font-size: 12px
          padding: 10px 15px
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
        .arrow
          color: #ccc
          font-size: 12px
          position: absolute
          top: 10px
          right: 10px
        .detail-content
          white-space: nowrap
          font-size: 18px
          transform: scale(.5)
          color: #aeaeae
          .left
            display: inline-block
            position: relative
            left: -160px
            .play, .danmaku, .create
              display: inline-block
              margin-right: 5px
          .forbid
            display: inline-block
            position: absolute
            right: -137px
        .description
          white-space: pre
          text-overflow: ellipsis
          overflow: hidden
          padding: 0 10px
          margin: 10px 0
          box-sizing: border-box
          font-size: 12px
          color: #aeaeae
        .desc-enter, .desc-leave-to
          margin-bottom: -100%
        .desc-enter-active, .desc-leave-active
          transition: all .7s
      .options
        display: flex
        .icon
          flex: 1
          text-align: center
          font-size: 20px
          color: #6a6a6a
          .count
            font-size: 12px
            margin-top: 5px
    .more
      padding: 10px
      .dynamic
        display: inline-block
        padding: 0 10px
        line-height: 25px
        font-size: 12px
        border-radius: 30px
        background-color: #f4f4f4
        margin-right: 5px
        margin-bottom: 5px
        max-width: 80px
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
    .more-video
      width: 100%
      .video-item
        padding: 10px
        display: flex
        height: 50px
        .pic
          flex: 0 0 80px
          width: 80px
        .video-item-content
          flex: 1
          padding: 0 5px
          position: relative
          .title
            font-size: 12px
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
            overflow: hidden
          .video-item-detail
            font-size: 10px
            position: absolute
            bottom: 0
</style>
