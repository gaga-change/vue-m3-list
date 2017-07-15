<template>
  <div>
    <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
      <swiper-slide class="swiper-item">
        <img data-src="http://img1.3lian.com/2015/w7/78/d/91.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img data-src="http://pic.58pic.com/58pic/16/99/22/64Q58PIC6d8_1024.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img data-src="http://images.yanjundong.top/01.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img data-src="http://images.yanjundong.top/02.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img data-src="http://images.yanjundong.top/03.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img data-src="http://pic.nipic.com/2008-03-26/2008326111754214_2.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">
        <img data-src="http://img4.imgtn.bdimg.com/it/u=1306419823,295440953&fm=214&gp=0.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">Slide 6</swiper-slide>
      <swiper-slide class="swiper-item">
        <img data-src="http://pic5.nipic.com/20100109/4160937_181832044688_2.jpg" class="swiper-lazy">
        <div class="swiper-lazy-preloader"></div>
      </swiper-slide>
      <swiper-slide class="swiper-item">Slide 10</swiper-slide>
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
    </swiper>
    <!--<div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img data-src="path/to/picture-1.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide">
          <img data-src="path/to/picture-2.jpg" class="swiper-lazy">
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide">
          <div data-background="path/to/picture-3.jpg" class="swiper-lazy">slide3</div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
  /**
   * 获取到当前左边滑出的宽度 + 屏幕的宽度 / 单个容器的宽度  然后给每个这个个数之前的容器的src-data 切换成 src
   */
  export default {
    data () {
      return {
        swiperOption: {
          offsetSlidesAfter: 2,
          notNextTick: true,
//          height: 300, // 配置高度 只有在垂直时生效
          freeMode: true, // 没有图片滑动吸引
          freeModeMomentumRatio: 0.2, // 自由状态下，惯性
          spaceBetween: 20, // 两图之间的间距
          slidesOffsetBefore: 20, // 第一张图和左边的偏移量
          lazyLoadingInPrevNextAmount: parseInt(document.body.clientWidth / 170),
          lazyLoading: true, // 图片延迟加载，src -> data-src
          preloadImages: false,
          updateOnImagesReady: true,
          lazyLoadingInPrevNext: true, // 提前加载旁边的
          lazyLoadingOnTransitionStart: false, // 过渡一开始就加载
          mousewheelControl: false, // 鼠标滚轮控制
//          slidesPerView: 3,
          width: 150 // 配置宽度
//          setWrapperSize: true,
//          paginationClickable: true,
//          mousewheelControl: true,
//          observeParents: true
        }
      }
    },
    computed: {
      swiper () {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted () {
      // you can use current swiper instance object to do something(swiper methods)
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper)
//      this.swiper.slideTo(3, 1000, false)
      console.log('容器宽度：', this.swiper.width)
    },
    methods: {
      test (swiper, slide, image) {
        alert('延迟加载图片')
        console.log(swiper) // Swiper实例
        console.log(slide) // 哪个slide里面的图片在加载
        console.log(image) // 哪个图片在加载
      }
    }
  }
</script>

<style scoped>
  img {
    max-width: 100%;
  }

  html, body {
    position: relative;
    height: 100%;
  }

  body {
    background: #eee;
  }

  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .swiper-item:nth-child(even) {
    background-color: silver;
  }

  .swiper-item:nth-child(odd) {
    background-color: #66c6fb;
  }

  .swiper-item {
    height: 151px;
    text-align: center;
    font-size: 18px;
    /* Center slide text vertically */
    /*display: -webkit-box;*/
    /*display: -ms-flexbox;*/
    /*display: -webkit-flex;*/
    /*display: flex;*/
    /*-webkit-box-pack: center;*/
    /*-ms-flex-pack: center;*/
    /*-webkit-justify-content: center;*/
    /*justify-content: center;*/
    /*-webkit-box-align: center;*/
    /*-ms-flex-align: center;*/
    /*-webkit-align-items: center;*/
    /*align-items: center;*/
  }
</style>
