<template>
  <div class="buy-car" v-if="storeIndexData">
    <div :class="{ mask: isMask }" v-if="isMask">
      <div class="popup-body">
        <div class="popup-title">
          <div class="title-left">
            <span>已选商品</span>
          </div>
          <div class="clear-right" @click="clearSelectFoodClick">
            <i class="fa fa-remove"></i>
            <span>清空</span>
          </div>
        </div>
        <div class="popup-main">
          <ul>
            <li
              class="flex select-food-item"
              v-for="(item, index) in selectFoods"
              :key="item.item_id"
            >
              <div class="popup-food-name">
                <span>{{ item.name }}</span>
              </div>
              <div class="popup-food-price">
                <span>￥</span>
                <span>{{ item.specfoods[0].price }}</span>
              </div>
              <AddSub class="add-sub" :food="item"></AddSub>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="buy-car-centent flex a-c">
      <div
        class="car-icon"
        @click="showPopupClick"
        :class="{
          'active-buy-car-icon': isSelectFood,
          'animated pulse': isAni,
        }"
      >
        <i class="fa fa-cart-plus"></i>
        <span class="total-count" v-if="totalCount">{{ totalCount }}</span>
      </div>
      <div class="buy-money" @click="showPopupClick">
        <p v-if="!isSelectFood">
          <span>未选购商品</span>
        </p>
        <p v-else>
          <span class="percent-price">￥{{ totalPrice.toFixed(2) }}</span>
          <span class="old-price">￥{{ (totalPrice - 20).toFixed(2) }}</span>
        </p>
        <p class="send-price">
          另加配送费<span>{{ storeIndexData.rst.float_delivery_fee }}</span
          >元
        </p>
      </div>
      <div class="go-pay" :class="{ 'active-go-pay': isSelectFood }">
        <span v-if="isSelectFood">去结算</span>
        <span v-else
          >￥{{ storeIndexData.rst.float_minimum_order_amount }}起送</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import AddSub from "components/common/addSub/AddSub.vue";

import Popup from "components/content/popup/Popup.vue";
export default {
  components: {
    Popup,
    AddSub,
  },
  props: {
    storeIndexData: {
      type: Object,
      default() {
        return {};
      },
    },
    // totalCount: Number,
  },
  data() {
    return {
      totalCount: 0,
      totalPrice: 0,
      //选中的食物
      selectFoods: [],
      isAni: false,
      pv: false,
      isMask: false,
    };
  },
  watch: {
    isAni() {
      setTimeout(() => {
        this.isAni = false;
      }, 500);
    },
  },
  computed: {
    isSelectFood() {
      this.storeIndexData.menu;
      let tag = false;
      this.isAni = false;
      this.totalCount = 0; //初始化,
      this.totalPrice = 0;
      this.selectFoods = [];

      // 遍历推荐列表中,如果有count,就将返回值改成true
      this.storeIndexData.recommend.forEach((recommend) => {
        recommend.items.forEach((item) => {
          // this.isAni = false;
          if (item.count) {
            this.isAni = true;
            tag = true;
            this.totalCount += item.count;
            this.totalPrice += item.specfoods[0].price * item.count;
            this.selectFoods.push(item);
          }
        });
      });

      // 商品列表中的count是否增加
      this.storeIndexData.menu.forEach((item) => {
        item.foods.forEach((food) => {
          if (food.count) {
            this.isAni = true;
            tag = true;
            this.totalCount += food.count;
            this.totalPrice += food.specfoods[0].price * food.count;
            this.selectFoods.push(food);
          }
        });
      });
      console.log(this.selectFoods);
      if (tag) return true;
      else return false;
    },
  },
  mounted() {
    console.log(this.storeIndexData);
  },
  methods: {
    showPopupClick() {
      this.isMask = !this.isMask;
    },
    clearSelectFoodClick() {
      this.selectFoods.forEach((val) => {
        val.count = 0;
      });
    },
  },
};
</script>

<style scoped>
.select-food-item {
  margin-bottom: 15px;
  border-bottom: 1px solid rgb(226, 226, 222);
  padding-bottom: 5px;
  line-height: 30px;
}
.add-sub {
  margin-right: 10px;
}
.popup-main {
  padding: 10px 10px 30px 10px;
  overflow-y: scroll;
  height: 200px;
}
.popup-food-price {
  width: 25%;
  text-align: center;
  color: rgb(255, 83, 76);
  font-size: 18px;
  font-weight: 900;
}
.popup-food-price span:nth-of-type(1) {
  font-size: 14px;
}
.popup-food-name {
  width: 60%;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.popup-title .title-left {
  width: 30%;
  height: 100%;
  text-align: center;
  line-height: 10.666667vw;
}
.popup-title .clear-right {
  width: 30%;
  height: 100%;
  line-height: 10.666667vw;
  text-align: center;
  margin-left: 160px;
}
.popup-title {
  display: flex;
  align-items: center;
  padding: 0 4vw;
  border-bottom: 0.133333vw solid #ddd;
  /* background-color: #eceff1; */
  color: #666;
  height: 10.666667vw;
}

.popup-body {
  position: fixed;
  left: 0;
  width: 100%;
  background-color: #fff;
  bottom: 12.8vw;
  z-index: 201;
  opacity: 1;
  font-size: 1rem;
}
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 12.8vw;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 200;
}

.total-count {
  position: absolute;
  top: -10px;
  left: 25px;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  background-color: rgb(255, 108, 22);
  border-radius: 50%;
  color: white;
}
.buy-car-centent {
  background-color: rgb(80, 80, 82);
  height: 49px;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
/* 去结算 */
.go-pay {
  width: 30%;
  height: 100%;
  text-align: center;
  line-height: 49px;
  color: white;
  font-weight: 600;
}
/*  */
.buy-money {
  box-sizing: border-box;
  width: 55%;
  height: 100%;
  color: rgb(153, 153, 153);
  margin-left: 25px;
  font-size: 14px;
  padding: 10px;
}
.percent-price {
  font-size: 18px;
  color: white;
  padding-right: 3px;
}
.old-price {
  font-size: 14px;
  text-decoration: line-through;
}
.send-price {
  padding: 3px 0;
  font-size: 12px;
}
/* 购物车icon */
.car-icon {
  box-sizing: border-box;
  width: 15%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  background-color: rgb(54, 54, 54);
  border: 5px rgb(68, 68, 68) solid;
  position: relative;
  left: 20px;
  top: -15px;
  box-shadow: 0px 0px 3px 1px;
}
.car-icon i {
  font-size: 30px;
  color: rgb(95, 95, 99);
}

/* 购物车活跃时的样式 */
.active-buy-car-icon {
  background-color: rgb(49, 144, 232);
}
.active-buy-car-icon i {
  color: white;
}

.active-go-pay {
  background-color: rgb(56, 202, 115);
}
</style>