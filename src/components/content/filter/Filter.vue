<template>
  <!-- 添加蒙版 self点击自己本身-->
  <div
    :class="{ 'is-show-mask': isShowMask || isScreen }"
    @click.self="overMask"
  >
    <!-- 导航 -->
    <div class="filter-box" v-if="filterData">
      <div class="filter">
        <div
          class="filter-nav"
          v-for="(item, index) in filterData"
          :class="{ 'add-bold': index == currentFilter }"
          :key="index"
          @click="activeClick(index)"
        >
          <span>{{ item.name }}</span>
          <i ref="i" v-if="item.icon" :class="'fa fa-' + item.icon"></i>
        </div>
      </div>
    </div>
    <!-- 排序 isShowMask有蒙版的时候就弹窗-->
    <div class="filter-sort" v-if="isShowMask">
      <ul>
        <li
          @click="selectFilter(index, item)"
          :class="{ 'select-filter': selectFilterIndex == index }"
          v-for="(item, index) in filterData[0].items"
          :key="item.id"
        >
          {{ item.name }}
          <i v-show="selectFilterIndex == index" class="fa fa-check"></i>
        </li>
      </ul>
    </div>
    <!-- 筛选 -->
    <div class="filter-screen" v-if="isScreen">
      <div class="filter-screen-content">
        <div
          class="morefilter"
          v-for="(item, index) in filterData[3].items"
          :key="index"
        >
          <h2 class="screen-title">{{ item.name }}</h2>
          <ul>
            <li
              v-for="(data, i) in item.items"
              :key="data.id"
              :class="{ 'select-scrren-item': data.checked }"
              @click="isSelectScreenItem(data, item)"
            >
              <img v-if="data.icon" :src="data.icon" alt="" />
              <span>{{ data.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 两个按钮 -->
      <div class="reset-confirm" v-if="isScreen">
        <span
          class="reset"
          @click="resetClick"
          :class="{ 'high-light': isHaveSelect }"
          >重置</span
        >
        <span class="confirm" @click="confirmClick">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentFilter: 0, //当前选中的排序
      isShowMask: false,
      selectFilterIndex: 0,
      isScreen: false,
    };
  },

  computed: {
    isHaveSelect() {
      let isHight = false;
      // console.log(this.filterData[3]);
      this.filterData[3].items.forEach((val) => {
        val.items.forEach((val2) => {
          if (val2.checked) {
            isHight = true;
          }
        });
      });
      return isHight;
    },
  },

  methods: {
    // 综合排序
    activeClick(index) {
      this.currentFilter = index;
      switch (index) {
        case 0:
          this.isScreen = false;
          this.isShowMask = true;
          this.$emit("isTopShowIpt", this.isShowMask);
          this.$refs.i[0].classList.remove("fa-caret-right");
          this.$refs.i[0].classList.add("fa-caret-down");
          break;
        case 1:
          this.isScreen = false;
          this.$emit("orderBy", this.filterData[1].order_by);
          this.overMask();
          break;
        case 2:
          this.$emit("orderBy", this.filterData[2].order_by);
          this.isScreen = false;
          this.overMask();
          break;
        case 3:
          this.isScreen = true;
          this.$emit("isTopShowIpt", this.isScreen);
        default:
          break;
      }
    },
    // 清除蒙版
    overMask() {
      this.isShowMask = false;
      this.isScreen = false;

      this.$emit("isTopShowIpt", false);
      this.$refs.i[0].classList.add("fa-caret-right");
      this.$refs.i[0].classList.remove("fa-caret-down");
    },
    // 综合排序中的排序方式选择
    selectFilter(index, item) {
      this.selectFilterIndex = index;
      this.filterData[0].name = item.name;
      this.$emit("orderBy", item.order_by);
      this.overMask();
    },
    isSelectScreenItem(screenItem, screen) {
      // 判断是单选还是多选:商家服务是多选,其余的是单选
      if (screen.id === "store") {
        // console.log(screenItem, screen);
        screenItem.checked = !screenItem.checked;
        console.log(screenItem);
      } else {
        // 单选
        screen.items.forEach((element) => {
          element.checked = false;
        });
        // 点击的每个选项
        screenItem.checked = !screenItem.checked;
        // console.log(screenItem, screen);
      }
    },
    resetClick() {
      if (this.isHaveSelect) {
        // console.log(this.filterData);
        this.filterData[3].items.forEach((val) => {
          val.items.forEach((val2) => {
            val2.checked = false;
          });
        });
      }
    },
    confirmClick() {
      // p27
      this.overMask();
    },
  },
};
</script>

<style scoped>
.high-light {
  color: #333 !important;
}

/* 清空与确认按钮 */
.reset-confirm {
  width: 100%;
  height: 50px;
  color: #fff;
  text-align: center;
  line-height: 50px;
}
.reset {
  float: left;
  width: 50%;
  height: 100%;
  color: rgb(236, 232, 232);
  background-color: rgb(250, 252, 250);
}
.confirm {
  float: right;
  width: 50%;
  height: 100%;
  background-color: rgb(16, 237, 88);
}

/* filter标题部分 */
.filter-box {
  background: #fff;
  position: sticky;
  top: 49px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}
/* 选中加粗 */
.add-bold {
  font-weight: 600;
  color: #333;
}

/* 蒙版 */
.is-show-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

/* 蒙版排序选项 */
.filter-sort {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 23.533333vw;
}
.filter-sort li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}

.select-filter {
  color: #009eef;
}

.fa-check {
  float: right;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

/* 筛选 */
.filter-screen {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 23.533333vw;
}
.filter-screen li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}

.filter-screen-content {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.morefilter .screent-title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.select-scrren-item {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}
</style>