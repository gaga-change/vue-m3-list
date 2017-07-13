<template>
  <div>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <div
         ref="loadmore"
         :autoFill=false
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-immediate-check="test"
         infinite-scroll-distance="10"
      >
        <slot></slot>
        <slot name="noDataShow" v-if="noDataShow"></slot>
        <p v-show="loading && init && !allLoading" class="page-infinite-loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['dataArr', 'updateTop', 'updateBottom', 'start'],
    data () {
      /**
       * 皆为内部状态，组件内部独立使用。
       */
      return {
        noDataShow: false, // 是否显示 slot.name = noDataShow 内的html
        loading: true, // 不会触发
        init: false, // 是否被初始化，确保 firstLoadMore 只执行一次。
        allLoading: false, // 是否数据接收完毕
        wrapperHeight: 0,
        loadmoreDom: null
      }
    },
    watch: {
      /**
       * 如果sonStart为true，视为启动组件。执行firstLoadMore方法
       * @param val
       */
      start (val) {
        if (val) {
          this.firstLoadMore()
        }
      }
    },
    computed: {
      /**
       * 处理dataArr为空的情况
       * @returns {*|Array}
       */
      list () {
        return this.dataArr || []
      },
      /**
       * 通过computed获取父组件的数据。防止直接调用。
       */
      sonStart () {
        return this.start
      }
    },
    mounted () {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
      this.loadmoreDom = this.$refs.loadmore.$el
    },
    methods: {
      /**
       * 激活组件时，执行一次 ladMore。
       */
      firstLoadMore () {
        this.loadMore()
        this.init = true
        this.noDataShow = false
      },
      loadMore () {
        this.loading = true
        this.updateBottom().then((noData) => {
          if (noData) {
            if (this.list.length === 0) {
              this.noDataShow = true // 显示页面空白部分
            }
            this.allLoading = true
          } else {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .mint-loadmore-top {
    z-index: -100;
  }

  .mint-loadmore-top span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }

  .rotate {
    transform: rotate(180deg);
  }

  .mint-loadmore {
    overflow: visible;
  }

</style>

<style>
  /*转动刷新 居中*/

  .page-infinite-loading {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }

  .page-infinite-loading div {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }

</style>
