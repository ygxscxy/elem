<template>
  <div class="add-address">
    <HeaderNav
      v-if="!isShowSearchAddress"
      :title="title"
      :isLeft="true"
      :isShowBackTxt="false"
    >
    </HeaderNav>
    <!-- 添加收货地址 -->
    <div v-if="!isShowSearchAddress" class="from-table">
      <!-- 联系人 -->
      <div class="item flex">
        <!-- 左侧 -->
        <div class="title">
          <label for="name">联系人</label>
        </div>
        <!-- 右侧 -->
        <div class="right-centent">
          <input
            type="text"
            v-model="setAddressInfo.name"
            id="name"
            placeholder="姓名"
          />
        </div>
      </div>
      <!--性别 -->
      <div class="item flex">
        <!-- 左侧 -->
        <div class="title"></div>
        <!-- 右侧 -->
        <div class="right-centent">
          <span
            :class="{ activeSpan: !activeGender }"
            @click="activeSpanClick(1)"
            >先生</span
          >
          <span
            :class="{ activeSpan: activeGender }"
            @click="activeSpanClick(0)"
            >女士</span
          >
        </div>
      </div>
      <!-- 电话 -->
      <div class="item flex">
        <!-- 左侧 -->
        <div class="title">
          <label for="phone">电话</label>
        </div>
        <!-- 右侧 -->
        <div class="right-centent">
          <input
            v-model="setAddressInfo.phone"
            type="text"
            id="phone"
            placeholder="手机号码"
          />
        </div>
      </div>
      <!-- 地址 -->
      <div class="item flex" @click="setAddressClick">
        <!-- 左侧 -->
        <div class="title">
          <label for="address">地址</label>
        </div>
        <!-- 右侧 -->
        <div class="right-centent">
          <input
            v-model="setAddressInfo.address"
            type="text"
            id="address"
            placeholder="小区/写字楼/学校等"
          />
          <i class="right-direction fa fa-angle-right"></i>
        </div>
      </div>
      <!-- 门牌号 -->
      <div class="item flex">
        <!-- 左侧 -->
        <div class="title">
          <label for="door">门牌号</label>
        </div>
        <!-- 右侧 -->
        <div class="right-centent">
          <textarea
            id="door"
            placeholder="10号楼5层501室222"
            rows="2"
            v-model="setAddressInfo.door"
          ></textarea>
          <i class="edit fa fa-edit"></i>
        </div>
      </div>
      <!-- 标签 -->
      <div class="item flex">
        <div class="title">
          <span>标签</span>
        </div>
        <div class="right-centent">
          <span
            @click="activeSpanClick2(item, index)"
            v-for="(item, index) in ['家', '学校', '公司']"
            :key="item"
            :class="{
              activeSpan: activeAddress == index || item == setAddressInfo.tag,
            }"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <!-- 搜索设置收货地址 -->
    <AddAddressSearch
      :isShowSearchAddress="isShowSearchAddress"
      @choiceAddress="choiceAddress"
      @closeAddressClick="closeAddressClick"
    ></AddAddressSearch>
    <div v-if="!isShowSearchAddress" @click="handleConfirm" class="comfirm">
      <span>确定</span>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";
import AddAddressSearch from "components/content/addAddressSearch/AddAddressSearch.vue";
import { Toast } from "mint-ui";
import { getHomeData } from "network/home/getHomeData.js";

