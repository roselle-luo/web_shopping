<template>
  <div class="body">
    <div class="cart-items-container">
      <h3>购物车</h3>
      <div class="item-container">
      <div v-for="item in addedItems" :key="item.id">
        <div class="card-container">
          <el-image class="item-image"
                    src="https://gw.alicdn.com/imgextra/i1/1641229099/O1CN01CWLdyX2H5OinggMwo_!!1641229099.jpg"></el-image>
          <div class="card-text-container">
            <h4 class="card-text">松下 Lumix DMC-FZ1000松下松下</h4>
          </div>
          <div class="card-price-container">
            <p>单价</p>
            <h4 class="price-text">¥4999.0</h4>
          </div>
          <div class="card-price-container">
            <p>总价</p>
            <h4 class="price-text">¥4999.0</h4>
          </div>
          <div class="edit-number-container">
            <p>数量</p>
            <el-input-number class="edit-number"></el-input-number>
          </div>
          <el-button color="red" icon="delete" class="card-delete-button">
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

const addedItems = ref([])
const singleItem = {
  id: 0,
  name: '松下 Lumix DMC-FZ1000松下松下',
  img: 'https://gw.alicdn.com/imgextra/i1/1641229099/O1CN01CWLdyX2H5OinggMwo_!!1641229099.jpg',
  price: '￥4999.0'
}

onMounted(() => {
  for (let i=0;i<50;i++) {
    addedItems.value.push({ ...singleItem, id: i });
  }
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
  width: 100px;
}

.card-text {
  overflow: auto;
}

.card-price-container {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
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