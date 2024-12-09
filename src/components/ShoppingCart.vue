<template>
  <div class="body">
    <div class="cart-items-container">
      <h3>购物车</h3>
      <el-card class="item-container">
        <el-button type="danger" text @click="selectAll">一键全选</el-button>
        <div v-for="item in addedItems" :key="item.id">
          <div class="card-container">
            <div class="image-container">
              <input type="checkbox" v-model="item.selected" :value="item.id" @change="updateTotalPrice" class="card-checkbox">
              <el-image class="item-image"
                        :src="`http://10.60.81.45:8080/${item.thumbnail}`"></el-image>
            </div>
            <div class="content-container">
              <h4>{{ item.name }}</h4>
            </div>
            <div class="content-container">
              <h4 class="price-text">¥{{ item.price }}</h4>
            </div>
            <div class="content-container">
              <el-input-number v-model="item.num" :min="1"
                               @change="changeItemNumber(userId, item.goodsId, item.num, parseInt(item.num) * item.singlePrice)"
                               size="large" class="edit-number"></el-input-number>
            </div>
            <div class="content-container">
              <el-button color="red" icon="delete" class="card-delete-button" @click="delete1(item.cardid)">
                删除
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="fixed-footer">
      <div class="foot-body">
        <div class="price-container">
          <h3>总价：￥{{ totalPrice }} 元</h3>
        </div>
        <div class="settle-container">
          <el-button icon="delete" round color="black" @click="confirmDelete">一键清除所选</el-button>
          <div style="width: 50px;"></div>
          <el-button icon="shop" color="red" @click="confirmSettleAll">结算</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>

import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {deleteItem, generateList, getUserAddedItems, setItemNumber} from "@/utils/apis";
import {ElMessage, ElMessageBox} from "element-plus";

const addedItems = ref([])
const store = useStore()
const userId = store.state.user.userId
const totalPrice = ref(0.0)

const delete1 = async (cardId) => {
  await deleteItem(store.state.user.userId, cardId)
  await getItems()
}

const changeItemNumber = async (userId, goodsId, number, price) => {
  await setItemNumber(userId, goodsId, number, price)
  await getItems()
}

const getItems = async () => {
  addedItems.value = await getUserAddedItems(store.state.user.userId)
  totalPrice.value = 0
  updateTotalPrice()
  totalPrice.value = parseFloat(totalPrice.value.toFixed(1))
  console.log(totalPrice.value)
}

const updateTotalPrice = () => {
  totalPrice.value = 0
  addedItems.value.forEach((item) => {
    item.singlePrice = parseInt(item.price) / parseInt(item.num)
    if (item.selected) {
      totalPrice.value += parseInt(item.price)
    }
  })
}

const selectAll = () => {
  addedItems.value.forEach((item) => {
    item.selected = true
  })
  updateTotalPrice()
}

const deleteSelected = async () => {
  const promises = addedItems.value
      .filter(item => item.selected) // 先筛选出选中的项
      .map(item => delete1(item.cardid)) // 为每个选中的项创建 Promise
  if (promises.length > 0) {
    try {
      await Promise.all(promises);
      ElMessage.success('删除成功');
    } catch (error) {
      ElMessage.error('删除失败:', error);
    }
  } else {
    ElMessage.error('还未选择任何商品哦！')
  }
}

const confirmDelete = () => {
  ElMessageBox.confirm(
      '你确定要删除全部所选内容吗',
      '确定删除',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await deleteSelected()
      })
      .catch(() => {
      })
}

const confirmSettleAll = () => {
  ElMessageBox.confirm(
      '确定进行结算操作吗？',
      '确定结算',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        await settleAll()
      })
      .catch(() => {
      })
}

const settleAll = async () => {
  const cartIdList = addedItems.value
      .filter(item => item.selected === true) // 筛选出符合条件的子项
      .map(item => item.cardid) // 提取每个符合条件子项的 id
      .join(',') //以逗号分隔每个id
  console.log(cartIdList)
  if (cartIdList === '') {
    ElMessage.error('未选择商品！')
    return
  }
  const response = await generateList(userId, cartIdList)
  if (response != null) {
    ElMessage.success('结算成功')
  }
  await getItems()
}

onMounted(async () => {
  await getItems()
})

</script>

<style scoped>

.body {
  display: flex;
  width: 100%;
  padding: 25px 0;
}

.cart-items-container {
  flex: 1;
  margin: 0 50px;
  margin-bottom: 70px;
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

.image-container {
  width: 200px;
  display: flex;
}

.content-container {
  display: flex;
  flex: 1;
  margin: auto 0;
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
}

.price-text {
  margin: auto 0;
  color: orangered;
  font-size: large;
}

.edit-number {
  margin: auto 0;
  color: #f84802;
}

.card-delete-button {
  margin: auto 0;
  margin-left: auto;
}

.fixed-footer {
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 65px;
  opacity: 1;
  text-align: center;
}

.foot-body {
  display: flex;
  width: 100%;
}

.price-container {
  margin: auto 25px;
}

.price-container h3 {
  color: #f84802;
}

.settle-container {
  display: flex;
  margin: auto 25px;
  margin-left: auto;
}

</style>