export default {
  name: "addaddress",
  components: { HeaderNav, AddAddressSearch },
  data() {
    return {
      title: "新增收货地址",
      activeGender: null,
      activeAddress: null,
      setAddressInfo: {
        id: `${localStorage.isLogin}${Date.parse(new Date())}`,
        name: "",
        sex: "女士",
        phone: "",
        address: "",
        door: "",
        tag: "家",
      },
      isShowSearchAddress: false,
      mistakenMsg: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.params.title) {
        vm.title = to.params.title;
        vm.setAddressInfo = to.params.item;
      }
    });
  },
  watch: {
    mistakenMsg() {
      Toast({
        message: this.mistakenMsg,
        position: "bottom",
        duration: 3000,
      });
    },
  },
  methods: {
    activeSpanClick(gender) {
      let sex = gender ? "先生" : "女士";

      this.activeGender = !this.activeGender;
      this.setAddressInfo.sex = sex;
    },
    activeSpanClick2(tag, index) {
      this.activeAddress = index;
      this.setAddressInfo.tag = tag;
    },
    handleConfirm() {
      // console.log("---");
      for (let item in this.setAddressInfo) {
        if (this.setAddressInfo[item] === "") {
          console.log(this.setAddressInfo[item]);
          switch (item) {
            case "name":
              this.mistakenMsg = "联系人未填写";
              break;
            case "sex":
              this.mistakenMsg = "性别未填写";
              break;
            case "phone":
              this.mistakenMsg = "电话未填写";
              break;
            case "address":
              this.mistakenMsg = "地址未填写";
              break;
            case "door":
              this.mistakenMsg = "门牌号未填写";
              break;
            case "tag":
              this.mistakenMsg = "标签未填写";
              break;
            default:
              // this.addAddressInfo(this.setAddressInfo);
              break;
          }
          return;
        }
      }
      if (this.title == "新增收货地址") {
        // 存储数据
        this.addAddressInfo(this.setAddressInfo);
      } else {
        this.editAddress(this.setAddressInfo);
      }
      // console.log(this.setAddressInfo);
    },

    closeAddressClick() {
      this.isShowSearchAddress = false;
    },
    setAddressClick() {
      this.isShowSearchAddress = true;
    },
    choiceAddress(choiceCityInfo) {
      this.setAddressInfo.address =
        choiceCityInfo.district + choiceCityInfo.name + choiceCityInfo.address;
      this.isShowSearchAddress = false;
    },
    // 存储新增收货地址
    addAddressInfo(setAddressInfo) {
      // console.log(setAddressInfo);
      getHomeData({
        url: `/api/addaddress/${localStorage.isLogin}`,
        method: "post",
        data: { ...setAddressInfo },
      })
        .then((res) => {
          if (res.data.status == 200) {
            this.mistakenMsg = res.data.msg;
            setTimeout(() => {
              this.$router.push("/myaddress");
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editAddress(setAddressInfo) {
      // console.log("---");
      getHomeData({
        url: "/api/updateaddress",
        method: "post",
        data: {
          user_id: localStorage.isLogin,
          data: setAddressInfo,
        },
      })
        .then((res) => {
          this.mistakenMsg = res.data.msg;
          setTimeout(() => {
            this.$router.push("/myaddress");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
#address {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.edit {
  float: right;
  margin-top: 18px;
  transform: translateX(85px);
  color: rgb(185, 181, 181);
}
.right-direction {
  float: right;
  margin-top: 10px;
  transform: translateX(60px);
  font-size: 28px;
  font-weight: 700;
  color: rgb(185, 181, 181);
}
.comfirm span {
  background-color: rgb(0, 215, 98);
  display: inline-block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 700;
  color: white;
}
.comfirm {
  padding: 10px;
  text-align: center;
}
.add-address {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgb(243, 240, 240);
  position: relative;
  z-index: 100;
}
.from-table {
  padding-top: 44px;
  background-color: #fff;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(222, 223, 224);
}
.title {
  width: 25%;
  text-align: center;

  font-weight: 700;
}
textarea {
  margin-top: 15px;
}
.right-centent input,
.right-centent textarea {
  font-size: 16px;
}

input::-webkit-input-placeholder {
  color: rgb(212, 209, 209);
}

textarea::-webkit-input-placeholder {
  color: rgb(212, 209, 209);
}

.right-centent span {
  margin-right: 5px;
  box-sizing: border-box;
  padding: 2px 15px;
  border: 0.5px solid rgb(209, 207, 207);
  text-align: center;
  font-size: 14px;
  color: rgb(122, 121, 121);
  box-sizing: border-box;
}

.activeSpan {
  background-color: rgb(238, 247, 255);
  color: rgb(35, 176, 255) !important;
}
</style>