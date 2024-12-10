<template>
  <div class="body">
    <h2 class="title-style">订单列表</h2>
    <div class="setting-container">
      <el-select v-model="sortWay" placeholder="Select" class="select-style" @change="changeSortWay(sortWay)">
        <el-option
            v-for="item in sortWays"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <div class="search-box">
        <input
            type="text"
            v-model="searchWord"
            class="search-input"
            placeholder="请输入搜索内容..."
        />
        <el-button size="small" class="search-button" @click="search(searchWord)" icon="Search">
          搜索
        </el-button>
      </div>
      <div class="reset-box">
        <el-button size="small" class="reset-button" color="orangered" @click="reset" icon="refresh">
          重置
        </el-button>
      </div>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <div v-for="order in currentPageOrders" :key="order.id">
        <el-collapse-item class="collapse-container">
          <template #title>
            <div class="title-container">
              <div>
                <p class="order-id-text">订单流水号: <span class="highlight">{{ order.id }}</span></p>
              </div>
              <div class="create-time-box">
                <p class="create-time-text">创建时间： <span class="highlight">{{ formatTime(order.orderTime) }}</span>
                </p>
              </div>
            </div>
          </template>
          <table class="order-table">
            <thead>
            <tr>
              <th>商品名称</th>
              <th>数量</th>
              <th>单价</th>
              <th>总价</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="items in order.orderDetail" :key="items.id">
              <td>{{ items.goodsName }}</td>
              <td>{{ items.num }}</td>
              <td>¥{{ items.dealPrice }}</td>
              <td>¥{{ items.totalPrice }}</td>
            </tr>
            </tbody>
          </table>
          <div style="height: 20px"></div>
          <h3 style="margin-left: 5px">总支付：<span class="highlight">￥{{ order.totalPrice }}元</span></h3>
        </el-collapse-item>
        <div class="spacer"></div>
      </div>
    </el-collapse>
    <el-pagination background class="bottom-navigator" layout="prev, pager, next, total" :total='length' v-model:current-page="currentPage" @current-change="updatePage(currentPage)"/>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useStore} from "vuex";
import {getAllLists} from "@/utils/apis";
import {ElMessage} from "element-plus";

const activeNames = ref(["1"]);
const currentPage = ref(1)
const currentPageOrders = ref([])
const orders = ref([]);
const length = ref(0);
let copyOrders = [];
const store = useStore();
const userId = store.state.user.userId;
const searchWord = ref('')
const sortWay = ref(1)
const sortWays = ref([
  {
    value: 1,
    label: '默认',
  },
  {
    value: 2,
    label: '按创建时间升序  ↑',
  },
  {
    value: 3,
    label: '按创建时间降序  ↓',
  },
  {
    value: 4,
    label: '按商品总价升序  ↑',
  },
  {
    value: 5,
    label: '按商品总价降序  ↓',
  },
])

const changeSortWay = (sortNum) => {
  switch (sortNum) {
    case 1:
      orders.value = [...copyOrders]
      updatePage(currentPage.value)
      return
    case 2:
      upOrderByTime()
      updatePage(currentPage.value)
      return;
    case 3:
      downOrderByTime()
      updatePage(currentPage.value)
      return;
    case 4:
      upOrderByTotalPrice()
      updatePage(currentPage.value)
      return;
    case 5:
      downOrderByTotalPrice()
      updatePage(currentPage.value)
      return;
  }
}

const upOrderByTime = () => orders.value.sort((a, b) => new Date(a.orderTime) - new Date(b.orderTime));

const downOrderByTime = () => orders.value.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));

const upOrderByTotalPrice = () => orders.value.sort((a, b) => new Date(a.totalPrice) - new Date(b.totalPrice));

const downOrderByTotalPrice = () => orders.value.sort((a, b) => new Date(b.totalPrice) - new Date(a.totalPrice));

const reset = () => {
  searchWord.value = ''
  orders.value = [...copyOrders]
  updatePage(currentPage.value)
}

const search = (keyWord) => {
  if (keyWord === '') {
    ElMessage.error('请输入有效内容')
    return
  }
  orders.value = copyOrders.filter(item =>
      ['id', 'formatDate'].some(key =>
          String(item[key])?.toLowerCase().includes(keyWord.toLowerCase())
      )
  )
  updatePage(currentPage.value)
}

