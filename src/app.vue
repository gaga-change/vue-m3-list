<template>
  <div id="wrapper">
    <div id="app">
      <router-view></router-view>
      <!--<keep-alive include="currentView">-->
      <!--</keep-alive>-->
      <!--<router-view></router-view>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import "./assets/css/fost-base.css";
  @import "./assets/css/common/list-cl.css";
</style>
