<template>
  <!--<ul class="hrgames-img my-20 imgs">-->
  <!--<li v-for="(src, imgIndex) in imgs" class="img-demo fl">-->
  <!--<img :src="src">-->
  <!--</li>-->
  <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
    <swiper-slide
       :key="imgIndex"
       class="swiper-item"
       v-for="(src, imgIndex) in imgs">
      <img :src="src" class="swiper-lazy">
      <!--<div class="swiper-lazy-preloader"></div>-->
    </swiper-slide>
  </swiper>
  <!--<div style="clear: both"></div>-->
  <!--</ul>-->
</template>

<script>
  export default {
    props: ['imgs', 'paddingLeft'],
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          freeMode: true, // 没有图片滑动吸引
          freeModeMomentumRatio: 0.6, // 自由状态下，惯性
          spaceBetween: 10, // 两图之间的间距
          slidesOffsetBefore: 15, // 第一张图和左边的偏移量
          slidesOffsetAfter: 15, // 最后一张图和右边的偏移量
//          lazyLoadingInPrevNextAmount: parseInt(document.body.clientWidth / 170),
//          lazyLoading: true, // 图片延迟加载，src -> data-src
//          preloadImages: false,
//          updateOnImagesReady: true,
//          lazyLoadingInPrevNext: true, // 提前加载旁边的
//          lazyLoadingOnTransitionStart: false, // 过渡一开始就加载
          mousewheelControl: false, // 鼠标滚轮控制
          slidesPerView: 'auto'
        }
      }
    }
  }
</script>

<style scoped>

  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .swiper-item {
    width: 130px !important;
    height: 81px !important;
    text-align: center;
  }
  img {
    max-width: 100%;
  }

</style>
