<template>
  <div>
    <ul>
      <button @click="list += 1">add</button> {{list}}
      <li v-for="item in games">
        <router-link :to="{name:'MGGoodsList', params: {gameId: item.catagoryId}}">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  export default {
    name: 'hello',
    data () {
      return {
        games: [],
        list: null
      }
    },
    created () {
      this.list = this.$store.state.test
      this.getMobileGames({
        fn: d => { this.games = d },
        params: {gameType: 2, pageIndex: 1, pageSize: 9999}
      })
    },
    destroyed () {
      this.test(this.list)
    },
    methods: {
      ...mapActions(['getMobileGames']),
      ...mapMutations(['test']),
      gaga () {
        return 'gaga'
      }
    }
  }
</script>
