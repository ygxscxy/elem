<template>
  <div class="works-table">
    <ul class="works">
      <li v-for="(item, index) in keys" :key="item" @click="selectKey(index)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    keys: Array,
    cityListRef: Object,
    citysDom: HTMLCollection,
    scroll: Object,
  },
  methods: {
    selectKey(index) {
      this.scroll.scrollToElementEnc(this.citysDom[index], 250);
    },
  },
};
</script>

<style scoped>
.works-table {
  position: fixed;
  z-index: 4;
  right: 5px;
  top: 20%;
}
.works li {
  margin-bottom: 6px;
}
</style>