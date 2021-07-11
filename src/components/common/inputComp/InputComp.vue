<template>
  <div class="input-box">
    <!-- 组件结构 -->
    <div class="input-content" :class="{ 'is-show-red-norder': error }">
      <!-- 输入框 -->
      <input
        :type="type"
        :name="name"
        id=""
        :placeholder="placeholder"
        :value="value"
        @input="inputHandle"
      />
      <!-- 输入框后面的点击按钮 -->
      <button
        v-if="isShow"
        :disabled="isDisabled"
        @click="getCodeClick"
        :style="{ backgroundColor: bgc, color: textColor }"
      >
        {{ getCodeBtnTitle }}
      </button>
    </div>
    <!-- 错误提醒 -->
    <div class="error-tip" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "inputComp",
  data() {
    return {
      newInputHandle: null,
    };
  },
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: String,
    placeholder: String,
    name: String,
    getCodeBtnTitle: String,
    isDisabled: {
      type: Boolean,
      default: true,
    },
    isShow: Boolean, //是否显示输入框后面的2按钮
    error: String,
    bgc: {
      //按钮的背景颜色
      type: String,
      default: "green",
    },
    textColor: String,
  },
  methods: {
    inputHandle(event) {
      this.$emit("inputHandle", event.target.value);
    },
    getCodeClick() {
      this.$emit("getCodeClick");
    },
  },
};
</script>

<style scoped>
.input-box {
  border: 1px solid #f1f1f1;
  height: 30px;
  line-height: 30px;
}
.input-box input {
  font-size: 10px;
}
.input-content button {
  font-size: 13px;
  float: right;
  height: 30px;
  color: white;
}
.error-tip {
  color: red;
  font-size: 12px;
}
.is-show-red-norder {
  border: 2px solid rgba(255, 1, 1);
}
</style>