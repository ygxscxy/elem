<template>
  <transition name="move">
    <!-- 蒙版 -->
    <div class="mask" @click.self="$emit('close')" v-if="isShowTableWare">
      <div class="tableware">
        <div class="tableware-main">
          <div class="tabeleware-header">
            <span class="close" @click="$emit('close')">取消</span>
            <span class="title">选择本单餐具</span>
            <span class="comfirm" @click="$emit('comfirm', selectCountItem)"
              >确定</span
            >
          </div>

          <ul class="item-box">
            <li
              class="tableware-item"
              v-for="(item, index) in tablewareList"
              :key="index"
              :class="{ 'active-item': index == activeIndex }"
              @click="selectCount(index, item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShowTableWare: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tablewareList: ["无需餐具", "1份", "2份", "3份", "4份", "5份", "6份"],
      activeIndex: null,
      selectCountItem: null,
    };
  },
  methods: {
    selectCount(index, item) {
      this.activeIndex = index;
      this.selectCountItem = item;
    },
  },
};
</script>

<style scoped>
.active-item {
  background-color: rgb(51, 180, 34);
  border-radius: 8px;
  color: white;
}
.item-box {
  transform: translateY(30px);
  overflow-y: scroll;
  height: 60%;
  text-align: center;
}
.tableware-item {
  line-height: 40px;
}
.close {
  float: left;
}
.comfirm {
  float: right;
}
.mask {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 900;
  background-color: rgba(0, 0, 0, 0.4);
}
.tableware-main {
  position: absolute;
  background-color: rgb(255, 255, 255);

  box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
  bottom: 0;
  left: 0;
  right: 0;
  top: 65%;
  z-index: 100;
  padding: 5.333333vw 6.933333vw;
  box-sizing: border-box;
  transition: transform 0.2s;
  will-change: transform;
}
.tabeleware-header {
  margin-bottom: 3.2vw;
  padding: 0 1.466667vw;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
}

.move-enter-active,
.move-leave-active {
  transition: opacity 0.25s ease-out;
}

.move-enter,
.move-leave-to {
  opacity: 0;
}
</style>