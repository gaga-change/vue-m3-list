<template>
  <div class="seach-list" v-show="show">
    <div class="gmvst-mold">
      <ul>
        <li @click="click(item)" v-for="item in goodsType.list"
            class="f30 border-bottom px-30 active"><span v-text="item.goodsTypeName"></span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['goodsType', 'show'],
    methods: {
      click (item) {
        this.$emit('clickItem', item)
      }
    }
  }
</script>
