<template>
  <mt-swipe :auto="auto" class="swiper-child">
    <mt-swipe-item v-for="(item, index) in swipeImgs">
      <img :src="item" alt="" />
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
export default {
  props: {
    swipeImgs: {
      type: Array,
      default() {
        return [];
      },
    },
    auto: {
      //轮播的速度：毫秒值
      type: Number,
      default: 4000, //0:手动
    },
  },
};
</script>

<style scoped>
</style>