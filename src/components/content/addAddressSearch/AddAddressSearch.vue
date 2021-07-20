<template>
  <div class="address-search" v-if="isShowSearchAddress && isClose">
    <!-- 头部 -->
    <HeaderNav
      title="搜索地址"
      :isLeft="true"
      :isShowBackTxt="false"
    ></HeaderNav>
    <div class="search-view flex a-c">
      <div class="search-input flex a-c">
        <i class="fa fa-search"></i>
        <input
          type="search"
          v-model="user_search"
          placeholder="请输入小区/写字楼/学校等"
        />
      </div>
      <div class="search-btn">
        <span class="search" @click="$emit('closeAddressClick')">取消</span>
      </div>
    </div>
    <div class="search-city-list">
      <ul class="search-list">
        <li
          class="search-item"
          v-for="(item, index) in searchCitys"
          :key="item.id"
          @click="choiceAddressClick(item)"
        >
          <p class="search-row-title">{{ item.name }}</p>
          <p class="search-row-location">
            {{ item.district }}{{ item.address }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";
import fangdou from "../../../uilts/fd";
export default {
  props: {
    isShowSearchAddress: Boolean,
  },
  components: {
    HeaderNav,
  },
  data() {
    return {
      user_search: "",
      searchCitys: [],
      isClose: true,
    };
  },
  computed: {
    presentCity() {
      if (this.$store.getters.getPosition.addressComponent) {
        return this.$store.getters.getPosition.addressComponent.city;
      } else {
        return "全国";
      }
    },
  },
  mounted() {
    this.$watch("user_search", fangdou(this.searchAddress, 1000));
  },
  methods: {
    // 请求高德aip
    searchAddress() {
      console.log(this.presentCity);
      // console.log(this.user_search);
      // 调用高德地图Api
      let that = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: that.presentCity || "全国",
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(that.user_search, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          that.searchCitys = result.tips;
          // console.log(result);
        });
      });
    },
    choiceAddressClick(item) {
      this.$emit("choiceAddress", item);
      console.log(item);
    },
  },
};
</script>

<style scoped>
.search-btn {
  margin-top: 8px;
  text-align: center;
  border-radius: 3px;
  background-color: rgb(0, 151, 255);
  width: 15%;
  line-height: 30px;
  height: 80%;
  margin-left: 5px;
  color: rgb(255, 255, 255);
}
.search-input i {
  padding: 3px 5px;
}
.search-input input {
  width: 100%;
}
.search-input {
  box-sizing: border-box;
  width: 80%;
  padding: 3px;
  height: 30px;
  line-height: 30px;
  background-color: rgb(245, 245, 245);
  margin-left: 10px;
  margin-top: 10px;
}
.address-search {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: scroll;
}
.search-view {
  box-sizing: border-box;
  padding-top: 44px;
}

.search-list {
  padding-left: 4vw;
}
.search-item {
  border-bottom: 0.266667vw solid #eee;
  padding: 2.533333vw 0 3.333333vw;
  line-height: 1.2;
}
.search-row-title {
  color: #333;
  font-size: 1rem;
}
.search-row-location {
  color: #999;
  font-size: 0.866rem;
}
</style>