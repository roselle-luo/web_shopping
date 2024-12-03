<template>
    <div class="grid-container">
      <div v-for="item in products" :key="item.id" class="grid-item">
        <img :src="`http://10.60.81.45:8080/${item.pthumbnail}`" class="product-image" alt="商品图片"/>
        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <div class="product-info-container">
            <p>¥{{ item.price1 }}</p>
            <el-button class="el-button">添加</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getLists} from "@/utils/apis";

const products = ref([]);

const getItems = async () => {
  products.value = await getLists()
}

onMounted(() => {
  getItems()
});

</script>

<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 3 列，每列平分宽度 */
  gap: 40px; /* 设置网格间距 */
  padding: 40px 100px;
}

.grid-item {
  padding: 15px;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  transition: transform 0.2s;
  border: 1px solid #ccc;
}

.grid-item:hover {
  transform: translateY(-5px); /* 鼠标悬停效果 */
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  text-align: center;
  padding: 10px;
}

.product-info h3 {
  font-size: 16px;
  margin: 10px 0;
  height: 30px;
}

.product-info-container {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
  padding-top: 10px;
  direction: ltr;
}

.product-info p {
  font-size: 20px;
  color: #f88a2f;
}

.el-button {
  background: #4ea0f4;
  color: white;
}

</style>
