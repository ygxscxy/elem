<template>
  <div class="search-list">
    <ul>
      <li
        @click="selectCity(item)"
        v-for="(item, index) in searchCitysName"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    searchCitysName: {
      type: Array,
      default() {
        return [];
      },
    },
    selectCity: Function,
  },
};
</script>

<style scoped>
.search-list {
  position: relative;
  top: 40px;
}

.search-list {
  background: #fff;
  padding: 10px 16px;
}
.search-list li {
  padding: 15px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  font-size: 16px;
}
</style>