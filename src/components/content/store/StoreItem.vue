<template>
  <div v-if="storeItem" class="store-item">
    <!-- 商家结构 -->
    <div class="store-info">
      <!-- 左 侧 -->
      <div class="store-logo">
        <img :src="$formatImgSrc(storeItem.image_path)" alt="" />
      </div>
      <!--右侧内容 -->
      <div class="store-content">
        <!-- 第一行:商店name -->
        <div class="store-name">
          <i v-if="storeItem.is_premium">品牌</i>
          <span>{{ storeItem.name }}</span>
        </div>
        <!-- 第二行  -->
        <div class="sell-info">
          <div>
            <!-- 星级 -->
            <Star :rating="storeItem.rating"></Star>
            <!-- 评级 -->
            <span class="rating">{{ storeItem.rating }}</span>
            <!-- 月售 -->
            <span>月售{{ storeItem.recent_order_num }}</span>
            <!-- 专送 -->
            <div v-if="storeItem.delivery_mode" class="delivery">
              <span class="icon-hollow">{{storeItem.delivery_mode.text}}</span>
            </div>
          </div>
        </div>
        <!-- 第三行 -->
        <div class="money-limit">
           <div>
            <span>¥{{storeItem.float_minimum_order_amount}}起送</span>
            |
            <span>配送费¥{{storeItem.float_delivery_fee}}</span>
          </div>
          <div class="index-distanceWrap">
            <span>{{(storeItem.distance / 1000).toFixed(2)}}km</span>
            |
            <span>{{storeItem.order_lead_time}}分钟</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "./Star.vue";
export default {
  props: {
    storeItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    Star,
  },
};
</script>

<style scoped>
.store-item {
  background: #fff;
  color: #666;
  padding: 4vw 0;
  border-bottom: 0.133333vw solid #eee;
}
.store-info {
  display: flex;
  justify-content: flex-start;
  padding: 0 2.666667vw;
  align-items: stretch;
}
.store-logo {
  width: 17.333333vw;
  height: 17.333333vw;
}
.store-logo img {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
  border-radius: 0.533333vw;
}

.store-content {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
  padding-left: 2.666667vw;
  font-size: 0.66rem;
  flex-grow: 1;
}
.store-name {
  align-items: center;
  color: #333;
  font-weight: 700;
  font-size: 0.9rem;
}
.store-name i {
  background: #ffe800;
  margin-right: 1.333333vw;
  padding: 0.266667vw 0.666667vw;
  text-align: center;
  white-space: nowrap;
  font-size: 0.6rem;
}
.store-name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sell-info {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}

.sell-info .rating {
  margin-right: 1.066667vw;
}
.money-limit {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.money-limit .index-distanceWrap {
  color: #999;
}
.delivery {
  float: right;

  transform: translateX(70px);
  height: 1.5em;
  line-height: 1.5em;
  font-size: 0.6rem;
  margin-left: 1.066667vw;
}
.delivery .icon-hollow {
  color: #fff;
  background-color: #2395ff;
  padding: 2px;
  box-sizing: border-box;
}
</style>