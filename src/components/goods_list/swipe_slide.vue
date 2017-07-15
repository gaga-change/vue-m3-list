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
        noSwipe: false, // 是否启动左右滑动，如果图片撑不开主屏，则禁止滑动
        touchMoveX: null, // 手势移动的方向，null为初始化
        imgSize: 140, // 一个图片项的大小（包括margin padding）
        startX: 0, // movestart 时触碰屏幕的x轴点
        startY: 0, // movestart 时触碰屏幕的Y轴点
        saveX: 0,
        duration: 0, // 用于配置动画持续时间
        speed: 0, // 识别移动的速度
        screenWidth: document.body.clientWidth, // 当前屏幕的宽度
        saveMove: {timeStamp: 0, pageX: 0}, // 保存move是上一个点的时间戳和x轴点
        x: 0, // 平移的距离
        maxX: 0 // 最大的向左平移的距离
      }
    },
    mounted () {
      this.noSwipe = (this.screenWidth - this.paddingLeft) / this.imgSize >= this.imgs.length
//      document.addEventListener('touchmove', function (e) {
//        e.preventDefault()
//      }, false)
    },
    methods: {
      touchstart (e) {
//        e.preventDefault()
        if (this.noSwipe) return
        let pageX = e.changedTouches[0].pageX
        let pageY = e.changedTouches[0].pageY
        this.startX = pageX
        this.startY = pageY
        this.saveX = this.x
        this.duration = 0
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = pageX
        this.touchMoveX = null // 手势方向初始化
        this.speed = 0 // 速度初始化
      },
      touchmove (e) {
        e.preventDefault()
        if (this.noSwipe) return
        let pageX = e.changedTouches[0].pageX
        let pageY = e.changedTouches[0].pageY
        if (this.touchMoveX === null) {
          /* 方向为null， 则获取方向 */
          this.getDirection({x: this.startX, y: this.startY}, {x: pageX, y: pageY})
        }
        /* 如果方向为纵向，则直接退出，主屏幕优先滚动 */
        if (this.touchMoveX === false) {
          return
        } else {
          /* 如果方向为横向，禁止主屏纵向滚动 */
          document.body.style['overflow'] = 'hidden'
        }
//        let maxLeftSize = -1 * (this.imgs.length * this.imgSize - this.screenWidth) - this.paddingLeft
        let stopScale = 1
//        if (this.saveX + pageX - this.startX < maxLeftSize) {
//          stopScale = Math.ceil((maxLeftSize - (this.saveX + pageX - this.startX)) / 40)
//        } else if (this.saveX + pageX - this.startX > 0) {
//          stopScale = Math.ceil((this.saveX + pageX - this.startX) / 40)
//        }
        pageX = this.saveMove.pageX + (pageX - this.saveMove.pageX) / (stopScale * stopScale)
        this.speed = (pageX - this.saveMove.pageX) / (e.timeStamp - this.saveMove.timeStamp)
        this.x = this.saveX + (pageX - this.startX)
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = pageX
      },
      touchend (e) {
//        e.preventDefault()
        if (this.noSwipe) return
        document.body.style['overflow'] = 'visible'
//        let maxLeftSize = -1 * (this.imgs.length * this.imgSize - this.screenWidth) - this.paddingLeft
//        let direction = this.speed < 0 ? -1 : 1
//        let moveAgain = Math.abs(this.speed) < 4 ? parseInt(100 * this.speed) : direction * 300
//        let duration = Math.abs(this.speed) < 1 ? parseInt(1000 * Math.abs(this.speed)) : 1000
        let moveAgain = parseInt(200 * this.speed)
        let duration = 500
//        if (this.x + moveAgain < maxLeftSize) {
//          this.x = maxLeftSize
//          this.duration = 200
//        } else if (this.x + moveAgain > 0) {
//          this.x = 0
//          this.duration = 200
//        } else {
        this.x = this.x + moveAgain
        this.duration = duration
//        }
        this.maxX = this.maxX > this.x ? this.x : this.maxX
      },
      getDirection (start, move) {
        /* 获取手势方向 */
        this.touchMoveX = Math.abs(start.x - move.x) > Math.abs(start.y - move.y)
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
