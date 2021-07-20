<template>
  <div class="store-index" v-if="storeIndexData.rst">
    <!-- 头部 -->
    <div class="store-header">
      <div class="nav-bg">
        <span class="img-premium" v-if="storeIndexData.rst.is_premium"
          >品牌</span
        >
        <img
          v-if="storeIndexData.rst"
          :src="$formatImgSrc(storeIndexData.rst.shop_sign.image_hash)"
          alt=""
        />
      </div>
      <div class="nav-back" @click="$router.go(-1)">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div class="store-image" v-if="storeIndexData.rst">
        <img :src="$formatImgSrc(storeIndexData.rst.image_path)" alt="" />
      </div>
    </div>
    <!-- 点击标题弹窗 -->
    <div class="index-rst">
      <div class="rst-name" @click="showPopupClick">
        <h2>{{ storeIndexData.rst.name }}</h2>
        <i class="fa fa-caret-right"></i>
      </div>
      <!-- 商家信息+弹窗组件 -->
      <Popup :pv="pv" class="popup">
        <div class="popup-box">
          <h2>
            <i v-if="storeIndexData.rst.is_premium" class="popup-premium"
              >品牌</i
            >
            <span class="popup-title">{{ storeIndexData.rst.name }}</span>
          </h2>
          <ul class="popup-store-rating flex j-c-s-a">
            <li>
              <h3>{{ storeIndexData.rst.rating }}</h3>
              <p>评分</p>
            </li>
            <li>
              <h3>{{ storeIndexData.rst.recent_order_num }}</h3>
              <p>月售</p>
            </li>

            <li v-if="storeIndexData.rst.delivery_mode">
              <h3>{{ storeIndexData.rst.delivery_mode.text }}</h3>
              <p>约{{ storeIndexData.rst.order_lead_time }}分钟</p>
            </li>
            <li>
              <h3>{{ storeIndexData.rst.float_delivery_fee }}元</h3>
              <p>配送费</p>
            </li>
            <li>
              <h3>{{ (storeIndexData.rst.distance / 1000).toFixed(1) }}</h3>
              <p>距离</p>
            </li>
          </ul>
          <div class="notice">
            <h3 class="notice-title">
              <span>公告</span>
            </h3>
            <p class="notice-info">{{ storeIndexData.rst.promotion_info }}</p>
          </div>
        </div>
      </Popup>
      <!-- 商家信息展示 -->
      <div class="store-sell-msg">
        <span>评分{{ storeIndexData.rst.rating }}</span>
        <span>月售{{ storeIndexData.rst.recent_order_num }}</span>
        <span>蜂鸟专送约{{ storeIndexData.rst.order_lead_time }}分钟</span>
      </div>
      <!-- 优惠信息 -->
      <div class="store-index-discount"></div>
      <!-- 公告 -->
      <Discount :activities="storeIndexData.rst.activities"></Discount>
      <div class="store-index-notice">
        <p>
          <span>公告：</span
          >{{
            storeIndexData.rst.promotion_info
          }}+❤️温馨提示：天气变冷，需要加热的，请备注加热，❤️健康上新❤️超值满减
        </p>
      </div>
    </div>
    <div class="store-index-content">
      <TabControl :titles="titles"></TabControl>
    </div>
    <!-- 缓存组件 -->
    <keep-alive>
      <router-view :storeIndexData="storeIndexData"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { getDetailData, FormatDetailData } from "network/detail/detail.js";
import Popup from "components/content/popup/Popup.vue";
import Discount from "components/content/discount/Discount.vue";
import TabControl from "components/common/tabControl/TabControl.vue";
export default {
  name: "storedetail",
  components: {
    Popup,
    Discount,
    TabControl,
  },
  data() {
    return {
      storeIndexData: {},
      pv: false, //是否显示弹窗,
      titles: ["点餐", "评论", "商家"],
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  methods: {
    getData() {
      getDetailData({
        url: "/api/detail",
        params: {
          id: "162958680",
        },
      })
        .then((val) => {
          // console.log(val.data);
          // 添加一个新的属性
          val.data.recommend.body.forEach((recommend) => {
            recommend.items.forEach((item) => {
              item.count = 0;
            });
          });
          val.data.menu.body.forEach((item) => {
            item.foods.forEach((food) => {
              food.count = 0;
            });
          });
          this.storeIndexData = new FormatDetailData(val.data);
          console.log(this.storeIndexData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 是都显示弹窗
    showPopupClick() {
      this.pv = !this.pv;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.store-index-content {
  position: sticky;
  top: 0px;
  z-index: 2;
  background-color: #fff;
  padding-top: 10px;
}
.popup-store-rating li h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}
.popup-store-rating li p {
  font-size: 12px;
  color: #999;
}
.popup-store-rating {
  margin: 20px 0;
}
.popup-title {
  display: inline-block;
  margin-left: 10px;
}
.popup {
  border-radius: 8px;
  border: none;
  padding: 30px 10px;
}
.notice-title span {
  display: inline-block;
  margin-bottom: 15px;
  color: #999;
}
.notice-title > span::before,
.notice-title > span::after {
  content: "";
  display: inline-block;
  width: 30px;
  border-bottom: 2px solid pink;
  margin-top: 10px;
  transform: translateY(-3px);
}
.img-premium {
  background-color: rgb(255, 228, 53);
  position: absolute;
  top: 40%;
  font-size: 12px;
  padding: 1px;
  left: 145px;
  z-index: 2;
}
.popup-premium {
  background-color: rgb(255, 228, 53);
  font-size: 12px;
  padding: 1px;
}
.popup-box {
  width: 300px;
  text-align: center;
}
.popup-box h2 span {
  font-size: 24px;
  font-weight: 900;
}
.store-index {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.store-header {
  position: relative;
}
.nav-bg img {
  width: 100%;
  height: 26.666667vw;
}
.nav-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 26.666667vw;
  background: rgba(0, 0, 0, 0.5);
}
.nav-back i {
  color: #fff;
  font-size: 1.3rem;
  margin-left: 1.333333vw;
  margin-top: 1.333333vw;
}
.store-image {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -10vw;
  margin-top: 11vw;
}
.store-image img {
  width: 20vw;
  height: 20vw;
  border-radius: 0.8vw;
}

.index-rst {
  padding: 6vw 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: inset 0 -0.666667vw 0.666667vw hsla;
}
.index-rst .rst-name {
  flex: 1;
  width: 72vw;
  font-size: 1.3rem;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 2.666667vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.6vw 0;
}
.rst-name h2 {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

.index-rst .store-sell-msg {
  white-space: nowrap;
  height: 3.2vw;
  margin-top: 1.733333vw;
  color: #666;
  text-align: center;
  font-size: 0.6rem;
}
.store-sell-msg span {
  margin: 0 3px;
}
.index-rst .store-index-notice {
  width: 80vw;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2.266667vw auto 2.666667vw;
  padding: 0;
  white-space: nowrap;
}
</style>