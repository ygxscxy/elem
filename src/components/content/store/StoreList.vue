<template>
  <div>
    <div
      :key="index"
      v-if="homeStoreList"
      v-for="(StoreList, index) in homeStoreList"
    >
      <StoreItem
        @click.native="$router.push('/storedetail')"
        v-for="(storeItem, i) in StoreList"
        :storeItem="storeItem.restaurant"
        :key="storeItem.restaurant.id"
      ></StoreItem>
    </div>
  </div>
</template>

<script>
import StoreItem from "./StoreItem.vue";
export default {
  props: {
    homeStoreList: Array,
    default() {
      return [];
    },
  },
  components: {
    StoreItem,
  },
  mounted() {
    // console.log(this.homeStoreList);
  },
};
</script>

<style>
</style>