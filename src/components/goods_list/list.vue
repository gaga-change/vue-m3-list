<template>
  <div class="mobilegames-conn" style="margin-top: 2.11rem;overflow: visible">
    <!--列表1-->
    <div class="mbilegames-list border-top" style="overflow: visible">
      <v-infinite-scroll
         :start="start"
         :dataArr="list"
         :updateBottom="updateBottom">
        <ul>
          <!--<li class="listware px-30 py-30 bg-fff border-bottom mb-20"-->
          <li class="listware bg-fff border-bottom mb-20"
              v-for="item in list">
            <a href="javascript:void(0)" v-if="switchState">
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
            <a href="javascript:void(0)" v-else>
              <div class="hrgames-titl f32 color-000">{{item.title}}</div>
              <div class="hrgames-img my-20 row">
                <v-slide
                   :paddingLeft="paddingLeft"
                   :imgs="item.small_img_list"
                   :key="item.id"></v-slide>
   <!--             <ul>
                  <li class="img-demo fl" v-for="(src, imgIndex) in item.small_img_list">
                    <img src="~images/games2-list.png">
                  </li>
                  <li class="img-demo fl">
                    <img src="~images/games2-list.png">
                  </li>
                  <li class="img-demo fl">
                    <img src="~images/games2-list.png">
                  </li>
                  <div style="clear: both"></div>
                </ul>-->
              </div>
              <div class="hrgames-tne"><span class="hr-price color-m1 f32 fl">￥{{item.price}}</span> <span
                 class="hr-area f26 color-666 ml-30">{{item.region_name}}/{{item.server_name}}</span></div>
              <div class="hrgames-cfi f26 color-666">
                <i class="firm mr-30 ">首次出售</i>
                <i class="firm mr-30 ">截图认证</i>
              </div>
            </a>
          </li>
        </ul>
        <!-- 没有更多商品 -->
        <div class="tab-empty" v-if="(start&&noNext)||(start&&list.length < pageCount)">
          <div class="empty-conn px-30">
            <div class="list-img"><img src="~images/gamelist.png"></div>
            <div class="emp-text f28 color-999 text-center">抱歉，没有更多商品了~</div>
          </div>
        </div>
      </v-infinite-scroll>
    </div>
    <div style="width: .3rem;height: 0;" ref="padding"></div>
  </div>
</template>

<script>
  import slide from './swipe_slide.vue'
  export default {
    props: ['goodsList', 'scrollButton', 'switchState'],
    components: {
      'v-slide': slide
    },
    data () {
      return {
        start: false,
        noNext: false,
        paddingLeft: 0
      }
    },
    computed: {
      list () { return this.goodsList.list },
      pageCount () { return this.goodsList.pageCount }
    },
    watch: {
      list (val, old) {
        if (val === null) {
          console.log('this.start false')
          this.start = false
        }
        if (old === null && val !== null) {
          this.$nextTick(() => {
            console.log('this.start true')
            this.start = true
          })
        }
      }
    },
    mounted () {
      this.paddingLeft = this.$refs.padding.clientWidth + 1
    },
    methods: {
      updateBottom () {
        console.log('list updateBottom')
        return this.scrollButton().then(d => {
          if (d) this.noNext = true
          return d
        })
      }
    }
  }
</script>

<style scoped>
  .listware {
    padding: 15px;
  }
  a {
    display: block;
  }
  .row {
    /*margin-left: -15px;*/
    margin-right: -15px;
    width: auto!important;
  }
</style>
