import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import HttpPlugin from "@/utils/internet";
import instance from "@/utils/internet";
import store from './store';


const app = createApp(App);

app.config.globalProperties.$axios = instance();

app
    .use(router)
    .use(ElementPlus)
    .use(HttpPlugin)
    .use(store)
    .mount('#app')