<template>
  <div class="goodslist-02 pb-300" v-show="show" style="z-index: 3">
    <div class="top-header border-bottom ">
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
    <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">绑定信息</div>
    <div class="screen-price bg-fff mb-20  border-bottom">
      <div class="price-type pl-30 pt-30">
        <ul>
          <li class="fl mb-30 state"><a href="#"><span class="border f30">未绑定身份证</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">未绑定手机号</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">未绑定邮箱</span></a></li>
        </ul>
      </div>
    </div>
    <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">服务保障</div>
    <div class="screen-price bg-fff mb-20  border-bottom">
      <div class="price-type pl-30 pt-30">
        <ul>
          <li class="fl mb-30 state"><a href="#"><span class="border f30">截图认证</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">安心买</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">首次出售</span></a></li>
        </ul>
      </div>

    </div>

    <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">强势英雄</div>
    <div class="screen-price bg-fff mb-20 border-bottom">
      <div class="price-type pl-30 pt-30">
        <ul>
          <li class="fl mb-30 state"><a href="#"><span class="border f30">李白</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">武则天</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">韩信</span></a></li>
          <li class="fl mb-30 "><a href="#"><span class="border f30">嬴政</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">橘右京</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">宫本</span></a></li>
          <li class="fl mb-30 "><a href="#"><span class="border f30">不知火舞</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">娜可露露</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">嬴政</span></a></li>
        </ul>

      </div>
      <div class="prty-btn pb-30"><a class="prty-more" href="#"></a></div>

    </div>

    <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">稀有皮肤</div>
    <div class="screen-price bg-fff mb-20 border-bottom">
      <div class="price-type pl-30 pt-30">
        <ul>
          <li class="fl mb-30 state"><a href="#"><span class="border f30">凤求凰</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">至尊宝</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">凤凰于飞</span></a></li>
          <li class="fl mb-30 "><a href="#"><span class="border f30">引擎之心</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">白龙吟</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">霸王别姬</span></a></li>
          <li class="fl mb-30 "><a href="#"><span class="border f30">逐梦之音</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">阴阳师</span></a></li>
          <li class="fl mb-30"><a href="#"><span class="border f30">末日机甲</span></a></li>
        </ul>

      </div>
      <div class="prty-btn pb-30"><a class="prty-more-hov" href="#"></a></div>

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
