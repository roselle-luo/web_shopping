import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import HttpPlugin from "@/store/internet";
import axios from "axios";


const app = createApp(App);

axios.defaults.baseURL = 'https://api.example.com'; // 替换成你实际的 API 地址
axios.defaults.headers.common['Authorization'] = 'Bearer YOUR_TOKEN'; // 如果需要设置认证 token
app.config.globalProperties.$axios = axios;

app
    .use(router)
    .use(ElementPlus)
    .use(HttpPlugin)
    .mount('#app')