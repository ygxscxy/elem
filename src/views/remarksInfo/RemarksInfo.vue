<template>
  <div class="remarks-info">
    <HeaderNav
      :isLeft="true"
      title="订单备注"
      :isShowBackTxt="false"
    ></HeaderNav>
    <div class="info-main">
      <div class="user-input-remarks">
        <textarea
          v-model="userInputRemarks"
          id=""
          rows="5"
          maxlength="100"
          placeholder="填写额外对餐厅和骑手小哥备注信息"
        ></textarea>
      </div>
      <div class="user-select-remarks">
        <div class="radio-box">
          <div
            class="radio-item"
            v-for="(radio, index) in radioItem"
            :key="index"
          >
            <span
              class="item"
              @click="selectRadio(radio, item)"
              v-for="(item, i) in radio"
              :key="i"
              :class="{ 'select-active': item.isSelect }"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="checked-box">
          <div class="checked-item">
            <span
              :class="{ 'select-active': item.isSelect }"
              v-for="(item, index) in checkedItem"
              :key="index"
              @click="item.isSelect = !item.isSelect"
              class="item"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <div @click="commitReamaksInfo" class="commit">
      <span>确定</span>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";

export default {
  name: "remarksinfo",
  components: {
    HeaderNav,
  },
  data() {
    return {
      radioIndex1: null,
      radioIndex2: null,
      checkedIndex: null,
      // 单选框
      radioItem: [
        [
          { isSelect: false, name: "挂门把手上" },
          { isSelect: false, name: "放前台桌上" },
          { isSelect: false, name: "放门口" },
          { isSelect: false, name: "请电话联系我" },
        ],
        [
          { isSelect: false, name: "不要辣" },
          { isSelect: false, name: "少点辣" },
          { isSelect: false, name: "多点辣" },
        ],
      ],
      // 多选
      checkedItem: [
        { isSelect: false, name: "不要香菜" },
        { isSelect: false, name: "不要香菜" },
        { isSelect: false, name: "不要葱" },
        { isSelect: false, name: "多点醋" },
      ],
      userInputRemarks: "",
    };
  },
  methods: {
    selectRadio(radio, item) {
      radio.forEach((element) => {
        element.isSelect = false;
      });
      item.isSelect = true;
    },
    commitReamaksInfo() {
      let selectRemarks = "";
      this.radioItem.forEach((val) => {
        val.forEach((ele) => {
          if (ele.isSelect) {
            selectRemarks += ele.name + ",";
          }
        });
      });

      this.checkedItem.forEach((ele) => {
        if (ele.isSelect) {
          selectRemarks += ele.name + ",";
        }
      });
      selectRemarks += this.userInputRemarks;

      console.log(selectRemarks);
      // 存储到vuex中
      this.$store.dispatch("setCustomRemarks", selectRemarks);
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.select-active {
  background-color: rgb(1, 134, 255);
  color: white;
}
.commit {
  box-shadow: 1px 1px 1px 1px rgb(19, 19, 19, 0.2);
  width: 95%;
  height: 40px;
  background-color: rgb(33, 249, 97);
  position: relative;
  top: 20px;
  left: 50%;
  text-align: center;
  color: #fff;
  line-height: 40px;
  font-weight: 600;
  transform: translateX(-50%);
}
.radio-item,
.checked-item {
  line-height: 40px;
}
.item {
  font-size: 14px;
  margin-right: 5px;
  border: 1px rgb(216, 216, 218) solid;
  padding: 3px;
}
.user-select-remarks {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  margin-top: 15px;
}
.user-input-remarks textarea {
  width: 100%;
}
.user-input-remarks {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  width: 90%;
  border: 1px solid rgb(227, 227, 229);
  background-color: rgb(245, 245, 248);
}
.info-main {
  padding: 20px 0;
  width: 100%;
  background-color: #fff;
  /* height: 200px; */
  position: relative;
  top: 5px;
}
.remarks-info {
  width: 100%;
  height: 100vh;
  background-color: rgb(238, 236, 238);
  padding-top: 44px;
}
</style>