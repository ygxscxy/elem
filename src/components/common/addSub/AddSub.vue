<template>
  <div class="sub-add flex a-c">
    <i
      @click="subCountGoods"
      v-if="food.count <= 0 ? false : true"
      class="fa fa-minus"
    ></i>
    <span class="count" v-if="food.count != 0">{{ food.count }}</span>
    <i @click="addCountGoods" class="fa fa-plus"></i>
  </div>
</template>
 
 <script>
export default {
  props: {
    food: Object,
  },
  methods: {
    subCountGoods() {
      this.food.count -= 1;
      this.$emit("sub");
    },
    addCountGoods() {
      this.food.count += 1;
      this.$emit("add");
    },
  },
};
</script>
 
 <style scpoed>
.sub-add {
  margin-right: 20px;
}
.sub-add i {
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: rgb(29, 177, 190);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}
.sub-add span {
  display: inline-block;
  font-size: 16px;

  margin: 0 5px;
}
</style>