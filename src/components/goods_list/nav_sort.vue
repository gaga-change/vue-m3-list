<template>
  <div class="seach-list" v-show="show">
    <div class="gmvst-mold">
      <ul>
        <li class="f30 border-bottom px-30"
            @click="clickItem(index)"
            v-for="(item, index) in list"
            :class="{active: index === checkIndex}">
          <span v-text="item.sortTypeName"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['show', 'sort'],
    computed: {
      list () { return this.sort.list },
      checkIndex () { return this.sort.index }
    },
    methods: {
      clickItem (index) {
        this.$emit('clickItem', index)
      }
    }
  }
</script>
