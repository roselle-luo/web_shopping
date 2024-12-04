import {createApp} from 'vue';
import App from './App.vue';
import router from "@/router/router";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import HttpPlugin from "@/utils/internet";
import instance from "@/utils/internet";
import store from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

app.config.globalProperties.$axios = instance();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app
    .use(router)
    .use(ElementPlus)
    .use(HttpPlugin)
    .use(store)
    .mount('#app')