const formatTime = (dateStr) => {
  const weekDay = mapperDay(dateStr.split(' ')[0]);
  return formatDate(dateStr) + ' ' + weekDay
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC'
  }).format(date)
}

const mapperDay = (weekDay) => {
  switch (weekDay) {
    case 'Mon':
      return '星期一'
    case 'Tue':
      return '星期二'
    case 'Wed':
      return '星期三'
    case 'Thu':
      return '星期四'
    case 'Fri':
      return '星期五'
    case 'Sat':
      return '星期六'
    case 'Sun':
      return '星期日'
    default:
      return '星期'
  }
}

const calTotalPrice = (item) => {
  const num = parseInt(item.num)
  const dealPrice = parseInt(item.dealPrice)
  return num * dealPrice
}

const updatePage = (page) => {
  currentPageOrders.value = orders.value.slice((page - 1) * 10, 10 + (page - 1) * 10)
  length.value = orders.value.length
}

onMounted(async () => {
  console.log(userId)
  orders.value = await getAllLists(userId);
  length.value = orders.value.length
  console.log(length.value)
  orders.value.forEach((item) => {
    item.totalPrice = 0
    item.orderDetail.forEach((e) => {
      const numbers = e.nums.match(/[\d.]+/g);
      e.num = numbers[0]
      e.dealPrice = numbers[1]
      e.totalPrice = calTotalPrice(e)
      item.totalPrice += e.totalPrice
      item.formatDate = formatDate(item.orderTime)
    })
  })
  copyOrders = [...orders.value]
  updatePage(currentPage.value)
});
</script>

<style scoped>
.body {
  padding: 15px 10px;
  margin-bottom: 20px;
}

.title-style {
  font-size: 28px;
  font-family: "Arial", sans-serif;
  margin: 0;
  margin-bottom: 15px;
  color: #fd6506;
  text-align: center;
  padding-bottom: 10px;
}

.bottom-navigator {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  align-items: center;
}

.setting-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  width: 100%;
  margin-bottom: 25px;
}

.select-style {
  width: 15%;
  height: 40px; /* 设置和搜索框一致的高度 */
}

.search-box {
  width: 30%;
  display: flex;
  align-items: center; /* 搜索框内容垂直居中 */
  border: 1px solid grey;
  border-radius: 5px;
  height: 40px;
  margin-left: auto;
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
  margin: auto 10px;
  line-height: normal;
}

.reset-button {
  margin: auto 10px; /* 按钮水平居中 */
  line-height: normal; /* 确保文字不超出按钮 */
}

.collapse-container {
  padding: 10px;
  background: rgba(255, 255, 255, 0.7); /* 半透明背景 */
  border: 2px solid lightgrey; /* 半透明边框 */
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 立体阴影 */
}

.title-container {
  width: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.order-id-text,
.create-time-text {
  font-size: 14px;
  color: #555;
}

.highlight {
  font-weight: bold;
  color: #fd6506;
}

.create-time-box {
  margin-left: auto;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #ffffff;
  text-align: center;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加表格整体阴影 */
}

.order-table th,
.order-table td {
  padding: 10px 15px; /* 增加内边距让内容更清晰 */
  border: 1px solid #dddddd; /* 边框颜色鲜明 */
}

.order-table th {
  background-color: #fd5c06; /* 表头背景色改为亮橙色 */
  font-weight: bold;
  color: #ffffff; /* 表头文字颜色改为白色 */
  text-transform: uppercase; /* 全部文字大写 */
  letter-spacing: 0.5px; /* 增加字符间距 */
}

.order-table tr:nth-child(even) {
  background-color: #fdd1c9; /* 偶数行背景色改为柔和的橙色 */
}

.order-table tr:nth-child(odd) {
  background-color: #ffffff; /* 奇数行背景色保持白色 */
}

.order-table tr:hover {
  background-color: #fa6b08;
  transition: background-color 0.3s ease;
}

.order-table td {
  color: #333; /* 表格内容文字颜色 */
  font-weight: 500; /* 文字稍微加粗 */
}

.order-table th:first-child,
.order-table td:first-child {
  text-align: center; /* 首列内容居中 */
}

.spacer {
  height: 10px;
}
</style>
