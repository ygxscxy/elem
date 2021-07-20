<template>
  <div>
    <div v-if="recommend && !isShowFoodDetail" class="choice-food">
      <!-- 点餐 -->
      <!-- 推荐列表 -->
      <div class="recommend" v-for="(rec, index) in recommend" :key="index">
        <h1 class="recommend-name">{{ rec.name }}</h1>
        <div class="recomment-list">
          <ul class="flex j-c-s-b">
            <li
              class="recommend-item"
              v-for="item in rec.items"
              :key="item.item_id"
            >
              <img :src="$formatImgSrc(item.image_path)" alt="" />
              <div class="recommend-food">
                <h2 class="recommend-food-name">
                  {{ item.name }}
                </h2>
                <p class="recommend-food-zm">
                  <span>月售{{ item.month_sales }}</span>
                  <span>好评率{{ item.satisfy_rate }}</span>
                </p>
              </div>
              <div class="recommend-food-price flex a-c j-c-s-b">
                <p class="foodPrice">￥{{ item.specfoods[0].price }}</p>
                <AddSub @add="add" @sub="sub" :food="item"></AddSub>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- menu区域 商品分类列表 -->
      <div class="menu">
        <!-- 左侧 -->
        <Scroll ref="leftScroll" class="menu-box">
          <ul>
            <li
              :class="{ 'menu-iite-activt': currentMenuItem == index }"
              @click="clickMenu(index)"
              v-for="(item, index) in storeIndexData.menu"
              :key="item.id"
            >
              <img
                v-if="item.icon_url"
                :src="$formatImgSrc(item.icon_url)"
                alt=""
              />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </Scroll>
        <!-- 右侧 -->
        <Scroll
          ref="rightScroll"
          @getScrollPosition="getScrollPosition"
          :probeType="3"
          class="food-list"
        >
          <ul>
            <!-- 每个li就对应menu中的一个菜单 -->
            <li
              class="food-item"
              v-for="(item, index) in storeIndexData.menu"
              :key="index"
            >
              <p class="food-title">
                <span>{{ item.name }}</span>
                <span>{{ item.description }}</span>
              </p>
              <div
                class="food-detail"
                v-for="food in item.foods"
                :key="food.item_id"
              >
                <img
                  @click="foodIttemClick(food)"
                  :src="$formatImgSrc(food.image_path)"
                  alt=""
                />
                <div class="food-detail-info">
                  <h4 @click="foodIttemClick(food)">{{ food.name }}</h4>
                  <p class="foot-detail-desc">
                    {{ food.description }}
                    6根/份，配糊汤粉，绝了！ 主要原料：面粉
                  </p>
                  <p @click="foodIttemClick(food)" class="food-detail-sales">
                    月售{{ food.month_sales }}份 &nbsp;&nbsp;好评率{{
                      food.satisfy_rate
                    }}
                  </p>
                  <div class="food-detail-price">
                    <span class="price">￥{{ food.specfoods[0].price }} </span>
                    <AddSub :food="food"></AddSub>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </Scroll>
      </div>
    </div>
    <!-- 详情 -->
    <FoodItemDetail
      @closeDetailClick="closeDetailClick"
      :isShow="isShowFoodDetail"
      :selectFoodItem="selectFoodItem"
    ></FoodItemDetail>
    <!-- 购物车 -->
    <div class="buttom-buy-car">
      <BotomBuyCar
        :isAnimated="isAnimated"
        :totalCount="totalCount"
        :storeIndexData="storeIndexData"
      ></BotomBuyCar>
    </div>
  </div>
</template>

