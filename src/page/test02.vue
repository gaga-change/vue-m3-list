<template>
  <div>
    <div class="mobilegames-conn" ref="gaga">
      <ul>
        <li v-for="(item, index) in list" class="listware px-30 py-30 bg-fff border-bottom mb-20">
          <a href="#">
            <div class="imgs" style="transition-timing-function: ease-out;"
                 :style="{transform: 'translate('+ item.x + 'px, 0px) translateZ(0px)',
                 'transition-duration' : duration + 'ms'}"
                 @touchend="touchend($event, item)"
                 @touchmove="touchmove($event, item)"
                 @touchstart="touchstart($event, item)">
              <ul class="hrgames-img my-20" :style="{width: item.imgs.length * imgSize + 'px'}">
                <li v-for="(src, imgIndex) in item.imgs" class="img-demo fl">
                  <img :data-src="src" :src="screenWidth - item.maxX > imgSize * imgIndex ? src : null ">
                </li>
                <div style="clear: both"></div>
              </ul>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div>
      moveItem.x <span v-text="moveItem?moveItem.x :'' "></span> <br>
      startX <span v-text="startX"></span> <br>
      saveX <span v-text="saveX"></span> <br>
      speed <span v-text="speed"></span> <br>
      <span>{{test}}</span>
    </div>
    <div style="width: 100%; height: 8000px;background-color: #66c6fb"></div>
  </div>
</template>

<script>
  /*
   * 知识点
   *  touches: 当前屏幕上所有触摸点的列表;
   *  targetTouches: 当前对象上所有触摸点的列表;
   *  changedTouches: 涉及当前(引发)事件的触摸点的列表
   * */
  /*
   * 1. 超控div左右滑动，惯性滑动，反弹
   *   左右滑动方法
   *     start 和 move 可以得到移动的距离，然后 transform 改变位置
   *   惯性滑动方法
   *     1. 得到move移动的速度
   *     2. 根据最后一次的速度，在end中移动（过渡）一定的距离
   *   反弹效果
   *     1. 得到往左移动以及往右移动的最大距离
   *     2. 在moveend 触发时候进行判断，进行重置为最大（小）值，通过过渡实现动画效果
   * */
  export default {
    data () {
      return {
        list: [
          {
            imgs: ['/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png'],
            x: 0,
            maxX: 0
          },
          {
            imgs: ['/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png'],
            x: 0,
            maxX: 0
          }
        ],
        test: '',
        imgSize: 140,
        startY: 0,
        startX: 0,
        saveX: 0,
        duration: 0,
        speed: 0,
        screenWidth: document.body.clientWidth,
        saveMove: {timeStamp: 0, pageX: 0},
        moveItem: null,
        imgStartLoadSize: 0,
        touching: false,
        touchMoveX: null
      }
    },
    mounted () {
      this.imgStartLoadSize = Math.ceil(document.body.clientWidth / this.imgSize)
//      window.addEventListener('touchcancel', e => {
//        console.log(e)
//      })
    },
    methods: {
      touchstart (e, item) {
        e.preventDefault()
        this.test = this.test + 'touchstart '
        e.stopPropagation()
        this.touching = true
        let pageX = e.changedTouches[0].pageX
        this.startX = pageX
        this.startY = e.changedTouches[0].pageY
        this.saveX = item.x
        this.duration = 0
        this.moveItem = item
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = pageX
        this.speed = 0
      },
      touchmove (e) {
        this.test = this.test + 'touchmove '
        e.preventDefault()
        e.stopPropagation()
        let pageX = e.changedTouches[0].pageX
        let pageY = e.changedTouches[0].pageY
        if (this.touchMoveX === null) {
          this.getDirection({x: this.startX, y: this.startY}, {x: pageX, y: pageY})
          return
        } else if (this.touchMoveX === false) {
          return
        } else {
          document.body.style['overflow'] = 'hidden'
        }
//        let pageY = e.changedTouches[0].pageY
        let maxLeftSize = -1 * (this.moveItem.imgs.length - 3) * this.imgSize - 20
        let stopScale = 1
        if (this.saveX + pageX - this.startX < maxLeftSize) {
          stopScale = Math.ceil((maxLeftSize - (this.saveX + pageX - this.startX)) / 40)
        } else if (this.saveX + pageX - this.startX > 0) {
          stopScale = Math.ceil((this.saveX + pageX - this.startX) / 40)
        }
        pageX = this.saveMove.pageX + (pageX - this.saveMove.pageX) / (stopScale * stopScale)
        this.speed = (pageX - this.saveMove.pageX) / (e.timeStamp - this.saveMove.timeStamp)
        this.moveItem.x = this.saveX + (pageX - this.startX)
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = pageX
      },
      touchend (e) {
        this.test = this.test + 'touchend '
        e.preventDefault()
        e.stopPropagation()
        this.touchMoveX = null
        if (this.touchMoveX === false) {
          return
        }
        document.body.style['overflow'] = 'visible'
        this.touching = false
        let maxLeftSize = -1 * (this.moveItem.imgs.length - 3) * this.imgSize - 20
        let direction = this.speed < 0 ? -1 : 1
        let moveAgain = Math.abs(this.speed) < 4 ? parseInt(100 * this.speed) : direction * 300
        let duration = Math.abs(this.speed) < 1 ? parseInt(500 * Math.abs(this.speed)) : 500
        if (this.moveItem.x + moveAgain < maxLeftSize) {
          this.moveItem.x = maxLeftSize
          this.duration = 200
        } else if (this.moveItem.x + moveAgain > 0) {
          this.moveItem.x = 0
          this.duration = 200
        } else {
          this.moveItem.x = this.moveItem.x + moveAgain
          this.duration = duration
        }
        this.moveItem.maxX = this.moveItem.maxX > this.moveItem.x ? this.moveItem.x : this.moveItem.maxX
      },
      getDirection (start, move) {
        if (Math.abs(start.x - move.x) > Math.abs(start.y - move.y)) {
          this.touchMoveX = true
        } else {
          this.touchMoveX = false
        }
      }
    }
  }
</script>
<style scoped>
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  .listware {
    padding-right: 0 !important;
  }

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
