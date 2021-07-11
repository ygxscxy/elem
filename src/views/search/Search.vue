<template>
  <div class="search-view">
    <HeaderNav :isLeft="true" title="搜索"> </HeaderNav>
    <div class="search-box">
      <form>
        <i class="fa fa-search"></i>
        <input
          type="search"
          v-model="inputContent"
          placeholder="输入商品信息"
          name=""
          id=""
        />
        <button @click.prevent="searchClick">搜索</button>
      </form>
    </div>

    <!-- 展示搜索到的商家 -->
    <Scroll class="SearchStore-scroll" v-if="!isShowDetailStoreItem">
      <div class="empty-box" v-if="isEmpty">
        <img
          src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png"
          alt=""
        />
        <div class="empty-txt">
          <h2>附近没有搜索结果</h2>
          <p>换个关键词试试吧~</p>
        </div>
      </div>
      <SearchStore
        v-else
        :searchData="searchData"
        @storeItemClick="storeItemClick"
      ></SearchStore>
    </Scroll>
    <div class="detail-store-item" v-else>
      <SearchFilter
        :filterData="filterData"
        @isTopShowIpt="isTopShowIpt"
      ></SearchFilter>

      <div
        class="store-list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <StoreList :homeStoreList="homeStoreList"></StoreList>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";
import fangdou from "../../uilts/fd";
import getSearchData from "network/search/getSearchData.js";
import SearchStore from "./searchStore/SearchStore.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import SearchFilter from "components/content/filter/Filter.vue";
import { getHomeData } from "network/home/getHomeData.js";
import StoreList from "components/content/store/StoreList.vue";
// import { InfiniteScroll } from "mint-ui";
export default {
  components: {
    HeaderNav,
    SearchStore,
    Scroll,
    SearchFilter,
    StoreList,
  },
  data() {
    return {
      inputContent: "",
      searchData: {},
      isEmpty: false,
      isShowDetailStoreItem: false,
      filterData: {},
      loading: false,
      homeStoreList: [],
      currentStorePage: 1,
      len: 8,
    };
  },
  created() {
    this.getHomeFilter();
    this.getStoreList();
  },
  mounted() {
    // 监听用户输入，并添加防抖
    this.$watch("inputContent", fangdou(this.userSearch, 1000));
  },
  methods: {
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
        console.log(this.homeStoreList);
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
    isTopShowIpt(isShowMask) {
      this.isShowMask = isShowMask;
    },
    userSearch() {
      this.currentStorePage = 1;
      this.homeStoreList = [];
      this.isEmpty = false;
      this.isShowDetailStoreItem = false;

      if (this.inputContent) {
        getSearchData({
          url: "/api/searchGoods",
          params: {
            name: this.inputContent,
          },
        })
          .then((val) => {
            this.searchData = val.data[0];
            // console.log(this.searchData);
          })
          .catch((err) => {
            this.searchData = {};
          });
      } else {
        this.searchData = {};
      }
    },
    searchClick() {
      // if (!this.inputContent) return;
      if (this.inputContent && this.searchData) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    },
    storeItemClick() {
      console.log("aa");
      this.isShowDetailStoreItem = true;
    },
    loadMore() {
      if (this.currentStorePage <= 3) {
        this.currentStorePage++;
        this.getStoreList();
        console.log(this.currentStorePage);
      } else {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.search-view {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.search-box {
  position: relative;
  z-index: 1;
  margin-top: 44px;
  background: #fff;
  padding: 0 4.266667vw;
}
.search-box form {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
form .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
}
form input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
}
form button {
  outline: none;
  border: none;
  color: #333;
  font-size: 0.426667rem;
  background: #fff;
  font-weight: 700;
  margin-left: 2.933333vw;
  font-size: 14px;
}

.SearchStore-scroll {
  position: absolute;
  top: 96px;
  left: 0;
  right: 0;
  bottom: 49px;
}

.empty-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: center;
}
.empty-box img {
  width: 35vw;
  height: 35vw;
}
.empty-box h2 {
  color: #666;
  font-size: 1rem;
  margin: 12vw 0 2vw 0;
}
.empty-box p {
  color: #999;
}
</style>