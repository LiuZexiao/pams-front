import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import NProgress from "nprogress"; //页面请求进度条
import "nprogress/nprogress.css";
// import { store, key } from './store';
import * as Icons from "@element-plus/icons"; //
axios.defaults.baseURL = import.meta.env.VITE_APP_URL;
axios.interceptors.request.use((config) => {  // axios请求拦截器
  config.headers.Authorization = window.sessionStorage.getItem("token"); // 请求中添加token
  NProgress.start(); // 请求时开启进度条
  return config;
});
axios.interceptors.response.use((config) => {  // axios响应拦截器
 
  NProgress.done(); // 响应时关闭进度条
  return config;
});
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");

// 注册全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
