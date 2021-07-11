<template>
  <div
    class="city-list-box"
    ref="listCityRef"
    v-if="showAllCity && hotCityList"
  >
    <div class="hot-city selectCitys">
      <h1 class="title">热门城市</h1>
      <ul class="hot-city-item flex">
        <li
          @click="$emit('selectCity', item)"
          v-for="(item, index) in hotCityArr"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <!-- 所有的城市 -->
    <div class="all-city-list-box">
      <div
        class="all-city-item selectCitys"
        v-for="(item, index) in showAllCity"
        :key="index"
      >
        <h1 class="title">{{ item.key }}</h1>
        <ul class="city-child" v-for="(chlidCity, i) in item.city" :key="i">
          <li @click="$emit('selectCity', chlidCity)">{{ chlidCity.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotCityList: {
      type: Object,
      default() {
        return {};
      },
    },
    showAllCity: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    hotCityArr() {
      return this.hotCityList.hotcity;
    },
  },
};
</script>

<style scoped>
.city-list-box {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
}
.hot-city-item {
  flex-wrap: wrap;
}
.hot-city-item li {
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  text-align: center;
  width: 40%;
  font-size: 16px;
  margin: 10px;
}
.title {
  color: rgb(53, 52, 52);
  padding: 15px 0;
  font-size: 18px;
}

.all-city-item li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.city-child li {
  color: rgb(139, 139, 139);
}
</style>