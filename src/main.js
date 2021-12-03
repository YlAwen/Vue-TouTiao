import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// 加载 Vant 核心组件库
import Vant from "vant";
// 加载 Vant 全局样式
import "vant/lib/index.css";
// 加载全局样式
import "./styles/index.less";
// 加载dayjs修改语言
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
// 加载配置相对时间插件
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
axios.defaults.baseURL = "http://toutiao.itheima.net/";
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state;
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});
// 注册使用 Vant 组件库
Vue.use(Vant);
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