<script>
import AddSub from "components/common/addSub/AddSub.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BotomBuyCar from "./BotomBuyCar.vue";
import FoodItemDetail from "./foodItemDetail.vue";
export default {
  name: "choisefood",
  props: {
    storeIndexData: Object,
  },
  data() {
    return {
      leftScroll: null,
      rightScroll: null,
      // 右侧食物列表滚动到位置‘
      rightScrollY: 0,
      // 记录十二个菜单区域对应区域的高度
      foodItemBoxHigh: [],

      totalCount: 0,

      food: null,
      isAnimated: false,

      selectFoodItem: null,
      isShowFoodDetail: false,
    };
  },
  components: {
    AddSub,
    Scroll,
    BotomBuyCar,
    FoodItemDetail,
  },
  computed: {
    recommend() {
      return this.storeIndexData.recommend;
    },
    // 实现左右联动
    currentMenuItem() {
      for (let index = 0; index < this.foodItemBoxHigh.length; index++) {
        const perv = this.foodItemBoxHigh[index];

        const next = this.foodItemBoxHigh[index + 1];

        if (this.rightScrollY >= perv && this.rightScrollY < next) {
          return index;
        }
      }

      return 0;
    },
  },
  mounted() {
    // console.log(this.storeIndexData.menu);
    // 获取左右两个滚动对象
    this.leftScroll = this.$refs.leftScroll;
    this.rightScroll = this.$refs.rightScroll;

    // 计算十二个food区的高度
    this.computedFoodHigh();
  },
  methods: {
    closeDetailClick(bool) {
      this.isShowFoodDetail = bool;
    },
    foodIttemClick(foodItem) {
      this.selectFoodItem = foodItem;
      this.isShowFoodDetail = true;
      // console.log(foodItem);
    },
    clickMenu(index) {
      let foodItem =
        this.rightScroll.$el.getElementsByClassName("food-item")[index];
      /* 跳转 */
      this.rightScroll.scrollToElementEnc(foodItem, 500);
    },
    getScrollPosition(position) {
      this.rightScrollY = -position.y;
    },
    computedFoodHigh() {
      let foods = this.rightScroll.$el.getElementsByClassName("food-item");
      let food1 = 0;
      this.foodItemBoxHigh.push(food1);
      foods.forEach((element, index) => {
        let itemHigh = element.clientHeight;
        // 每一个盒子的开始位置是加上前面盒子的高度
        food1 += itemHigh;
        this.foodItemBoxHigh.push(food1);
      });
    },
    add(item) {
      this.isAnimated = true;
      // this.totalCount++;
      // this.food = item;
    },
    sub(item) {
      // this.totalCount--;
      // this.food = item;
    },
  },
};
</script>

<style scoped>
.recommend-food-price .foodPrice {
  color: rgb(223, 131, 123);
  font-size: 18px;
}
.recommend-food-zm span:nth-of-type(1) {
  margin-right: 10px;
}

.recommend-food-zm {
  color: rgb(172, 174, 177);
  margin-bottom: 10px;
  width: 100%;
}
.recommend-food-name {
  width: 140px;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  font-size: 18px;
}
.recommend {
  padding-top: 4.266667vw;
  background-color: #fff;
  padding-left: 4.266667vw;
  position: relative;
  z-index: 1;
}
.recommend-name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 2.666667vw;
}
.recomment-list {
  /* 在x轴上添加滚轮 */
  overflow-x: scroll;
  width: 100%;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.recommend-item img {
  width: 35.333333vw;
  height: 35.333333vw;
  margin-right: 4.666667vw;
  border-radius: 2.533333vw;
}

.menu-iite-activt {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
/*  */
.menu {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 10.8vw;
  background-color: #fff;
  display: flex;
}
.menu-box {
  height: calc(100vh - 25.8vh);
  background-color: #f8f8f8;
  padding-bottom: 10.666667vw;
  width: 20.533333vw;
  overflow-y: hidden;
}
.menu-box li {
  padding: 4.666667vw 2vw;
  font-size: 0.6rem;
  color: #666;
  line-height: 1.2;
}
.menu-box li img {
  max-width: 100%;
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: top;
  margin-right: 0.8vw;
}
/*  */

.food-list {
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100vh - 18.8vh);

  width: 79.466667vw;
  padding-bottom: 10.666667vw;
}
.food-title {
  margin-left: 2.666667vw;
  padding: 2vw 8vw 2vw 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.food-title span:nth-of-type(1) {
  margin-right: 1.333333vw;
  font-weight: 700;
  font-size: 0.8rem;
  color: #666;
  flex: none;
}
.food-title span:nth-of-type(2) {
  flex: 1;
  color: #999;
  font-size: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.food-detail {
  min-height: 30.666667vw;
  padding: 2.666667vw 0 2.666667vw 2.666667vw;
  margin-bottom: 0.133333vw;
  display: flex;
}
.food-detail img {
  width: 25.333333vw;
  height: 25.333333vw;
  flex: none;
  margin-right: 2.666667vw;
  border-radius: 0.533333vw;
}
.food-detail-info {
  flex: 1;
  padding-bottom: 6.666667vw;
  padding-right: 4vw;
}
.food-detail-info h4 {
  padding-right: 4vw;
  font-weight: 700;
  overflow: hidden;
  font-size: 1rem;
  white-space: nowrap;
  width: 40vw;
  text-overflow: ellipsis;
  color: #333;
}
.foot-detail-desc {
  margin: 1.333333vw 0;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 42.666667vw;
}
.food-detail-sales {
  margin: 1.733333vw 0 !important;
  color: #999;
  font-size: 0.6rem;
  line-height: 1;
  min-height: 1em;
}
.food-detail-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.733333vw;
}
.food-detail-price .price {
  font-size: 1rem;
  line-height: 4.266667vw;
  color: #ff5339;
  padding-bottom: 0.933333vw;
  display: flex;
  align-items: baseline;
}

.menu-wrapper .current {
  background-color: #fff !important;
  color: #333 !important;
}
</style>