<template>
  <div class="search-area">
    <div class="search-box">
      <input
          type="text"
          v-model="query"
          class="search-input"
          placeholder="请输入搜索内容..."
      />
      <button class="search-button" @click="search">
        搜索
      </button>
    </div>
    <el-icon class="refresh-icon" size="30px" @click="reset">
      <refresh />
    </el-icon>
  </div>
  <div class="grid-container">
    <div v-for="item in searchedItems" :key="item.id" class="grid-item">
      <img :src="`http://10.60.81.45:8080/${item.pthumbnail}`" class="product-image" alt="商品图片"/>
      <div class="product-info">
        <h3>{{ item.name }}</h3>
        <div class="product-info-container">
          <p>¥{{ item.price1 }}</p>
          <el-button color="#fd4806" @click="addItem(store.state.user.userId, item.id, item.price1)">添加</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {addItemNumber, getLists} from "@/utils/apis";
import {Refresh} from "@element-plus/icons-vue";
import {ElLoading, ElMessage} from "element-plus";
import {useStore} from "vuex";

const products = ref([]);
const searchedItems = ref([]);
const query = ref('')
const addLoading = ref(false)
const store = useStore()

const getItems = async () => {
  products.value = await getLists()
  searchedItems.value = products.value
};

const searchItems = (keyword) => {
  return products.value.filter(item =>
      ['name', 'price1'].some(key =>
          String(item[key])?.toLowerCase().includes(keyword.toLowerCase())
      )
  )
};

const search = () => {
  if (query.value !== "") {
    searchedItems.value = searchItems(query.value);
  } else {
    ElMessage.error('请输入有效内容',)
  }
}

const reset = () => {
  query.value = ''
  searchedItems.value = products.value
}

const addItem = async (userId, goodsId, price) => {
  if (!addLoading.value) {
    addLoading.value = true;
    const loadingInstance = ElLoading.service({
      lock: true,
      text: '正在添加中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
      const response = await addItemNumber(userId, goodsId, price);
      console.log(response);
    } catch (error) {
      console.error('添加商品失败:', error);
    } finally {
      addLoading.value = false;
      loadingInstance.close();
    }
  } else {
    ElMessage.info('正在添加中...');
  }
};

onMounted(() => {
  getItems()
});

</script>

<style scoped>

.search-area {
  display: flex;
  margin-top: 20px;
  justify-content: center;
  justify-items: center;
}

 .search-box {
   width: 60%;
   display: flex;
   border: 3px solid #fd6506;
   border-radius: 12px;
   height: 50px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 }

.search-input {
  flex: 1;
  padding: 0 8px;
  border-radius: 12px;
  border: transparent;
  outline: none; /* 去除点击后的聚焦边框 */
  font-size: 14px;
}

.search-input:focus {
  border: 3px solid transparent;
}

.search-button {
  margin: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #fd6506; /* 按钮浅蓝色 */
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s; /* 添加阴影和缩放的过渡效果 */
}

.search-button:hover {
  background-color: #fd6506;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  transform: scale(1.05); /* 轻微缩放效果 */
}

.refresh-icon {
  height: 50px;
  width: 50px;
  margin-left: 10px;
  color: #fb7514;
}

.refresh-icon:hover {
  margin-left: 10px;
  color: #fb7514;
  transform: scale(1.2); /* 轻微缩放效果 */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 3 列，每列平分宽度 */
  gap: 40px; /* 设置网格间距 */
  padding: 20px 100px;
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
  background: #fd4806;
  color: white;
}

</style>
