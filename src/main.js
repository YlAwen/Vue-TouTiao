import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less"; // 全局样式
import Vant from "vant"; // vant组件库
import "vant/lib/index.css"; // vant样式
Vue.config.productionTip = false;
Vue.use(Vant); // 注册使用vant组件库
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
