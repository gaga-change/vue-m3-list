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
              <ul class="hrgames-img my-20" :style="{width: item.imgs.length * 140 + 'px'}">
                <li v-for="src in item.imgs" class="img-demo fl">
                  <img :src="src">
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
    </div>
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
            x: 0
          },
          {
            imgs: ['/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png', '/static/games2-list.png'],
            x: 0
          }
        ],
        startX: 0,
        saveX: 0,
        duration: 0,
        speed: 0,
        saveMove: {timeStamp: 0, pageX: 0},
        moveItem: null
      }
    },
    mounted () {
      this.$refs.gaga.addEventListener('click', function (e) {
        console.log(e.screenX, e.clientX)
      })
    },
    methods: {
      touchstart (e, item) {
        let pageX = e.changedTouches[0].pageX
        console.log('start', pageX)
        this.startX = pageX
        this.saveX = item.x
        this.duration = 0
        this.moveItem = item
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = e.pageX
      },
      touchmove (e, item) {
        let pageX = e.changedTouches[0].pageX
//        console.log('move', pageX)
//        console.log('move', e.timeStamp)
        this.speed = (pageX - this.saveMove.pageX) / (e.timeStamp - this.saveMove.timeStamp)
//        console.log(this.speed)
        this.moveItem.x = this.saveX + pageX - this.startX
        this.saveMove.timeStamp = e.timeStamp
        this.saveMove.pageX = pageX
      },
      touchend (e, item) {
        let direction = this.speed < 0 ? -1 : 1
        let moveAgain = Math.abs(this.speed) < 3 ? parseInt(100 * this.speed) : direction * 300
        let duration = Math.abs(this.speed) < 1 ? parseInt(500 * Math.abs(this.speed)) : 500
        console.log(moveAgain, duration)
        this.moveItem.x = this.moveItem.x + moveAgain
        this.duration = duration
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
