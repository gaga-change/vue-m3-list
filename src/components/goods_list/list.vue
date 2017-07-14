<template>
  <div class="mobilegames-conn" style="margin-top: 2.11rem">
    <!--列表1-->
    <div class="mbilegames-list border-top" style="display:block">
<!--      <div class="listware px-30 py-30 bg-fff border-bottom mb-20">
        <div class="mbgmes-img fl"><img src="~images/games-list.png"></div>
        <a href="#">
          <div class="mbgmes-con">
            <div class="mbl-title f32 color-000">S1到S7，5季王者，荣耀21星国服曹</div>
            <div class="mbl-cper">
              <div class="mbl-money color-m1 f32 fl">￥200</div>
              <div class="mbl-icon fr"><i class="an"></i><i class="shou"></i><i class="tu"></i></div>
            </div>
            <div class="mbl-parea color-666 f24"> QQ(苹果) / 手Q1区苍天翔龙</div>
          </div>
        </a>
      </div>-->
      <ul>
        <li class="listware px-30 py-30 bg-fff border-bottom mb-20"
         v-for="item in list">
          <a href="#">
            <div class="mbgmes-img fl"><img src="~images/games-list.png"></div>
            <div class="mbgmes-con">
              <div class="mbl-title f32 color-000">{{item.title}}</div>
              <div class="mbl-cper">
                <div class="mbl-money color-m1 f32 fl">￥{{item.price}}</div>
                <div class="mbl-icon fr">
                  <i class="an" v-show="item.is_axm && item.is_axm === 'true'"></i>
                  <!--<i class="shou"></i>-->
                  <i class="tu" v-show="item.is_robot_capture && item.is_robot_capture==='true'"></i>
                </div>
              </div>
              <div class="mbl-parea color-666 f24">{{item.region_name}}/{{item.server_name}}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <!--列表2-->
    <div class="mbilegames-list border-top" style="display:none">
      <ul>
        <li class="listware px-30 py-20 bg-fff border-bottom mb-20">
          <div class="hrgames-titl f32 color-000">S1到S7，5季王者，荣耀21星国服曹</div>
          <div class="hrgames-img my-20">
            <div class="img-demo fl"><img src="~images/games2-list.png"></div>
            <div class="img-demo fl"><img src="~images/games2-list.png"></div>
            <div class="img-demo fl"><img src="~images/games2-list.png"></div>
          </div>
          <div class="hrgames-tne"><span class="hr-price color-m1 f32 fl">￥200</span> <span
             class="hr-area f26 color-666 ml-30">QQ(苹果) / 手Q1区苍天翔龙</span></div>
          <div class="hrgames-cfi f26 color-666"><i class="firm mr-30 ">首次出售</i><i class="firm mr-30 ">截图认证</i>
          </div>
        </li>
        <li class="listware px-30 py-20 bg-fff border-bottom mb-20">
          <div class="hrgames-titl f32 color-000">S1到S7，5季王者，荣耀21星国服曹</div>
          <div class="hrgames-img my-20">
            <div class="img-demo fl"><img src="~images/games2-list.png"></div>
            <div class="img-demo fl"><img src="~images/games2-list.png"></div>
            <div class="img-demo fl"><img src="~images/games2-list.png"></div>
          </div>
          <div class="hrgames-tne"><span class="hr-price color-m1 f32 fl">￥200</span> <span
             class="hr-area f26 color-666 ml-30">QQ(苹果) / 手Q1区苍天翔龙</span></div>
          <div class="hrgames-cfi f26 color-666"><i class="firm mr-30 ">首次出售</i><i class="firm mr-30 ">截图认证</i><i
             class="firm mr-30 ">安心买</i></div>
        </li>
      </ul>
    </div>

    <!-- 没有更多商品 -->
    <div class="tab-empty">
      <div class="empty-conn px-30">
        <div class="list-img"><img src="~images/gamelist.png"></div>
        <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['goodsList'],
    computed: {
      list () { return this.goodsList.list }
    }
  }
</script>
