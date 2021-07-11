<template>
  <div class="tab-bar-item" v-if="tabBarItem">
    <router-link
      tag="div"
      class="flex flex-column a-c"
      :to="tabBarItem.path"
      active-class="is-select"
    >
      <div class="tab-bar-icon">
        <i :class="'fa fa-' + tabBarItem.tabBarImg"></i>
      </div>
      <div class="tab-bar-text">{{ tabBarItem.tabBarItemText }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "tabBarItem",
  props: {
    tabBarItem: Object,
    default() {
      return {};
    },
  },
};
</script>

<style scoped>
.tab-bar-icon {
  width: 20px;
  height: 20px;
  margin: 5px 0 2px 0;
}
.tab-bar-icon i {
  font-size: 16px;
}
.tab-bar-text {
  color: inherit;
  font-size: 10px;
  line-height: 1;
}
.router-link-exact-active {
  color: #009eef;
}
</style>