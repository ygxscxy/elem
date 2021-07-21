<template>
  <div>
    <div class="logon-login flex a-c">
      <img
        class="profile-user-icon"
        src="~/assets/image/profile/默认头像.png"
        alt=""
      />
      <div class="logon-login-text">
        <p v-if="userInfo.id">{{ encryptPhone(userInfo.id) }}</p>
        <p v-else><span @click="" handleLogin>登录/注册</span></p>
        <p class="flex a-c">
          <img
            src="~/assets/image/profile/手机.png"
            class="profile-phone"
            alt=""
          />
          <span v-if="userInfo.phone">{{ encryptPhone(userInfo.phone) }}</span>
          <span v-else>暂无绑定手机号</span>
        </p>
      </div>
      <p class="profile-gt">
        <span>&gt;</span>
      </p>
    </div>
    <div class="profile-price">
      <ul class="profile-price-ul flex a-c j-c-s-a">
        <li class="profile-price-li flex flex-column a-c">
          <p><span class="a-price">0.00</span><span>元</span></p>
          <p><span>我的余额</span></p>
        </li>
        <li class="profile-price-li flex flex-column a-c">
          <p><span class="a-price">0</span><span>个</span></p>
          <p><span>我的优惠</span></p>
        </li>
        <li class="profile-price-li-3 flex flex-column a-c">
          <p><span class="a-price">0</span><span>分</span></p>
          <p><span>我的积分</span></p>
        </li>
      </ul>
    </div>
    <div class="profile-msg">
      <ul>
        <li @click="handleMyAddress">
          <img src="~/assets/image/profile/定位.png" alt="" />
          <span>我的收获地址</span>
        </li>
        <li>
          <img src="~/assets/image/profile/消息.png" alt="" />
          <span>我的消息</span>
        </li>
        <li>
          <img src="~/assets/image/profile/积分.png" alt="" />
          <span>积分商城</span>
        </li>
        <li>
          <img src="~/assets/image/profile/会员卡.png" alt="" />
          <span>会员卡</span>
        </li>
      </ul>
    </div>
    <div class="profile-end">
      <ul>
        <li>
          <img src="~/assets/image/profile/购物车满.png" alt="" />
          <span>我的购物车</span>
        </li>
        <li>
          <img src="~/assets/image/profile/下载.png" alt="" />
          <span>下载饿了么App</span>
        </li>
      </ul>
    </div>
    <div v-if="userInfo" @click="handleLoginOut" class="out-login">
      <span>退出登录</span>
    </div>
  </div>
</template>

<script>
import HeaderNav from "components/common/header/HeaderNav.vue";
import { getHomeData } from "network/home/getHomeData.js";
import { MessageBox } from "mint-ui";
export default {
  components: {
    HeaderNav,
  },
  data() {
    return {
      userInfo: {},
    };
  },

  //路由守卫，每次进到路由都会执行
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getData();
    });
  },
  methods: {
    handleLogin() {
      this.$router.push("/login");
    },
    getData() {
      let phone = localStorage.isLogin;
      getHomeData({
        url: "/api/login",
        params: {
          phone: phone,
        },
      }).then((res) => {
        this.userInfo = res.data;

        // console.log(res.data);
      });
    },
    encryptPhone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    handleLoginOut() {
      MessageBox.confirm("确定退出吗?", "提示")
        .then((action) => {
          localStorage.removeItem("isLogin");
          this.$router.push("/login");
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    handleMyAddress() {
      if (this.userInfo) {
        this.$router.push("/myaddress");
      } else {
        this.$router.push("/addaddress");
      }
    },
  },
  mounted() {},
};
</script>

<style>
.out-login {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: rgb(221, 20, 20);
  background-color: #fff;
  margin-top: -5px;
  border-top: 10px solid rgb(241, 239, 239);
}
.profile-end img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: text-bottom;
}
.profile-end li {
  height: 40px;
  line-height: 40px;
  margin: 10px;
  border-bottom: 2px solid rgba(224, 221, 221, 0.3);
}
.profile-end li:nth-last-child(1) {
  border-bottom: none;
}

.profile-end span {
  font-size: 20px;
}

.profile-msg {
  border-bottom: 10px solid rgba(224, 221, 221, 0.3);
}
.profile-msg img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align: text-bottom;
}
.profile-msg li {
  height: 40px;
  line-height: 40px;
  margin: 10px;
  border-bottom: 2px solid rgba(224, 221, 221, 0.3);
}
.profile-msg li:nth-last-child(1) {
  border-bottom: none;
}
.profile-msg span {
  font-size: 20px;
}

.profile-price-ul {
  height: 80px;
  border-bottom: 10px solid rgba(224, 221, 221, 0.3);
}
.profile-price-li {
  width: 30%;
  border-right: 4px solid rgba(224, 221, 221, 0.3);
}
.profile-price-li-3 {
  width: 30%;
}
.profile-gt {
  font-size: 30px;
  position: absolute;
  right: 10px;
}
.profile-title {
  color: white;
}
.profile-user-icon {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  margin-left: 10px;
}
.profile-phone {
  width: 20px;
  height: 20px;
}
.logon-login {
  height: 150px;
  width: 100vw;
  background-color: rgb(0, 158, 239);
  color: white;
}
.logon-login-text p:nth-of-type(1) {
  font-size: 24px;
  margin-bottom: 8px;
}
.a-price {
  font-size: 24px;
  color: rgb(229, 128, 119);
}
</style>