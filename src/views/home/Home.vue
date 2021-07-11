<template>
  <div class="home">
    <!-- 首页的头部 -->
    <div class="home-header flex a-c">
      <!-- 当前定位 -->
      <div
        class="header-icon"
        @click="
          $router.push({ name: 'address', params: { cityName: currentCity } })
        "
      >
        <div v-show="getAddress" class="header-address">
          <i class="fa fa-map-marker"></i>
          <span>{{ getAddress }}</span>
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>
    </div>
    <div
      class="home-header header-search flex j-c-c a-c"
      :class="{ 'is-top-show': isShowMask }"
    >
      <!-- 搜索框 -->
      <div class="search-box">
        <i class="fa fa-search fangdajing"></i>
        <InputComp
          class="inputSearch"
          type="search"
          placeholder="搜索美食..."
          name="search"
          :bgc="'#1296db'"
        ></InputComp>
        <span></span>
      </div>
    </div>

    <Scroll ref="scr" class="home-scroll">
      <!-- 首页内容区域 -->
      <div class="home-content">
        <!-- 轮播图区域 -->
        <div class="swiper">
          <Swipe :swipeImgs="swipeImgs"> </Swipe>
        </div>
        <!-- 分类轮播图区域 -->
        <mt-swipe :auto="0" class="entries">
          <mt-swipe-item
            class="entry_wrap"
            v-for="(classify, index) in classifyDataList"
            :key="index"
          >
            <div class="foodentry" v-for="(item, i) in classify" :key="i">
              <div class="img_wrap">
                <img :src="$formatImgSrc(item.image_hash)" alt="" />
              </div>
              <span class="f_title">
                {{ item.name }}
              </span>
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <!-- 推荐商家 -->
        <div class="recommend-store-title">推荐商家</div>
        <!-- 商家导航筛选 -->
        <HomeFilter
          @isTopShowIpt="isTopShowIpt"
          :filterData="filterData"
          @orderBy="orderBy"
          class="HomeFilter"
        ></HomeFilter>
      </div>
      <div class="store-list">
        <StoreList :homeStoreList="homeStoreList"></StoreList>
      </div>
    </Scroll>
  </div>
</template>

<script>
import InputComp from "components/common/inputComp/InputComp.vue";
import Swipe from "components/common/swipe/Swipe.vue";
import { getHomeData } from "network/home/getHomeData.js";
import HomeFilter from "components/content/filter/Filter.vue";
import StoreList from "components/content/store/StoreList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import LoadMore from "components/common/mintUi/LoadMore.vue";
export default {
  name: "home",
  components: {
    InputComp,
    Swipe,
    HomeFilter,
    StoreList,
    Scroll,
    LoadMore,
  },
  computed: {
    getAddress() {
      return this.$store.getters.getAddress;
    },
    currentCity() {
      // 当前城市的定位
      return this.getAddress.includes("省")
        ? this.getAddress.split("省")[1].split("市")[0] + "市"
        : this.getAddress.split("市")[0] + "市" ||
            this.$store.getters.getPosition.addressComponent.province;
    },
  },
  data() {
    return {
      swipeImgs: [],
      classifyDataList: [],
      // 首页商家页面：标记第几页
      currentStorePage: 0,
      // 请求商家一页多少条数据
      len: 8,
      // 首页所有商家列表
      homeStoreList: [],
      filterData: [],
      isShowMask: "",

      allLoaded: false,
      temp: null,
      bottomPullText: "上拉加载更多...",
    };
  },

  created() {
    this.getSwipeData();
    this.getHomeClassifyData();
    this.getStoreList();

    this.getHomeFilter();
  },
  methods: {
    // 获取轮播图图片数据
    getSwipeData() {
      getHomeData({
        url: "/api/homeSwipe",
      }).then((res) => {
        this.swipeImgs = res.data.swipeImgs;
      });
    },
    // 获取首页分类区域的数据
    getHomeClassifyData() {
      getHomeData({
        url: "/api/foodtype",
      }).then((res) => {
        this.classifyDataList = this.group(res.data.entries, 10);
        // console.log(this.classifyDataList);
      });
    },
    // 获取首页中的商家信息列表数据: /api/list?offset=0&len=8
    getStoreList() {
      getHomeData({
        url: "/api/list",
        params: {
          offset: this.currentStorePage,
          len: this.len,
        },
      }).then((res) => {
        this.homeStoreList.push(res.data.data);
        // this.homeStoreList = res.data.data;
        // console.log(this.homeStoreList);
        // this.temp = res.data.data;
      });
    },

    // 获取首页过滤菜单数据
    getHomeFilter() {
      getHomeData({
        url: "/api/filter",
      }).then((res) => {
        // console.log(res);
        this.filterData = res.data;
        // console.log(this.filterData);
      });
    },
    // 切分数组
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    },

    isTopShowIpt(isShowMask) {
      this.isShowMask = isShowMask;
    },
    orderBy(order_by) {
      console.log(order_by);
    },

    // 加载数据
    pullTopLoadData(loadmore) {
      if (!this.allLoaded) {
        if (this.temp) {
          // 数据为空
          this.allLoaded = true;
          this.bottomPullText = "没有更多了...";
        } else {
          this.currentStorePage += 1;
          this.getStoreList();
          // 加载完毕后重新渲染
          loadmore.onBottomLoaded();

          this.$refs.scr.refreshEnc();
        }
      }
    },
    // 刷新数据
    pullBottomRefresh(loadmore) {
      this.allLoaded = false;
      this.homeStoreList = [this.homeStoreList[0]];
      // console.log(this.homeStoreList);
      // 加载完毕
      loadmore.onTopLoaded();
    },
  },
};
</script>

<style scoped>
.home-scroll {
  position: absolute;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 49px;
}
.home .is-top-show {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 9;
}
.home-header {
  height: 44px;
  width: 100%;
  z-index: 10;
  background-color: #1296db;
}
.fangdajing {
  position: absolute;
  font-size: 16px;
  z-index: 5;
  left: 30%;
  top: 30%;
  color: rgb(182, 178, 178);
}

.header-icon .fa-map-marker {
  font-size: 18px;
}
.header-icon {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: #1296db;
  line-height: 50px;
}
.header-address {
  width: 80%;
  color: white;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 20px;
}
.right-msg {
  float: right;
  font-size: 12px;
}
.fa-chevron-right {
  font-size: 12px;
  display: inline-block;
  margin-left: 5px;
}
.inputSearch {
  border-radius: 4px;
  background-color: #fff;
}
.inputSearch >>> .input-content input {
  padding-left: 10px;
  position: relative;
  margin: 0 auto;
  left: 50px;
  font-size: 17px;
}
.search-box {
  width: 90%;
  text-align: center;
}

.header-search {
  position: sticky;
  top: 10px;
  margin-top: -1px;
  background-color: #1296db;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}

.swiper >>> .swiper-child {
  height: 150px;
}
.swiper >>> .swiper-child img {
  width: 100%;
  height: 150px;
}

.recommend-store-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.recommend-store-title:after,
.recommend-store-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.recommend-store-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}
</style>
