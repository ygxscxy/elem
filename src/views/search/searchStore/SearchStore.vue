<template>
  <div v-if="searchData">
    <ul class="search-store" v-if="searchData.restaurant">
      <li
        v-for="item in searchData.restaurant"
        @click="$emit('storeItemClick')"
      >
        <img
          :src="$formatImgSrc(item.image_path)"
          :key="item.authentic_id"
          alt=""
        />
        <div class="store-item">
          <span class="title">{{ item.name }}</span>
          <span class="rating">评分{{ item.rating }}</span>
        </div>
      </li>
    </ul>
    <ul v-if="searchData.words" class="search-store">
      <li v-for="(item, index) in searchData.words" :key="index">
        <i class="fa fa-search"></i>
        <span class="title">{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    searchData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
.search-store {
  background: #fff;
}
.search-store li {
  padding: 0 4.266667vw;
  display: flex;
  height: 13.933333vw;
  align-items: center;
}
.search-store li img {
  width: 6.4vw;
  height: 6.4vw;
  margin-right: 4.266667vw;
  border-radius: 0.133333vw;
}
.store-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 13.933333vw;
  border-bottom: 1px solid #e3e3e3;
}
.store-item .title {
  display: inline-block;
  max-width: 56vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.888rem;
  color: #333;
  margin-right: 0.8vw;
}
.store-item .rating {
  color: #999;
  font-size: 0.8rem;
}

.search-store li i {
  margin-right: 4.266667vw;
  color: #888;
}
</style>