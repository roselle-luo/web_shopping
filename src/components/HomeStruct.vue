<template>
  <el-menu
      :default-active='activeIndex'
      class="header-style"
      mode="horizontal"
      text-color="black"
      background-color="white"
      active-text-color="#fd6506"
      :ellipsis="false"
  >
    <el-menu-item index="1" class="menu-item-style" @click="toItems">商品首页</el-menu-item>
    <el-menu-item index="2" class="menu-item-style" @click="toCart">购物车</el-menu-item>
    <el-menu-item index="3" class="menu-item-style" @click="toLists">订单列表</el-menu-item>
    <div class="">
      <el-container v-if="store.state.user.userId != null" class="menu-right">{{store.state.user.username}}</el-container>
      <el-container v-else class="menu-right">未登录</el-container>
    </div>
  </el-menu>

  <router-view>
  </router-view>

</template>

<script setup>

import router from "@/router/router";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";

const route = useRoute()
const store = useStore()
const activeIndex = ref('1');

const toItems = () => {
  router.replace('/items')
  activeIndex.value = '1'
}
const toCart = () => {
  router.replace('/shopping-cart')
  activeIndex.value = '2'
}
const toLists= () => {
  router.replace('/check-list')
  activeIndex.value = '3'
}

watch(
    () => route.path,
    (newPath) => {
      if (newPath === '/items') {
        activeIndex.value = '1';
      } else if (newPath === '/shopping-cart') {
        activeIndex.value = '2';
      } else if (newPath === '/check-list') {
        activeIndex.value = '3';
      }
    },
    { immediate: true } // 立即执行一次，确保初始化时同步
);

</script>

<style scoped>

.el-menu--horizontal > .el-menu-item:nth-child(3) {
  margin-right: auto;
}

.header-style {
  width: 100%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* 头部轻微阴影 */
  display: flex;
  align-items: center;
  padding: 0 80px;
  height: 70px;
}

.menu-item-style {
  font-size: large;
}

.menu-right {
  font-size: large;
  display: flex;
  justify-items: center;
  margin: 0 40px;
}

.menu-user-style {
  font-size: large;
  height: 100%;
  justify-items: center;
  margin: 0 40px;
}

</style>