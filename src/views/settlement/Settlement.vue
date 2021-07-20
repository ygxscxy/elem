<template>
  <div class="settlement" v-if="orderInfo">
    <HeaderNav title="确认订单" :isLeft="true"></HeaderNav>
    <div class="settlement-box" :class="{'have-food':orderInfo==undefined}">
      <!-- 收货地址 -->
      <div class="address-box" >
        <p class="title">
          订单配送至
          <span class="address-tag" v-if="currentAddress">{{
            currentAddress.tag
          }}</span>
        </p>
        <p  class="address-detail" @click="intoAddAddress">
          <span v-if="!isHaveAddress && !currentAddress">新增收货地址</span>
          <span
            class="currentAddress-address"
            v-else-if="!isHaveAddress && currentAddress"
            >{{ currentAddress.address }}</span
          >
          <span v-else @click="$router.push('/myaddress')">请选择收货地址</span>
          <i class="fa fa-angle-right"></i>
          <p class="user-phone" v-if="currentAddress">
            <span >{{currentAddress.name}}({{currentAddress.sex}})</span>
            <span >{{ currentAddress.phone }}</span>
          </p>

        </p>
      </div>
      <!-- 配送信息 -->
      <div class="basic-info-box">
        <!-- 上半部分 -->
        <div class="arrive-time flex a-c">
          <!-- 左侧 -->
          <div class="arrive-txt">
            <p>送达时间</p>
            <p v-if="orderInfo">{{orderInfo.storeIndexData.delivery_mode.text}}</p>
          </div>
          <!-- 右侧 -->
          <div class="arrive-right">
            <p>
              <span v-if="orderInfo">尽快送达({{computedArriveTime(orderInfo.storeIndexData.order_lead_time)}}送达)</span>
              <i class="fa fa-angle-right"></i>
            </p>
          </div>
        </div>
        <!-- 下半部分 -->
        <div class="pay-way">
          <!-- 左侧 -->
          <span class="way">支付方式</span>
          <span class="pay">在线支付</span>
        </div>
      </div>
      <!-- 订餐内容 -->
      <SelectFoodsList  :orderInfo="orderInfo"></SelectFoodsList>
     <!-- 备注 -->
      <div class="checkout-remarks" v-if="orderInfo!==undefined" >
        <Remarks  @click.native="isShowTableWare=true" remarksName="餐具分数" :placeholder="selectTableWareCount"></Remarks>
        <Remarks @click.native="$router.push('/remarksinfo')" remarksName="订单备注" :placeholder="customremarks"></Remarks>
        <Remarks remarksName="发票信息" placeholder="不需要开发票"></Remarks>
      </div>
    </div>
    <!-- 选择餐具的弹窗 -->
    <TableWare @close='close' @comfirm='comfirm' :isShowTableWare="isShowTableWare"></TableWare>

    <!-- 底部去支付 -->
    <div class="floor-bar">
      <span class="all-price" v-if="orderInfo">￥{{totalPrice}}</span>
      <span v-if="orderInfo" class="discount">已优惠￥15</span>
      <span @click="goPay" class="go-pay">去支付</span>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import HeaderNav from "components/common/header/HeaderNav.vue";
