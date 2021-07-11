<template>
  <div>
    <div class="aaa"></div>
    <div class="shop">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadmore"
      >
        <ul ref="ul1">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allLoaded: false,
    };
  },
  methods: {
    loadTop() {
      this.$refs.loadmore.onTopLoaded();
    },

    loadBottom() {
      for (let i = 0; i < 10; i++) {
        let li = document.createElement("li");
        li.innerText = "aaaa";
        this.$refs.ul1.append(li);
      }
      // this.allLoaded = true; // 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
  },
};
</script>

<style>
.aaa {
  background-color: red;
  height: 95px;
  width: 100%;
}
</style>