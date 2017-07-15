<template>
  <ul class="hrgames-img my-20 imgs"
      style="transition-timing-function: ease-out;"
      :style="{transform: 'translate('+ x + 'px, 0px) translateZ(0px)',
        width: imgs.length * imgSize + 'px',
        'transition-duration' : duration + 'ms'}"
      @touchend="touchend($event)"
      @touchmove="touchmove($event)"
      @touchstart="touchstart($event)"
  >
    <li v-for="(src, imgIndex) in imgs" class="img-demo fl">
      <img :data-src="src" :src="screenWidth - maxX > imgSize * imgIndex ? src : null ">
    </li>
    <div style="clear: both"></div>
  </ul>
</template>

<script>
  export default {
    props: ['imgs', 'paddingLeft'],
    data () {
      return {
        imgSize: 140, // 一个图片项的大小（包括margin padding）
        startX: 0, // movestart 时触碰屏幕的x轴点
        saveX: 0,
        duration: 0, // 用于配置动画持续时间
        speed: 0, // 识别移动的速度
        screenWidth: document.body.clientWidth, // 当前屏幕的宽度
        saveMove: {timeStamp: 0, pageX: 0}, // 保存move是上一个点的时间戳和x轴点
        x: 0, // 平移的距离
        maxX: 0 // 最大的向左平移的距离
      }
    },
    methods: {
      touchstart (e) {
        let pageX = e.changedTouches[0].pageX
        this.startX = pageX
        this.saveX = this.x
        this.duration = 0
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = pageX
      },
      touchmove (e) {
        let pageX = e.changedTouches[0].pageX
        let maxLeftSize = -1 * (this.imgs.length * this.imgSize - this.screenWidth) - this.paddingLeft
        let stopScale = 1
        if (this.saveX + pageX - this.startX < maxLeftSize) {
          stopScale = Math.ceil((maxLeftSize - (this.saveX + pageX - this.startX)) / 40)
        } else if (this.saveX + pageX - this.startX > 0) {
          stopScale = Math.ceil((this.saveX + pageX - this.startX) / 40)
        }
        pageX = this.saveMove.pageX + (pageX - this.saveMove.pageX) / (stopScale * stopScale)
        this.speed = (pageX - this.saveMove.pageX) / (e.timeStamp - this.saveMove.timeStamp)
        this.x = this.saveX + (pageX - this.startX)
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = pageX
      },
      touchend () {
        let maxLeftSize = -1 * (this.imgs.length * this.imgSize - this.screenWidth) - this.paddingLeft
        let direction = this.speed < 0 ? -1 : 1
        let moveAgain = Math.abs(this.speed) < 4 ? parseInt(100 * this.speed) : direction * 300
        let duration = Math.abs(this.speed) < 1 ? parseInt(500 * Math.abs(this.speed)) : 500
        if (this.x + moveAgain < maxLeftSize) {
          this.x = maxLeftSize
          this.duration = 200
        } else if (this.x + moveAgain > 0) {
          this.x = 0
          this.duration = 200
        } else {
          this.x = this.x + moveAgain
          this.duration = duration
        }
        this.maxX = this.maxX > this.x ? this.x : this.maxX
      }
    }
  }
</script>

<style scoped>
  .hrgames-img li {
    width: 130px !important;
    height: 81px !important;
    overflow: hidden !important;
    float: left;
    margin-right: 10px !important;
  }

  .hrgames-img li img {
    max-width: 100% !important;
    height: auto !important;
  }
</style>
