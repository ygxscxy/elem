<template>
  <div class="remarks">
    <div class="remarks-name">
      {{ remarksName }}
    </div>
    <div class="remarks-placeholder">
      <span>{{ placeholder }}</span>
      <i class="fa fa-angle-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    remarksName: String,
    placeholder: String,
  },
};
</script>

<style scoped>
.remarks {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4.266667vw 0;
  font-size: 1rem;
  color: #333;
  border-bottom: 1px dotted #eee;
}
.remarks-name {
  padding: 0 20px;
  font-weight: 500;
  flex: none;
}
.remarks-placeholder {
  padding: 0 25px;

  display: flex;
  -webkit-align-items: center;
  align-items: center;
  color: #bbb;
  font-size: 0.9rem;
  max-width: 69.333333vw;
}
.remarks-placeholder > span {
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
}
.cart-item-right > i {
  font-size: 1.2rem !important;
  margin-left: 5px;
}
</style>