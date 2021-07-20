<template>
  <div class="pay">
    <HeaderNav title="在线支付"></HeaderNav>
    <div class="pay-main" v-if="orderInfo">
      <div class="tip">
        <p class="countdown-title">支付剩余时间</p>
        <h3 class="countdown-text">{{ countDown }}</h3>
      </div>
      <div class="home">
        <ul class="list info-list">
          <li>
            <span class="order-name">{{ orderInfo.storeIndexData.name }}</span>
            <span class="total-price">￥{{ totalPrice }}</span>
          </li>
        </ul>
        <div class="title">在线支付</div>
        <ul class="list payment-lis">
          <li class="payment-list-item">
            <div class="icon">
              <img src="~assets/wechart.jpg" alt="" />
              <span>微信</span>
            </div>
            <i class="fa fa-check-circle selected"></i>
          </li>
        </ul>
      </div>
      <button class="btn-submit" :disabled="isTimeOut">确认支付</button>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";

export default {
  components: {
    HeaderNav,
  },
  data() {
    return {
      countDown: "00:15:00",
      // 清除定时器
      timer: null,
      isTimeOut: false,
    };
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
  mounted() {
    console.log(this.orderInfo);
  },
  methods: {
    countTimeDown() {
      let minute = 14;
      let second = 59;

      this.timer = setInterval(() => {
        second -= 1;

        if (second == "00" && minute == "00") {
          this.countDown = "订单已超时";
          clearInterval(this.timer);
          this.isTimeOut = true;
          return;
        }
        if (second == "00") {
          second = 59;
          minute -= 1;
          if (minute < 10) {
            minute = "0" + minute;
          }
        }
        if (second < 10) {
          second = "0" + second;
        }

        this.countDown = "00:" + minute + ":" + second;
      }, 1000);
    },
  },

  // 已进入到路由，就执行的东西最好写入到路由守卫中
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.countTimeDown();
    });
  },
  beforeRouteLeave(to, from, next) {
    this.countDown = "00:15:00";
    clearInterval(this.timer);
    next();
  },
};
</script>
<style scoped>
.pay {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.pay-main {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.tip {
  display: block;
  text-align: center;
  background-color: #fff;
  color: #333;
  padding: 2rem;
  line-height: 2rem;
}
.countdown-title {
  font-size: 0.88rem;
  color: #999;
}
.countdown-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
.down-text {
  height: 2rem;
  color: #333;
  font-size: 1.8rem;
}
.list {
  border-bottom: 0.5px solid #eee;
  background: #fff;
}
.info-list {
  padding: 0 1.5rem;
}
.info-list li {
  border-top: 0.5px solid #eee;
  display: flex;
  padding: 1.5rem 0;
  font-size: 1rem;
  line-height: 1rem;
  justify-content: space-between;
}
.info-list li .order-name {
  color: #333;
  display: inline-block;
  vertical-align: bottom;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
  max-width: 60%;
}
.text-highlight {
  color: #ff6000;
}
.title {
  background-color: #f5f5f5;
  font-size: 0.88rem;
  padding: 1.2rem 1.2rem 1rem;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.payment-list-item {
  border-bottom: 0.5px solid #eee;
  padding: 0.9rem 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.icon {
  display: flex;
  align-items: center;
}
.payment-list-item img {
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 20px;
}
.payment-list-item > i {
  font-size: 1.5rem;
  color: #eee;
}
.selected {
  color: #4cd964 !important;
}
.btn-submit-wrap {
  margin: 1rem auto;
  width: 90%;
}
.btn-submit {
  font-size: 1.1rem;
  line-height: 1.5rem;
  background-color: #4cd964;
  width: 100%;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
}

/* 不可点击btn */
.btn-submit[disabled] {
  background-color: #bbb !important;
}
</style>