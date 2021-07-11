<template>
  <div class="city-list" v-if="hotCityList && cityList && keys">
    <div class="top-box">
      <div class="input-group">
        <span><i class="fa fa-search"></i></span>
        <input
          type="search"
          v-model="userInputCityName"
          placeholder="输入城市名"
        />
        <span
          style="color: #4d90fe; font-weight: 700"
          @click="
            $router.push({ name: 'address', params: { cityName: currentCity } })
          "
          >取消</span
        >
      </div>
      <AddressItem
        v-if="this.searchCitysName == 0"
        class="addressItem"
        :address="currentCity"
        @currentAddressClick="selectCity({ name: currentCity })"
      ></AddressItem>
    </div>

    <div class="bottom-box" v-if="this.searchCitysName == 0">
      <WordsTable
        :keys="keys"
        :scroll="scroll"
        :citysDom="citysDom"
      ></WordsTable>
      <Scroll ref="scroll" class="city-list-scroll" :pullUpLoad="false">
        <ShowListCity
          :hotCityList="hotCityList"
          :showAllCity="showAllCity"
          class="selectCitys"
          ref="cityRef"
          @selectCity="selectCity"
        ></ShowListCity>
      </Scroll>
    </div>
    <Scroll v-else class="search-city-list-scroll">
      <SearchList
        :selectCity="selectCity"
        :searchCitysName="searchCitysName"
      ></SearchList>
    </Scroll>
  </div>
</template>

<script>
import AddressItem from "../address/addressChild/addressitem.vue";
import { getCityList } from "network/cityList/getCityList.js";

import ShowListCity from "./showList/ShowListCity.vue";
import WordsTable from "./showList/WordsTable.vue";
import SearchList from "./SearchResult/SearchList.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import fangdou from "../../uilts/fd";

export default {
  name: "cityList",
  components: {
    AddressItem,
    ShowListCity,
    Scroll,
    WordsTable,
    SearchList,
  },
  data() {
    return {
      cityList: [],
      hotCityList: {},
      citysDom: null,
      scroll: null,
      allCityName: [], //所有的城市名称
      searchCitysName: [], //搜索到的城市名称，搜索到的可能不止一个
      userInputCityName: "", //用户想要搜索的
      currentCity: "",
    };
  },
  computed: {
    showAllCity() {
      let newList = Array.from(this.cityList);
      newList.shift();
      let showCityList = newList;
      this.allCityName = showCityList.map((val1) => {
        return val1.city.map((val2) => {
          return val2.name;
        });
      });

      // console.log(showCityList);
      return showCityList;
    },
    keys() {
      // 处理key
      let keys = this.cityList.map((val) => {
        return val.key;
      });
      console.log();
      return keys;
    },
  },
  created() {
    this.CityList();
  },
  methods: {
    CityList() {
      getCityList({
        url: "/api/citylist",
        methods: "get",
      }).then((data) => {
        this.cityList = data.data;
        this.hotCityList = data.data[0];
      });
    },
    selectCity(cityItem) {
      // console.log(cityItem);
      // 跳转到选择收获地址页
      this.$router.push({
        name: "address",
        params: { cityName: cityItem.name || cityItem },
      });
    },
    searchCityName(cityName) {
      if (!cityName) {
        console.log("a");

        //如果用户没有输入，就将匹配到的城市名称列表制空
        this.searchCitysName = [];
      } else {
        console.log("aa");
        this.allCityName.forEach((element) => {
          let tempArr = element.filter((val) => {
            return val.indexOf(cityName) != -1;
          });
          this.searchCitysName.push(...tempArr);
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.currentCity = to.query.currentCity;
    });
  },
  mounted() {
    // console.log(this.$refs.cityRef.$refs.listCityRef);
    // scrollToElement()
    this.citysDom =
      this.$refs.cityRef.$refs.listCityRef.getElementsByClassName(
        "selectCitys"
      );
    this.scroll = this.$refs.scroll;

    // 实例的监听方法,并结合防抖函数
    /* this.$watch(
      "userInputCityName",
      fangdou(this.searchCityName(this.userInputCityName), 1000)
    ); */
    // this.getCurrentCityName();
  },

  watch: {
    userInputCityName() {
      // console.log(this.userInputCityName);
      this.searchCityName(this.userInputCityName);
    },
  },
};
</script>
 
<style scoped>
.search-city-list-scroll {
  position: fixed;
  top: 10px;
  bottom: 59px;
  left: 0;
  right: 0;
}
.city-list-scroll {
  position: fixed;
  top: 118px;
  bottom: 59px;
  left: 0;
  right: 0;
}
span .fa-search {
  position: relative;
  left: 35px;
  font-size: 16px;
}
.top-box {
  width: 100%;
  position: fixed;
  background-color: #fff;
  z-index: 2;
}
.input-group {
  height: 40px;
  padding: 5px;
}
.input-group input {
  width: 80%;
  height: 100%;
  background-color: rgb(224, 224, 224);
  font-size: 16px;
  border-radius: 8px;
  margin: 0px 15px 10px 10px;
  padding-left: 35px;
}
.addressItem {
  margin: 20px 0px 0px 10px;
  padding-bottom: 10px;
}
</style>