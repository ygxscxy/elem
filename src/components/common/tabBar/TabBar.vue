<template>
  <div class="tab-bar flex a-c j-c-s-a">
    <div v-for="(tabBarItem, index) in tabBarList" :key="index">
      <tabBarItem :tabBarItem="tabBarItem"></tabBarItem>
    </div>
  </div>
</template>

<script>
import tabBarItem from "./TabBerItem.vue";
export default {
  components: {
    tabBarItem,
  },
  props: {
    tabBarList: Array,
    default() {
      return [];
    },
  },
};
</script>

<style>
</style>