<template>
  <!--top-method下拉加载的方法 bottom-method上拉加载的方法 bottom-all-loaded是否加载完毕接收布尔值 auto-fill是否自动填充 bottomPullText上拉的时候提示的文字-->
  <mt-loadmore
    :top-method="pullBottomRefresh"
    :bottom-method="pullTopLoadData"
    :bottom-all-loaded="allLoaded"
    :auto-fill="false"
    :bottomPullText="bottomPullText"
    :TopPullText="TopPullText"
    ref="loadmore"
  >
    <!-- 插槽 -->
    <slot></slot>
  </mt-loadmore>
</template>

<script>
import { Loadmore } from "mint-ui";
export default {
  props: {
    allLoaded: {
      type: Boolean,
      default: false,
    },
    bottomPullText: {
      type: String,
      default: "上拉加载更多...",
    },
  },
  components: {
    Loadmore,
  },
  data() {
    return {
      TopPullText: "下拉刷新",
    };
  },
  methods: {
    pullTopLoadData() {
      this.$emit("pullTopLoadData", this.$refs.loadmore);
    },
    pullBottomRefresh() {
      this.$emit("pullBottomRefresh", this.$refs.loadmore);
    },
  },
};
</script>

<style>
</style>