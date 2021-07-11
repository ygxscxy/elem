<template>
  <div class="header">
    <!-- 左侧:用于返回 -->
    <div class="header-left-box is-left" v-show="isLeft">
      <i class="fa fa-chevron-left"></i>
      <button @click="$router.go(-1)">返回</button>
    </div>
    <!-- 中间:用于编写标题 -->
    <h1 class="header-title">{{ title }}</h1>
    <!-- 右侧 -->
    <div class="header-right-box is-right" v-show="isRight">
      <i class="fa fa-user-o"></i>
      <button @click="$router.push('/profile')">用户中心</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: false,
    },
    isRight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.header {
  align-items: center;
  background-color: #009eef;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 16px;
  height: 44px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

.header-right-box button,
.header-left-box button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: none;
}
.header-title {
  flex: 1;
}
.is-left {
  text-align: left;
}
.is-right {
  text-align: right;
}
</style>