<template>
  <transition name="move">
    <div v-if="selectFoodItem && isShow" class="food-item">
      <div class="close-img-btn" @click="$emit('closeDetailClick', false)">
        <img
          src="https://fuss10.elemecdn.com/8/ba/bcfa8cc62b20e044bd2ea1c1c7f3dpng.png?imageMogr/format/webp/"
          alt=""
        />
      </div>
      <div class="food-item-main">
        <div class="food-item-img">
          <img :src="$formatImgSrc(selectFoodItem.image_path)" alt="" />
        </div>
        <div class="foot-item-info">
          <div class="foot-item-name">
            <h2>{{ selectFoodItem.name }}</h2>
          </div>
          <div class="foot-item-month-sell-rating">
            <span>月售{{ selectFoodItem.month_sales }}</span>
            <span>月售{{ selectFoodItem.satisfy_rate }}</span>
          </div>
          <div class="price-sub-add flex j-c-s-b">
            <span>￥{{ selectFoodItem.specfoods[0].price }}</span>
            <AddSub :food="selectFoodItem"></AddSub>
          </div>
          <div class="desc">
            <p>亲，记得点米饭哦，主要原料：其他</p>
            <p>价格说明></p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AddSub from "components/common/addSub/AddSub.vue";

export default {
  name: "fooditem",
  props: {
    selectFoodItem: Object,
    isShow: Boolean,
  },
  components: {
    AddSub,
  },
};
</script>

<style scoped>
.move-enter-active,
.move-leave-active {
  transition: all 0.25s ease-in-out;
  transform: translateY(-500px);
}

.move-enter,
.move-leave-to {
  transform: translateY(500px);
}

.desc p {
  font-size: 12px;
  margin-bottom: 5px;
}
.price-sub-add {
  margin-bottom: 10px;
}
.price-sub-add > span {
  color: rgb(255, 88, 57);
}
.foot-item-month-sell-rating span {
  margin-right: 5px;
  font-size: 14px;
}
.foot-item-info .foot-item-month-sell-rating {
  color: rgb(201, 199, 199);
  margin-bottom: 10px;
}
.foot-item-info h2 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 10px;
}
.foot-item-info {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.close-img-btn img {
  width: 30px;
  height: 30px;
  position: fixed;
  background-color: rgb(117, 115, 115);
  border-radius: 50%;
  right: 10px;
}
.food-item-main img {
  width: 100%;
  height: 400px;
}
.food-item {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>