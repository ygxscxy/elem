<template>
  <div v-if="storeInfo" class="store-info">
    <div class="info-main">
      <img :src="$formatImgSrc(storeInfo.header_image)" alt="" />
      <h3>{{ storeInfo.title }}</h3>

      <p v-for="item in storeInfo.brand_intros">{{ item.brief }}</p>
      <div>查看品牌故事</div>
    </div>
  </div>
</template>

<script>
import { getHomeData } from "network/home/getHomeData.js";

export default {
  name: "storeinfo",
  data() {
    return {
      storeInfo: {},
    };
  },
  created() {
    this.getStoreInfoData();
  },
  methods: {
    getStoreInfoData() {
      getHomeData({
        url: "/api/merchants",
      }).then((res) => {
        // console.log(res.data);
        this.storeInfo = res.data;
      });
    },
  },
};
</script>

<style scoped>
.store-info .info-main {
  margin-bottom: 2.666667vw;
  padding: 4.266667vw 4vw 4vw;
  font-size: 0.9rem;
  background-color: #fff;
  color: #666;
  border-bottom: 1px solid #eee;
}
.info-main > img {
  width: 92vw;
  height: 52vw;
  margin-bottom: 4.266667vw;
}
.info-main > h3 {
  color: #333;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1.066667vw;
}
.info-main > p {
  height: 40px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.info-main > div {
  margin: 4vw 0 -4vw;
  text-align: center;
  font-size: 0.346667rem;
  padding: 4vw 0;
}
</style>