import { getHomeData } from "network/home/getHomeData.js";
import SelectFoodsList from "./SelectFoodsList.vue";
import Remarks from "./Remarks.vue";
import TableWare from "../../components/content/tableWare/TableWare.vue";
export default {
  name: "settlement",
  components: {
    HeaderNav,
    SelectFoodsList,
    Remarks,
    TableWare,
  },
  data() {
    return {
      // selectFoods: [],
      isHaveAddress: false,
      // address: null,
      isShowTableWare: false,
      selectTableWareCount: "未选择",
    };
  },
  computed: {
    currentAddress() {
      return this.$store.getters.getCurrentAddress;
    },
    orderInfo() {
      if (this.$store.getters.getOrderInfo)
        return this.$store.getters.getOrderInfo;
      else null;
    },
    customremarks() {
      if (this.$store.getters.getCustomRemarks)
        return this.$store.getters.getCustomRemarks;
      else return "口味、偏好";
    },
    totalPrice() {
      return (
        parseInt(this.orderInfo.totalPrice) +
        parseInt(this.orderInfo.storeIndexData.float_delivery_fee)
      ).toFixed(2);
    },
  },
  mounted() {
    // console.log(this.orderInfo);
  },
  methods: {
    goPay() {
      if (!this.currentAddress) {
        Toast({
          message: "请选择收货地址",
          position: "bottom",
          duration: 2000,
        });
        return;
      } else if (this.orderInfo.selectFoods.length == 0) {
        Toast({
          message: "请选择商品",
          position: "bottom",
          duration: 2000,
        });
        return;
      }
      this.$router.push("/pay");
    },
    comfirm(item) {
      this.selectTableWareCount = item;
      this.isShowTableWare = false;
    },
    close() {
      this.isShowTableWare = false;
    },
    getData() {
      getHomeData({
        url: "/api/getalladdress",
        params: {
          user_id: localStorage.isLogin,
        },
      }).then((res) => {
        // console.log(res.data);
        if (res.data.myAddress.length == 0) {
          this.isHaveAddress = false;
        } else {
          if (!this.currentAddress) {
            this.isHaveAddress = false;
          } else {
            this.isHaveAddress = true;
          }

          // this.address = res.data.myAddress[0];
        }
      });
    },
    intoAddAddress() {
      if (this.isHaveAddress) this.$router.push("/addaddress");
      else this.$router.push("/myaddress");
    },
    // 计算送达时间
    computedArriveTime(order_time) {
      let new_date = new Date();
      new_date.setMinutes(new_date.getMinutes() + order_time);
      return new_date.getHours() + ":" + new_date.getMinutes();
    },
  },
  // 路由传参获取到的数据无法持久化存储,需要借助于vuex
  /* beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params) {
        console.log(to.params);
        vm.selectFoods = to.params.selectFoods;
      }
    });
  }, */
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.currentAddress) {
        vm.getData();
      }
    });
  },
};
</script>

<style scoped>
.go-pay {
  float: right;
  color: white;
  background-color: rgb(0, 224, 103);
  width: 100px;
  text-align: center;
}
.discount {
  font-size: 12px;
  color: #a9abad;
  padding-left: 5px;
  margin-left: 5px;
  border-left: 2px solid #a9abad;
}
.all-price {
  color: white;
  font-size: 18px;
  padding: 5px;
}
.floor-bar {
  position: fixed;
  bottom: 0;
  height: 49px;
  z-index: 999;
  width: 100%;
  line-height: 49px;
  background-color: rgb(60, 60, 60);
}
.have-food {
  height: 100vh;
}
.checkout-remarks {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 95vw;
  margin-top: 10px;
  /* background-color: red; */
  background-color: #fff;
  padding-bottom: 49px;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
}
.address-tag {
  border: rgb(255, 255, 255, 0.5) solid 1px;
  font-size: 10px;
  transform: scale(0.5); /* font-size: 16*0.5=8px  */
}
.user-phone span:nth-of-type(1) {
  margin-right: 5px;
}
.user-phone {
  font-size: 14px;
}
.currentAddress-address {
  display: inline-block;
  width: 90%;
  white-space: nowrap;

  text-overflow: ellipsis;

  overflow: hidden;
}
.arrive-txt p:nth-of-type(1) {
  font-weight: 600;
}
.arrive-txt p:nth-of-type(2) {
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
  padding: 3px;
  color: white;
  background-color: rgb(32, 159, 231);
}
.arrive-right span {
  color: rgb(96, 166, 219);
}
.arrive-right {
  font-weight: 600;
  position: absolute;
  right: 15px;
  font-size: 14px;
}
.pay-way .pay {
  position: absolute;
  right: 15px;
  color: rgb(96, 166, 219);
  font-weight: 550;
}
.pay-way .way {
  font-weight: 600;
}
.pay-way {
  padding: 10px;
}
.arrive-time {
  padding: 10px;
  border-bottom: 1px solid #d9dadb;
}
.basic-info-box {
  width: 95%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: white;
  top: 20px;
}
.title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}
.address-detail i {
  float: right;
  margin-right: 20px;
  margin-top: 5px;
}
.address-detail {
  font-size: 18px;
  font-weight: 550;
}
.address-box {
  padding: 10px;
  color: white;
  line-height: 25px;
}
.settlement {
  /* width: 100vw; */
}
.settlement-box {
  width: 100%;
  padding-top: 44px;
  /* 渐变 */
  background-image: linear-gradient(
      0deg,
      #f5f5f5,
      #f5f5f5 65%,
      hsla(0, 0%, 96%, 0.3) 75%,
      hsla(0, 0%, 96%, 0)
    ),
    linear-gradient(270deg, #009eef, #009eef);
}
</style>