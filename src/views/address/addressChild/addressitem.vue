<template>
  <div>
    <div class="title">当前定位</div>
    <div class="desc" @click="$emit('currentAddressClick')">
      <i class="fa fa-location-arrow"></i>
      <span>{{ address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "addressitem",
  props: {
    address: String,
  },
};
</script>

<style scoped>
.title {
  margin: 10px 0;
  font-size: 12px;
}
.desc i {
  color: #009eef;
}
.desc span {
  color: #333;
  font-weight: bold;
  margin-left: 5px;
  display: inline-block;
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>