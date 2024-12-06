<template>
  <div class="body">
    <div class="cart-items-container">
      <h3>购物车</h3>
      <div class="item-container">
      <div v-for="item in addedItems" :key="item.id">
        <div class="card-container">
          <input type="checkbox" name="isSelected" value='false' class="card-checkbox">
          <el-image class="item-image"
                    :src="`http://10.60.81.45:8080/${item.thumbnail}`"></el-image>
          <div class="card-text-container">
            <h4 class="card-text">{{ item.name }}</h4>
          </div>
          <div class="card-price-container">
            <p class="price-title">单价</p>
            <h4 class="price-text">¥{{item.price}}</h4>
          </div>
          <div class="card-price-container">
            <p class="price-title">总价</p>
            <h4 class="price-text">¥{{ item.price }}</h4>
          </div>
          <div class="edit-number-container">
            <p class="price-title">数量</p>
            <el-input-number class="edit-number"></el-input-number>
          </div>
          <el-button color="red" icon="delete" class="card-delete-button" @click="delete1(item.cardid)">
            删除
          </el-button>
        </div>
      </div>
      </div>
    </div>
    <div class="calculate-container">
      结算
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {deleteItem, getUserAddedItems} from "@/utils/apis";

const addedItems = ref([])
const store = useStore()

const delete1 = async (cardId) => {
  await deleteItem(store.state.user.userId, cardId)
  addedItems.value = await getUserAddedItems(store.state.user.userId)
}

onMounted( async () => {
   addedItems.value = await getUserAddedItems(store.state.user.userId)
   console.log(addedItems.value)
})

</script>

<style scoped>

.body {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 25px 100px;
}

.cart-items-container {
  flex: 2;
}

.cart-items-container h3 {
  font-size: 45px;
  font-weight: bolder;
  color: orangered;
  font-family: "Brush Script MT", cursive;
  margin-bottom: 15px;
}

.item-container {
  border: 2px solid #f84802; /* 边框颜色和宽度 */
  border-radius: 12px; /* 可选：圆角，0 表示直角 */
  padding: 5px;
}

.card-container {
  display: flex;
  padding: 15px;
}

.card-checkbox {
  width: 20px;
  height: 20px;
  margin: auto 0;
  accent-color: orangered;
}

.item-image {
  width: 100px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  margin: 0 20px;
  margin-right: 40px;
}

.card-text-container {
  margin: auto 0;
  width: 120px;
}

.card-text {
  overflow: auto;
}

.card-price-container {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.price-title {
  margin: 0 auto;
}

.price-text {
  margin: auto 0;
  color: orangered;
  font-size: large;
}

.edit-number-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.edit-number {
  margin: auto 0;
}

.card-delete-button {
  margin: auto 0;
  margin-left: auto;
}

.calculate-container {
  flex: 1;
  margin-left: 100px;
}

</style>