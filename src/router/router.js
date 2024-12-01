import { createRouter, createWebHistory } from 'vue-router';
import ShoppingCart from "@/components/ShoppingCart.vue";
import CheckList from "@/components/CheckList.vue";
import LoginPage from "@/components/LoginPage.vue";

const routes = [
    {   path: '/',
        name: 'LoginPage',
        component: LoginPage },
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
