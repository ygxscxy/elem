<template>
  <div class="tab-control flex j-c-s-a a-c">
    <div
      :class="{ 'tab-control-item': index == currentIndex }"
      @click="selectTitleClick(index)"
      v-for="(item, index) in titles"
      :key="index"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: Array,
  },
  data() {
    return {
      currentIndex: 0,
      // To: "/choisefood",
    };
  },
  methods: {
    selectTitleClick(index) {
      this.currentIndex = index;
      // console.log(this.currentIndex);
      switch (this.currentIndex) {
        case 0:
          this.$router.push("/storedetail/choisefood");
          break;
        case 1:
          this.$router.push("/storedetail/comment");
          break;
        case 2:
          this.$router.push("/storedetail/storeinfo");
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.tab-control-item {
  padding-bottom: 8px;
  border-bottom: 2px solid rgb(110, 202, 238);
  font-size: 18px;
  font-weight: 600;
}
</style>