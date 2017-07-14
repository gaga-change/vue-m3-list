<template>
  <div class="goodslist-02 pb-300" v-show="show" style="z-index: 3">
    <div class="top-header border-bottom fixed-top">
      <div class="top-back">
        <a href="javascript:void(0)"
        @click="goOut"></a></div>
      <h2 class="f36 ">精准筛选</h2>
      <div class="top-right"></div>
    </div>
    <div class="screen-titl border-bottom px-30 color-000 f32 mt-97 bg-fff">价格范围</div>
    <div class="screen-price bg-fff mb-20 border-bottom">
      <div class="price-list px-30 py-30">
        <input class="price-input fl f30" name="" type="text" placeholder="最低价"
        v-model.trim="minValue">
        <span class="hern fl"></span>
        <input class="price-input fl f30" name="" type="text" placeholder="最高价"
        v-model.trim="maxValue">
      </div>
      <!-- 价格类型列表 -->
      <div class="price-type pl-30">
        <ul>
          <li class="fl mb-30"
              v-for="(item, index) in prices"
              @click="clickItem(TYPE.PRICES, item, index)"
              :class="{active: item.radio === index}">
            <a href="javascript:void(0)">
              <span class="border f30" v-text="item.name"></span>
            </a></li>
        </ul>
      </div>
    </div>
    <div class="screen-titl border-bottom px-30 color-000 f32 bg-fff border-top">保障服务</div>
    <div class="screen-price bg-fff mb-20  border-bottom">
      <!-- 保障服务列表 -->
      <div class="price-type pl-30 pt-30">
        <ul>
          <li class="fl mb-30"
              v-for="(item, index) in services"
              @click="clickItem(TYPE.SERVICES, item, index)"
              :class="{state: item.checked}">
            <a href="javascript:void(0)">
              <span class="border f30" v-text="item.name"></span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="fixed-bottom border-top">
      <div class="goodslist-btn px-30 py-30 bg-fff">
        <a class="options f32 color-666 fl text-center" href="javascript:void(0)"
        @click="clear">清除选项</a>
        <a class="purchase f32 bg-f54 color-fff fr text-center" href="javascript:void(0)"
        @click="goOut">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: [
      'show', // 是否显示筛选
      'filter'
    ],
    computed: {
      TYPE () { return this.filter.TYPE },
      minValue () { return this.filter.price.minValue },
      maxValue () { return this.filter.price.maxValue },
      prices () { return this.filter.price.list },
      services () { return this.filter.service.list }
    },
    methods: {
      /* 选中任何一项 */
      clickItem (type, item, index) {
        this.$emit('clickItem', {type, item, index})
      },
      /* 清除选择 */
      clear () {
        this.$emit('clear')
      },
      /* 退出 */
      goOut () {
        this.$emit('comfirm')
      }
    }
  }
</script>
