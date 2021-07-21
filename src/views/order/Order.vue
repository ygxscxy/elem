<template>
  <div>
    <div class="order" v-if="orderInfo">
      <div
        class="order-card-body"
        v-for="item in orderInfo.selectFoods"
        :key="item.item_id"
      >
        <div
          class="order-card-wrap"
          @click="
            $router.push({
              name: 'orderdetail',
              params: { orderItemDetail: item, orderInfo },
            })
          "
        >
          <img :src="$formatImgSrc(item.image_path)" alt="" />
          <div class="order-card-content">
            <div class="order-card-head">
              <div class="title">
                <a>
                  <span>{{ orderInfo.storeIndexData.name }}</span>
                  <i class="fa fa-angle-right"></i>
                </a>
                <p>订单已完成</p>
              </div>
              <p class="date-time">{{ formatDate(new Date()) }}</p>
            </div>
            <div class="order-card-detail">
              <p class="detail">{{ item.name }}</p>
              <p class="price">￥{{ item.specfoods[0].price }}</p>
            </div>
          </div>
        </div>
        <div class="order-card-bottom">
          <button
            class="cardbutton"
            @click="$router.push('/storedetail/choisefood')"
          >
            再来一单
          </button>
        </div>
      </div>
    </div>
    <!-- 没有订单 -->
    <div v-else class="no-order">
      <img src="~assets/no-offsets.gif" alt="" />
      <h1>近段时间无外卖订单记录</h1>
      <p>查看之前外面订单</p>
    </div>
  </div>
</template>

<script>
import formatDate from "../../uilts/formatDate";
export default {
  data() {
    return {};
  },
  computed: {
    orderInfo() {
      if (this.$store.getters.getOrderInfo)
        return this.$store.getters.getOrderInfo;
      else null;
    },
    totalPrice() {
      return (
        parseInt(this.orderInfo.totalPrice) +
        parseInt(this.orderInfo.storeIndexData.float_delivery_fee)
      ).toFixed(2);
    },
  },
  methods: {
    // 格式化时间戳
    formatDate(time) {
      return formatDate(time);
    },
  },
};
</script>

<style scoped>
.no-order img {
  width: 300px;
  height: 300px;
}
.no-order p {
  font-size: 14px;
  color: rgb(167, 164, 164);
}
.no-order {
  text-align: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(245, 245, 245);
}
.no-order h1 {
  font-size: 20px;
  margin-top: 18px;
  margin-bottom: 10px;
}
.order {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: rgb(237, 236, 237);
  margin-bottom: 2.666667vw;
}
.order-card-body {
  margin-top: 2.666667vw;
  background-color: #fff;
  padding: 3.733333vw 0 0 4vw;
}
.order-card-wrap {
  display: flex;
}
.order-card-wrap > img {
  height: 8.533333vw;
  border-radius: 0.533333vw;
  border: 1px solid #eee;
  width: 8.533333vw;
  margin-right: 2.666667vw;
}
.order-card-content {
  flex: 1;
}
.order-card-head {
  border-bottom: 1px solid #eee;
  padding-right: 3.466667vw;
  padding-bottom: 2.666667vw;
}
.order-card-head .title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-card-head .title > a {
  font-size: 1rem;
  line-height: 1.5em;
  color: #333;
  text-decoration: none;
}
.order-card-head .title > a > span {
  display: inline-block;
  max-width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order-card-head .title > a > i {
  margin-left: 1.333333vw;
  color: #ccc;
  vertical-align: super;
}
.order-card-head .title > p {
  font-size: 0.8rem;
  text-align: right;
  color: #333;
  max-width: 14em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.date-time {
  font-size: 0.6rem;
  color: #999;
}
.order-card-detail {
  display: flex;
  justify-content: space-between;
  padding: 4vw 3.466667vw 4vw 0;
  font-size: 0.8rem;
}
.order-card-detail .detail {
  color: #666;
  display: flex;
  align-items: center;
}
.order-card-detail .price {
  flex-basis: 16vw;
  text-align: right;
  color: #333;
  font-weight: 700;
}
.order-card-bottom {
  display: flex;
  border-top: 1px solid #eee;
  padding: 2.666667vw 4.266667vw;
  justify-content: flex-end;
}
.cardbutton {
  padding: 1.333333vw 2.666667vw;
  border: 1px solid #2395ff;
  border-radius: 0.533333vw;
  background-color: transparent;
  outline: none;
  font-size: 0.8rem;
  color: #2395ff;
  margin-left: 2vw;
}
</style>