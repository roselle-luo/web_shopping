import { createRouter, createWebHistory } from 'vue-router';
import ShoppingCart from "@/components/ShoppingCart.vue";
import CheckList from "@/components/CheckList.vue";
import LoginPage from "@/components/LoginPage.vue";
import ItemPage from "@/components/ItemPage.vue";
import HomeStruct from "@/components/HomeStruct.vue";

const routes = [
    {   path: '/',
        name: 'LoginPage',
        component: LoginPage },
    {
        path: '/home',
        name: 'HomePage',
        component: HomeStruct,
        children: [
            {
                path: '',  // 空路径表示默认子路由
                component: ItemPage
            },
            {
                path: '/items',
                name: 'ItemsList',
                component: ItemPage
            },
            {
                path: '/shopping-cart',
                name: 'ShoppingCart',
                component: ShoppingCart,
            },
            {
                path: '/check-list',
                name: 'CheckList',
                component: CheckList,
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
