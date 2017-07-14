<template>
  <div class="goodslist-02 pb-300" v-show="show" style="z-index: 3">
    <div class="top-header border-bottom fixed-top">
      <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
      <h2 class="f36 ">精准筛选</h2>
      <div class="top-right"></div>
    </div>
    <div class="screen-titl border-bottom px-30 color-000 f32 mt-97 bg-fff">价格范围</div>
    <div class="screen-price bg-fff mb-20 border-bottom">
      <div class="price-list px-30 py-30">
        <input class="price-input fl f30" name="" type="text" placeholder="最低价"><span class="hern fl"></span><input
         class="price-input fl f30" name="" type="text" placeholder="最高价">
      </div>
      <div class="price-type pl-30">
        <ul>
          <li class="fl mb-30 active"><a href="#"><span class="border f30">不限</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">50元以下</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">50-100元</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">100-500元</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">500-1000元</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">1000元以上</span></a></li>
        </ul>
      </div>
    </div>
    <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">保障服务</div>
    <div class="screen-price bg-fff mb-20  border-bottom">
      <div class="price-type pl-30 pt-30">
        <ul>
          <li class="fl mb-30"><a href="#"><span class="border f30">安心买</span></a></li>
          <li class="fl mb-30 state"><a href="#"><span class="border f30">截图认证</span></a></li>
        </ul>
      </div>
    </div>
    <div class="fixed-bottom border-top">
      <div class="goodslist-btn px-30 py-30 bg-fff">
        <a class="options f32 color-666 fl text-center" href="#">清除选项</a>
        <a class="purchase f32 bg-f54 color-fff fr text-center" href="#">确定</a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: [
    'show' // 是否显示筛选
  ]
}
</script>
