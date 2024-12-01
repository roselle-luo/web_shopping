<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 左侧图片区域 -->
      <div class="welcome-section">
        <img src="../../public/cart.svg" alt="Welcome" class="left-cart-img"/>
      </div>
      <!-- 右侧登录表单 -->
      <div class="login-form-section">
        <div class="login-title">Welcome！</div>
        <div class="login-subtitle">Pleas Sign in Your Account Firstly</div>
        <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
          <el-form-item prop="username">
            <el-input
                v-model="loginForm.username"
                placeholder="用户名"
                style="margin-bottom: 10px"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="密码"
                :show-password="true"
                clearable
            />
          </el-form-item>
          <div class="button-box">
            <el-button type="primary" round class="login-button" size="large" @click="onSubmit">
              登录
            </el-button>
            <el-button type="primary" round size="large" class="register-button">
              注册
            </el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";

const loginForm = ref({
  username: '',
  password: '',
  remember: false,
});

const apiClient = axios.create({
  baseURL: '/api', // 使用代理
  timeout: 10000,  // 超时设置
});

const loading = ref(false)

const login = async (username, password) => {
  loading.value = true
  const params =  {
    name: username,
    password: password
  }
  try {
    const response = await apiClient.get('/user/register', {params: params})
    console.log(response.data)
    return response.data
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}


const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};

const loginFormRef = ref(null);
loginFormRef.value = undefined;

const onSubmit = () => {
  loginFormRef.value.validate( async (valid) => {
    if (valid) {
      const response = await login(loginForm.value.username, loginForm.value.password)
      ElMessage.success(response)
    } else {
      ElMessage.error('请按要求填写账号密码');
    }
  });
};

</script>

<style scoped>

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  font-family: Arial, sans-serif;
}

.login-container {
  display: flex;
  background: rgba(255, 255, 255, 0.85); /* 整体透明度 */
  border-radius: 25px;
  width: 80vw; /* 宽度占屏幕宽度的 50% */
  height: 80vh; /* 高度占屏幕高度的 30% */
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.welcome-section {
  flex: 1.3;
  background: rgba(245, 245, 245, 0.5); /* 高透明度背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px;
}

.left-cart-img {
  max-width: 130%;
  height: auto;
}

.login-form-section {
  flex: 1;
  padding: 60px;
  background: white;
  border-radius: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 36px;
  text-align: center;
  color: #4e93dc;
  margin-bottom: 20px;
}

.login-subtitle {
  color: #9cc6f1;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.button-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  width: 100%;
}

.input-field {
  border-radius: 28px; /* 设置圆角 */
}

.login-button,
.register-button {
  flex: 1;
  text-align: center;
}

.login-button {
  background-color: #2a89f1;
  border: none;
  color: white;
  letter-spacing: 4px;
}

.register-button {
  background-color: white;
  border: 2px solid #2a89f1;
  letter-spacing: 4px;
  color: #075dbc;
}

</style>
