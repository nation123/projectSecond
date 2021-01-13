<template>
  <video-player
    class="video-player-box"
    style="width: 100%;"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    customEventName="customstatechangedeventname"

    @play="onPlayerPlay"
    @pause="onPlayerPause"
    @ended="onPlayerEnded"
  ></video-player>

  <!--@waiting="onPlayerWaiting()"-->
  <!--@playing="onPlayerPlaying()"-->
  <!--@loadeddata="onPlayerLoadeddata()"-->
  <!--@timeupdate="onPlayerTimeupdate()"-->
  <!--@canplay="onPlayerCanplay()"-->
  <!--@canplaythrough="onPlayerCanplaythrough()"-->

  <!--@statechanged="playerStateChanged()"-->
  <!--@ready="playerReadied"-->
</template>

<script>

  export default {
    props: {
      url: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        playerOptions: {
          width: '720',
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
            src: this.url
          }],
          poster: "../../static/images/test.jpg", //你的封面地址
          // width: document.documentElement.clientWidth, //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        console.log('player play!')
        this.$emit('play')
      },
      onPlayerPause(player) {
        console.log('player pause!')
        this.$emit('pause', player.cache_)
      },
      onPlayerEnded(player) {
        console.log('player ended!')
        this.$emit('ended', player.cache_)
      },
    }
  }
</script>

<style lang="scss">
  // 调整播放器样式
  .video-js {
    .vjs-big-play-button {
      top: 50%;
      left: 50%;
      margin-top: -0.8em;
      margin-left: -1.5em;
    }
  }
</style>
