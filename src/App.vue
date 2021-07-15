<template>
  <div id="app">
    <router-view></router-view>
    <TabBar :tabBarList="tabBarList"></TabBar>
  </div>
</template>

<script>
import TabBar from "components/common/tabBar/TabBar.vue";
export default {
  components: {
    TabBar,
  },

  methods: {
    getLocation() {
      const self = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息  精准定位
          // console.log(data);
          self.$store.dispatch("setPosition", data);
          self.$store.dispatch("setAddress", data.formattedAddress);
        }

        function onError(data) {
          // 定位出错    非精准定位
          // console.log(data);
          self.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      const self = this;
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            // console.log(result);
            AMap.plugin("AMap.Geocoder", function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode,
              });

              var lnglat = result.rectangle.split(";")[0].split(",");

              geocoder.getAddress(lnglat, function (status, data) {
                if (status === "complete" && data.info === "OK") {
                  // result为对应的地理位置详细信息
                  // console.log(data);
                  self.$store.dispatch("setPosition", {
                    addressComponent: {
                      city: result.city,
                      province: result.province,
                    },
                    formattedAddress: data.regeocode.formattedAddress,
                  });

                  self.$store.dispatch(
                    "setAddress",
                    data.regeocode.formattedAddress
                  );
                }
              });
            });
          }
        });
      });
    },
  },

  data() {
    return {
      tabBarList: [
        {
          tabBarItemText: "首页",
          tabBarImg: "home",
          path: "/home",
        },
        {
          tabBarItemText: "订单",
          tabBarImg: "file-text-o",
          path: "/order",
        },
        {
          tabBarItemText: "我的",
          tabBarImg: "user",
          path: "/profile",
        },
      ],
    };
  },
  created() {
    this.getLocation();
    this.getLngLatLocation();
  },
};
</script>

<style>
#app {
}
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  height: 49px;
}
</style>
