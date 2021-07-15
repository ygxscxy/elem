<template>
  <div class="rating-gray">
    <i
      v-for="(cls, index) in starClass"
      aria-valuetext=""
      :key="index"
      :class="'fa ' + cls"
    ></i>
  </div>
</template>

<script>
// 星星的长度
const LEN = 5;
// 星星对应的样式
const ALL_STAR = "fa-star"; //全星
const HALF_STAR = "fa-star-half-empty"; //半星
const NO_STAR = "fa-star-o"; //没有
export default {
  props: {
    rating: Number,
  },
  computed: {
    // 计算星星的样式
    starClass() {
      let res = []; //存放星星样式
      if (this.rating % 1) {
        //有半星
        // 向下取整
        let len = Math.floor(this.rating);
        //  全星
        for (let i = 0; i < LEN; i++) {
          res.push(ALL_STAR);
        }
        res.push(HALF_STAR);
      } else {
        // 没有半星
        //  全星
        for (let i = 0; i < LEN; i++) {
          res.push(ALL_STAR);
        }
      }
      // 补齐
      while (res.length < LEN) {
        res.push(NO_STAR);
      }
      return res;
    },
  },
};
</script>

<style scoped>
.rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>