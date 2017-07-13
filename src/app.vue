<template>
  <div id="app">
    <!--<keep-alive include="currentView">-->
      <router-view></router-view>
    <!--</keep-alive>-->
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import "./assets/css/fost-base.css";
</style>
