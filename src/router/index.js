import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* 路由懒加载 */
const Login = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')
const Profile = () => import('views/profile/Profile.vue')
const Order = () => import('views/order/Order.vue')
const Address = () => import("views/address/Address.vue")
const CityList = () => import("views/cityList/CityList.vue")
const Search = () => import("views/search/Search.vue")
const StoreDetail = () => import("views/storeDetail/StoreDetail.vue")
const ChoiseFood = () => import("views/storeDetail/storeChildComp/ChoiseFood.vue")
const Comment = () => import("views/storeDetail/storeChildComp/Comment.vue")
const StoreInfo = () => import("views/storeDetail/storeChildComp/StoreInfo.vue")
const AddAddress = () => import("../views/profile/myAddress/AddAddress.vue")
const MyAddress = () => import("../views/profile/myAddress/MyAddress.vue")

const routes = [
  { path: "/home", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  {
    path: "/profile", name: "profile", component: Profile,
  },
  { path: "/myaddress", name: "myaddress", component: MyAddress },
  { path: "/addaddress", name: "addaddress", component: AddAddress },
  { path: "/order", name: "order", component: Order },
  { path: "/address", name: "address", component: Address },
  { path: "/citylist", name: "cityList", component: CityList },
  { path: "/search", name: "search", component: Search },
  {
    path: "/storedetail", name: "storedetail", component: StoreDetail,
    redirect: "/storedetail/choisefood",
    children: [
      { path: "choisefood", name: "ChoiseFood", component: ChoiseFood },
      { path: "comment", name: "comment", component: Comment },
      { path: "storeinfo", name: "storeinfo", component: StoreInfo },
    ]
  },
  {
    path: "/gosettlement", name: "settlement", component: () => import("../views/settlement/Settlement.vue")
  },
  {
    path: "/remarksinfo", name: "remarksinfo", component: () => import("../views/remarksInfo/RemarksInfo.vue")
  },
  {
    path: "/pay", name: "pay", component: () => import("../views/pay/Pay.vue")
  },
  { path: "/", redirect: "/home" },

]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

// 路由守卫 
router.beforeEach((to, from, next) => {
  //localStorage会可以将第一次请求的数据直接存储到本地
  /* 
  存放数据键值对到本地：
    localStorage.setItem("键值",数据)
    localStorage.键值
  取出存放在本地的数据：
    localStorage.getItem("键值")
  删除键值对
    localStorage.clear() 清空
    localStorage.removeItem("键值");　　
  */
  // 保存用户状态
  const isLogin = localStorage.getItem("isLogin") ? true : false
  // 验证用户登录
  if (to.path.includes('/log')) {
    // 退出登录
    localStorage.removeItem("isLogin");
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next('/login');
  }
})

export default router
