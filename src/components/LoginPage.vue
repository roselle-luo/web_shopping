<template>
  <div class="login-page">
    <div class="login-container">
      <!-- 左侧图片区域 -->
      <div :class="['welcome-section', isRegister ? 'move-to-right' : null]">
        <img src="../../public/cart.svg" alt="Welcome" class="left-cart-img"/>
      </div>
      <!-- 右侧登录表单 -->
      <div :class="['login-form-section', isRegister ? 'move-to-left' : null]">
        <div v-if="!isRegister">
          <div class="login-title">Welcome！</div>
          <div class="login-subtitle">Please Sign in Your Account Firstly</div>
          <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="login-form">
            <el-form-item prop="loginUsername">
              <el-input
                  v-model="loginForm.loginUsername"
                  placeholder="用户名"
                  style="margin-bottom: 10px"
              />
            </el-form-item>
            <el-form-item prop="loginPassword">
              <el-input
                  v-model="loginForm.loginPassword"
                  type="password"
                  placeholder="密码"
                  :show-password="true"
                  clearable
              />
            </el-form-item>
            <div class="button-box" >
              <el-button  type="primary" round size="large" class="register-button" @click="toggleForm">
                去注册
              </el-button>
              <el-button  type="primary" round class="login-button" size="large" @click="onSubmitLogin">
                登录
              </el-button>
            </div>
          </el-form>
        </div>
        <div v-else>
          <div class="login-title">Welcome！</div>
          <div class="login-subtitle">Here Sign up Your Own Account</div>
          <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" class="login-form">
            <el-form-item prop="registerUsername">
              <el-input
                  v-model="registerForm.registerUsername"
                  placeholder="用户名"
                  style="margin-bottom: 10px"
              />
            </el-form-item>
            <el-form-item prop="registerPassword">
              <el-input
                  v-model="registerForm.registerPassword"
                  type="password"
                  placeholder="密码"
                  :show-password="true"
                  clearable
              />
            </el-form-item>
            <div class="button-box" >
              <el-button  type="primary" round size="large" class="login-button" @click="onSubmitRegister">
                注册
              </el-button>
              <el-button  type="primary" round class="register-button" size="large" @click="toggleForm">
                去登录
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import {ref} from "vue";
import {ElMessage} from "element-plus";
import {userLogin, userRegister} from "@/utils/apis";

const loginForm = ref({
  loginUsername: '',
  loginPassword: '',
  remember: false,
});

const registerForm = ref({
  registerUsername: '',
  registerPassword: '',
  remember: false,
});

const loading = ref(false);
const isRegister = ref(false);

const login = async (username, password) => {
  loading.value = true
  try {
    const response = await userLogin(username, password)
    console.log(response)
    return response.data
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

const register = async (username, password) => {
  loading.value = true
  try {
    const response = await userRegister(username, password)
    console.log(response)
    return response.data
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

const toggleForm = () => {
  isRegister.value = !isRegister.value;
};

const loginRules = {
  loginUsername: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  loginPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};

const registerRules = {
  registerUsername: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  registerPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
}

const loginFormRef = ref(null);
const registerFormRef = ref(null);

const onSubmitLogin = () => {
  loginFormRef.value.validate( async (valid) => {
    if (valid) {
      const response = await login(loginForm.value.loginUsername, loginForm.value.loginPassword)
      if (response !== 'invalid') {
        ElMessage.success('登录成功')
      } else {
        ElMessage.error('登录失败')
      }
    } else {
      ElMessage.error('请按要求填写账号密码');
    }
  });
};

const onSubmitRegister = () => {
  registerFormRef.value.validate( async (valid) => {
    if (valid) {
      const response = await register(registerForm.value.registerUsername, registerForm.value.registerPassword)
      if (response === 'OK') {
        ElMessage.success('注册成功')
      } else if (response === 'isexist') {
        ElMessage.error('注册账户已存在')
      } else {
        ElMessage.error('注册失败')
      }
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
  background: rgba(255, 255, 255, 0.85);
  border-radius: 25px;
  width: 80vw;
  height: 80vh;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease; /* 动画效果 */
}

.move-to-left {
  transform: translateX(calc(-100% - 120px)); /* 向左平移 */
}

.move-to-right {
  transform: translateX(calc(100% - 120px)); /* 向右平移 */
}

.welcome-section {
  flex: 1;
  background: rgba(245, 245, 245, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px;
  transition: transform 0.5s ease;
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
  transition: transform 0.5s ease;
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

