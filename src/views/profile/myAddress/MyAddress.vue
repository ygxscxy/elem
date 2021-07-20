<template>
  <div class="my-address">
    <!-- 头部 -->
    <HeaderNav title="我的收货地址" :isLeft="true" :isShowBackTxt="false">
    </HeaderNav>
    <div class="receiving-address-list">
      <ul class="address-list">
        <li
          class="address-item"
          v-for="(item, index) in allAddress"
          :key="item.id"
        >
          <!-- 顶部 -->
          <div class="item-top-box flex a-c">
            <!-- 左侧 -->
            <div class="address-item-left">
              <span v-if="item.tag == '家'" class="fa fa-home"></span>
              <span
                v-else-if="item.tag == '公司'"
                class="fa fa-suitcase"
              ></span>
              <span v-else class="fa fa-graduation-cap"></span>
            </div>
            <!-- 中间 -->
            <div class="address-item-middle">
              <!-- 第一行 -->
              <p class="name-phone">
                <span class="name">{{ item.name }}</span>
                <span class="phone">{{ item.phone }}</span>
              </p>
              <!-- 第二行 -->
              <div class="detail-address">
                <p class="address">
                  <span v-if="activeClick == index" class="default-address"
                    >默认</span
                  >{{ item.address }}{{ item.door }}
                </p>
              </div>
            </div>
            <!-- 右侧 -->
            <div class="address-item-right">
              <span @click="editAddressClick(item)" class="fa fa-pencil"></span>
            </div>
          </div>
          <!-- 底部 -->
          <div class="item-bottom-box flex a-c">
            <span
              class="select-address"
              @click="selectDefaultAddress(index, item)"
            ></span>
            <span
              :class="{ 'fa fa-check-circle': activeClick == index }"
            ></span>
            <span class="default-txt">默认地址</span>
            <span @click="deleteAddressItem(item.id)" class="remove-address"
              >删除</span
            >
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <div class="add-address" @click="intoAddAddress">
      <i class="fa fa-plus-circle"></i>
      <span>新增收获地址</span>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";
import { getHomeData } from "network/home/getHomeData.js";

export default {
  name: "myaddress",
  components: {
    HeaderNav,
  },
  data() {
    return {
      allAddress: [],
      activeClick: null,
    };
  },
  // 路由守卫,已进入到路由就发送请求，请求所有的设置好的收货地址
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData();
    });
  },
  methods: {
    deleteAddressItem(address_id) {
      getHomeData({
        url: "/api/deleteaddress",
        method: "get",
        params: { user_id: localStorage.isLogin, address_id },
      })
        .then((res) => {
          console.log(res);
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editAddressClick(item) {
      // console.log(item);
      this.$router.push({
        name: "addaddress",
        params: { title: "编辑地址", item },
      });
    },
    selectDefaultAddress(index, item) {
      console.log(index);
      this.activeClick = index;
      // 将当前选择的地址存储到vuex中
      this.$store.dispatch("setCurrentAdress", item);
      this.$router.push({ name: "settlement" });
    },
    intoAddAddress() {
      this.$router.push("/addaddress");
    },
    getData() {
      getHomeData({
        url: "/api/getalladdress",
        params: {
          user_id: localStorage.isLogin,
        },
      }).then((res) => {
        this.allAddress = res.data.myAddress;
        // console.log(res.data);
      });
    },
  },
};
</script>

<style scoped>
.address {
  line-height: 20px;
}
.remove-address {
  position: absolute;
  right: 5px;
  font-size: 14px;
}
.default-txt {
  margin-left: 5px;
  color: rgb(100, 98, 98);
  font-size: 14px;
}
.item-bottom-box {
  position: relative;
  height: 30px;
  width: 100%;

  line-height: 30px;
}
.item-bottom-box .fa {
  font-size: 18px;
  position: absolute;
  color: rgb(235, 97, 18);
  margin-left: 5px;
}
.select-address {
  display: inline-block;
  margin-left: 5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;

  border: 1px solid rgb(170, 169, 169);
}
.address-item-right {
  width: 15%;
  line-height: 80px;
  line-height: 80px;
  text-align: center;
  color: rgb(173, 170, 170);
}
.default-address {
  padding: 2px;
  margin-right: 5px;
  background-color: rgb(240, 222, 172);
  color: rgb(226, 142, 45);
  font-size: 12px;
}
.name-phone {
  width: 100%;
  line-height: 30px;
}
.phone {
  font-size: 14px;
  color: rgb(171, 173, 175);
}
.name {
  font-size: 17px;
  font-weight: 500;
  margin-right: 10px;
}
.address-item-middle {
  width: 70%;
}
.address-item-left .fa-home {
  color: rgb(238, 197, 147);
}
.address-item-left .fa-suitcase {
  color: rgb(76, 141, 238);
}
.address-item-left .fa-graduation-cap {
  color: rgb(34, 206, 212);
}
.address-item-left .fa {
  display: inline-block;
  width: 30px;

  font-size: 24px;
}
.address-item-left {
  text-align: center;
  height: 80px;
  line-height: 80px;
  width: 15%;
  border-radius: 50%;
}
.item-top-box {
  border-bottom: 1px solid rgb(219, 219, 219);
}
.address-item {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
}
.receiving-address-list {
  position: relative;
  top: 44px;
  box-sizing: border-box;
  padding: 10px 5px;
}
.my-address {
  width: 100vw;
  height: 100vh;
  background-color: rgb(245, 245, 245);
}
.add-address {
  position: fixed;
  bottom: 0;
  z-index: 100;
  background-color: #fff;
  width: 100%;
  height: 49px;
  text-align: center;
  line-height: 49px;
  font-size: 18px;
  color: rgb(85, 196, 240);
}
.add-address i {
  margin-right: 5px;
}
</style>