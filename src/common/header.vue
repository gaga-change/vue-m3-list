<template>
  <div v-if="show" class="top-header border-bottom fixed-top">
    <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
    <h2 class="f36 " v-text="title"></h2>
    <div class="top-right" v-if="showSwitch">
      <a href="javascript:void(0);"
         @click="switchClick"
         :class="{'switch-hov': switchState}"
         class="switch fl"></a><!--另换状态样式名：switch-hov--></div>
  </div>
</template>

<script>
export default {
  props: {
    title: { // 标题
      type: String,
      default: ''
    },
    show: { // 控制是否显示
      type: Boolean,
      default: true
    },
    showSwitch: { // 列表专属多图切换
      type: Boolean,
      default: false
    },
    switchState: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchClick () {
      this.$emit('switchClick')
    }
  }
}
</script>
