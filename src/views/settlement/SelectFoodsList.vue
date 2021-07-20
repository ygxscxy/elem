<template>
  <div class="select-food-list" v-if="orderInfo">
    <div class="food-list-main" v-if="orderInfo.selectFoods">
      <!-- 第一行 -->
      <div class="store-title">
        <h3>{{ orderInfo.storeIndexData.name }}</h3>
      </div>
      <ul class="food-list-body">
        <li
          class="food-item flex a-c"
          v-for="item in orderInfo.selectFoods"
          :key="item.item_id"
        >
          <div class="food-img">
            <img :src="$formatImgSrc(item.image_path)" alt="" />
          </div>
          <div class="food-name">
            <p>{{ item.name }}</p>
          </div>
          <div class="food-count">
            <span>x {{ item.count }}</span>
          </div>
          <div class="food-price">
            <span>￥{{ item.specfoods[0].price }}</span>
          </div>
        </li>
      </ul>
      <div class="distribution">
        <span class="txt">配送费</span>
        <span class="price"
          >￥{{ orderInfo.storeIndexData.float_delivery_fee }}</span
        >
      </div>
      <div class="totalPrice">
        <a
          href="https://h5.ele.me/service/#discount?spm=a2ogi.12117550.favorabledirections.1"
        >
          优惠说明</a
        >
        <span class="little-price">
          <i>小计 ￥</i>

          <span>{{
            (
              parseInt(orderInfo.totalPrice) +
              parseInt(orderInfo.storeIndexData.float_delivery_fee)
            ).toFixed(2)
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderInfo: Object,
  },
  components: {},
  mounted() {
    // console.log(this.orderInfo);
  },
};
</script>

<style scoped>
.little-price span {
  font-size: 18px;
}
.little-price i {
  font-size: 12px;
}
.totalPrice .little-price {
  float: right;
  margin-right: 5px;
}
.totalPrice a {
  font-size: 12px;
  color: rgb(184, 180, 180);
  text-decoration: none;
}
.totalPrice {
  margin-top: 15px;
}
.distribution {
  height: 35px;
  border-bottom: 1px solid #eee;
}
.distribution .price {
  float: right;
  margin-right: 5px;
}
.distribution .txt {
  float: left;
}
.food-item {
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.food-price {
  width: 20%;
  text-align: center;
}
.food-count {
  width: 30%;
  text-align: center;
}
.food-name {
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 50%;
  margin-left: 10px;
}
.food-list-body {
  margin-top: 15px;
}
.food-img img {
  width: 40px;
  height: 40px;
}
.store-title {
  border-bottom: 1px solid rgb(206, 205, 205);
}
.store-title h3 {
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 15px;
}
.food-list-main {
  width: 95%;
  background-color: #fff;
  position: relative;
  left: 50%;
  padding: 20px;
  transform: translateX(-50%);
}
.select-food-list {
  width: 100%;
  margin-top: 30px;
}
</style>