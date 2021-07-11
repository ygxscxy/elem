<template>
  <div class="address">
    <HeaderNav title="选择收获地址" :isLeft="true" :isRight="true"></HeaderNav>
    <div class="search-city">
      <div class="search">
        <span class="city" @click="toCityListClick"
          >{{ currentCity }} <i class="fa fa-angle-down"></i
        ></span>
        <span class="shuxian"></span>
        <i class="fa fa-search"></i>
        <input
          type="search"
          name="searchCity"
          placeholder="小区/写字楼/学校等"
          v-model="userInputCity"
        />
      </div>
      <AddressItem
        :address="address"
        @currentAddressClick="getNewsAddressClick"
      ></AddressItem>
    </div>
    <Scroll class="scroll">
      <div class="show-all-position">
        <ul>
          <li
            @click="getNewsAddressClick(item)"
            v-for="item in searchAddressList"
            :key="item.name"
          >
            <h4>{{ item.name }}</h4>
            <p>{{ item.district }}{{ item.address }}</p>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";
import AddressItem from "./addressChild/addressitem.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import fangdou from "../../uilts/fd";
export default {
  name: "Address",
  data() {
    return {
      userInputCity: "",
      searchAddressList: [],
      currentCity: "",
    };
  },
  components: {
    HeaderNav,
    AddressItem,
    Scroll,
  },
  computed: {
    address() {
      if (this.$store.getters.getAddress) return this.$store.getters.getAddress;
    },
  },

  // 进入到当前路由之前要做的事情
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.currentCity = to.params.cityName;
    });
  },

  mounted() {
    // 监听userInputCity数据的变化，使用防抖，限制请求次数
    this.$watch("userInputCity", fangdou(this.searchPlace, 1000));
  },

  methods: {
    searchPlace() {
      // console.log("a");
      const self = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          // city: "全国",
          city: self.currentCity,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.userInputCity, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (status === "complete") {
            self.searchAddressList = result.tips;
            // console.log(self.searchAddressList);
          } else {
            return;
          }
        });
      });
    },
    // 事件处理
    getNewsAddressClick(item) {
      if (item) {
        // 设置新的地址
        this.$store.dispatch("setAddress", item.district + item.address);
      } else {
        this.$store.dispatch("setAddress", this.address);
      }

      // 跳转到home
      this.$router.push("/home");
    },
    toCityListClick() {
      this.$router.push("/citylist?currentCity=" + this.currentCity);
    },
  },
};
</script>

<style scoped>
.search-city {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
  margin-top: 44px;
  position: relative;
  z-index: 2;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search {
  padding: 0 10px;
}
.city {
  float: left;
  width: 22%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
  width: 70%;
}

.show-all-position {
  margin-top: 16px;
  background: #fff;
}
.show-all-position li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.show-all-position li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.scroll {
  position: absolute;
  top: 152px;
  left: 0;
  right: 0;
  bottom: 49px;
}
</style>