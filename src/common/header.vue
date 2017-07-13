<template>
  <div class="top-header border-bottom fixed-top">
    <div class="top-back"><a href="javascript:history.go(-1)"></a></div>
    <h2 class="f36 " v-text="title"></h2>
    <div class="top-right"><a href="javascript:;" class="switch fl"></a><!--另换状态样式名：switch-hov--></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
