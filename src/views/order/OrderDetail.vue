<template>
  <div class="orderInfo" :class="{ 'init-height': userInfo }">
    <HeaderNav
      :isLeft="true"
      title="订单详情"
      :isShowBackTxt="false"
    ></HeaderNav>

    <div class="view-body" v-if="orderItemDetail && orderInfo">
      <div class="status-head">
        <div class="status-text">订单已送达</div>
        <div class="status-title">
          感谢您对粥可温(西湖店)的信任，期待再次光临
        </div>
      </div>
      <div class="restaurant-card">
        <SelectFoodsList
          v-if="orderInfo"
          :orderInfo="orderInfo"
        ></SelectFoodsList>
      </div>
      <!-- 配送信息 -->
      <div class="detail-card">
        <div class="title">配送信息</div>
        <ul class="card-list">
          <li class="list-item">
            <span>送达时间：</span>
            <span>{{ formatDate(new Date()) }}</span>
          </li>
          <li class="list-item" v-if="userInfo">
            <span>送货地址：</span>
            <div class="content">
              <span
                >{{ userInfo.currentAddress.name
                }}{{ userInfo.currentAddress.sex }}</span
              >

              <span>{{ userInfo.currentAddress.phone }}</span>
              <span
                >{{ userInfo.currentAddress.address
                }}{{ userInfo.currentAddress.door }}</span
              >
            </div>
          </li>
        </ul>
      </div>
      <!-- 订单信息 -->
      <div class="detail-card">
        <div class="title">订单信息</div>
        <ul class="card-list">
          <li class="list-item">
            <span>订单号：</span>
            <span>{{ orderItemDetail.item_id }}</span>
          </li>
          <li class="list-item" v-if="userInfo">
            <span>支付方式：</span>
            在线支付
          </li>
          <li class="list-item" v-if="userInfo">
            <span>下单时间：</span>
            {{
              formatDate(
                new Date().getTime() -
                  parseInt(orderInfo.storeIndexData.order_lead_time) * 60 * 1000
              )
            }}
          </li>
          <li class="list-item" v-if="userInfo">
            <span>订单备注：</span>
            <span class="remark">
              {{ customremarks }}
              {{ userInfo.selectTableWareCount }}餐具
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";
import SelectFoodsList from "../settlement/SelectFoodsList.vue";
import formatDate from "../../uilts/formatDate";

export default {
  name: "orderdetail",
  components: {
    HeaderNav,
    SelectFoodsList,
  },
  computed: {
    userInfo() {
      if (this.$store.getters.getUserInfo)
        return this.$store.getters.getUserInfo;
      else return null;
    },

    customremarks() {
      if (this.$store.getters.getCustomRemarks)
        return this.$store.getters.getCustomRemarks;
      else return "";
    },
  },
  data() {
    return {
      orderItemDetail: null,
      orderInfo: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params) {
        vm.orderItemDetail = to.params.orderItemDetail;
        vm.orderInfo = to.params.orderInfo;
        // console.log(vm.orderDetail);
      }
    });
  },
  methods: {
    // 计算送达时间
    computedArriveTime(order_time) {
      let new_date = new Date();
      new_date.setMinutes(new_date.getMinutes() + order_time);
      return new_date.getHours() + ":" + new_date.getMinutes();
    },
    formatDate(time) {
      return formatDate(time);
    },
  },
};
</script>

<style scoped>
.init-height {
  height: 100vh;
}
.orderInfo {
  width: 100%;
  padding-bottom: 49px;
  box-sizing: border-box;
  padding-top: 44px;
  background-color: rgb(238, 236, 238);
}

.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.status-head {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}
.status-head .status-text {
  margin: 0 auto 4.266667vw;
  color: #333;
  font-size: 1.5rem;
  text-align: left;
  padding: 4.266667vw 0;
  border-bottom: 0.133333vw solid #ddd;
}
.status-head .status-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.866667vw;
}

.restaurant-card {
  margin: -10px 2.666667vw 2.666667vw 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}

/* 配送和订单 */
.detail-card {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}

.status-head .status-text {
  margin: 0 auto 4.266667vw;
  color: #333;
  font-size: 1.5rem;
  text-align: left;
  padding: 4.266667vw 0;
  border-bottom: 0.133333vw solid #ddd;
}
.status-head .status-title {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.866667vw;
}
.title {
  font-size: 1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  line-height: 10.4vw;
}
.list-item {
  color: #6e6e6e;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: baseline;
  line-height: 4.8vw;
  font-size: 0.88rem;
  padding: 3.2vw 8vw 2.666667vw 0;
}
.content {
  line-height: 1.5em;
  padding-bottom: 2.666667vw;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.list-item span:first-child {
  flex: none;
}
.remark {
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
}
</style>