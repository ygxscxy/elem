<template>
  <div class="login">
    <div class="login-logo">
      <img src="~assets/logo.jpg" alt="" />
    </div>

    <!-- 手机号 -->
    <InputComp
      type="number"
      v-model="phone"
      placeholder="手机号"
      :getCodeBtnTitle="getCodeBtnTitle"
      :isDisabled="isDisabled"
      :error="error.phone"
      :isShow="isShow"
      @getCodeClick="getCodeClick"
      @inputHandle="inputPhoneHandle"
    ></InputComp>
    <!-- 密码 -->
    <InputComp
      type="number"
      v-model="userInputCode"
      placeholder="验证码"
      :error="error.code"
      @inputHandle="inputCodeHandle"
    ></InputComp>
    <!-- 用户服务协议 -->
    <div class="user-agreement">
      <p>
        <input type="checkbox" name="agreement" v-model="isAgree" />
        <span>
          新用户登录或者注册需同意
          <a href="http://www.189.cn/yhxy/"> 《用户服务协议》 </a>
        </span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <button
      class="login-btn"
      :class="{ 'is-click': isClick }"
      :disabled="!isClick"
      :style="{ backgroundColor: isClick ? '#48ca38' : '#aaa' }"
      @click="loginHandle"
    >
      登录
    </button>
  </div>
</template>

<script>
import InputComp from "components/common/inputComp/InputComp.vue";
import { getHomeData } from "network/home/getHomeData.js";
import getCode from "network/phoneMessage/getMessage.js";

export default {
  data() {
    return {
      phone: "",
      error: {},
      getCodeBtnTitle: "获取验证码",
      isDisabled: true,
      isShow: true,
      phoneMessage: "",
      userInputCode: "",
      isAgree: false,
    };
  },
  components: {
    InputComp,
  },
  computed: {
    isClick() {
      if (this.phone && this.userInputCode && this.isAgree) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    loginHandle() {
      // 取消错误提醒
      this.error = {};
      // 判断验证码
      if (this.userInputCode !== this.phoneMessage) {
        this.error.code = "验证码错误";
      } else {
        getHomeData({
          url: "/api/login",
          params: {
            phone: this.phone,
          },
        }).then((res) => {
          console.log(res.data);
          if (res.data) {
            localStorage.setItem("isLogin", res.data.id);
            this.$router.push("/");
          } else {
            alert("服务器繁忙请重试~");
          }
        });
      }
    },
    // 倒计时
    countDown(time) {
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.getCodeBtnTitle = "获取验证码";
          this.isDisabled = false;
        } else {
          this.getCodeBtnTitle = time + "秒后重试";
          this.isDisabled = true;
          time--;
        }
      }, 1000);
    },
    // 验证手机号码
    testPhone() {
      let phone = this.phone;

      if (!phone) {
        this.error = { phone: "手机号不能为空!" };
        return false;
      } else if (!/^1[35789]\d{9}/.test(phone)) {
        this.error = { phone: "手机号码格式错误" };
        return false;
      } else {
        this.error.phone = null;
        return true;
      }
    },
    // 发送网络请求,获取验证码
    getCodeClick() {
      if (this.testPhone()) {
        // 发送网络请求
        this.countDown(60);
        this.phoneMessage = getCode();
        setTimeout(() => {
          alert(`手机号:${this.phone},验证码:${this.phoneMessage}`);
        }, 3000);
      }
    },
    inputPhoneHandle(phone) {
      this.phone = phone;
      if (this.phone) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    inputCodeHandle(code) {
      this.userInputCode = code;
      if (this.phoneMessage === code) {
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.login-logo {
  text-align: center;
}

.login-logo img {
  width: 150px;
}
.input-box,
.input-content,
.user-agreement {
  margin-top: 20px;
}
.user-agreement p {
  color: #aaa;
  font-size: 13px;
}
.user-agreement a {
  color: #4d90fe;
}

.login-btn {
  margin-top: 20px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
</style>