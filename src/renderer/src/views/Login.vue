<template>
  <div class="flex items-center justify-center h-screen bg-gray-100 login-img">
    <div class="p-8 bg-white rounded-lg shadow-md w-96 login-container">
      <h1 class="mb-6 text-2xl font-bold text-center text-gray-800">本地便签登录</h1>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码 (任意输入)" prefix-icon="Lock" show-password />
        </el-form-item>
        <el-button type="primary" class="w-full" @click="handleLogin" :loading="loading">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store';
// 移除未使用的图标导入或在模板中使用它们
import { ElMessage } from 'element-plus';

const router = useRouter();
const store = useAppStore();
const loading = ref(false);

const form = reactive({
  username: 'admin',
  password: '123456'
});

const handleLogin = () => {
  if (!form.username) {
    ElMessage.warning('请输入用户名');
    return;
  }
  if (!form.password) {
    ElMessage.warning('请输入密码');
    return;
  }
  if (form.username !== 'admin' || form.password !== '123456') {
    ElMessage.error('用户名或密码错误');
    return;
  }
  loading.value = true;
  setTimeout(() => {
    store.login(form.username);
    ElMessage.success('登录成功');
    router.push('/');
    loading.value = false;
  }, 800);
};
</script>

<style scoped>
.login-img {
  width: 100%;
  height: 90%;
  background-image: url('../static/image/login.png');
  background-size: cover;
}
.login-container {
  margin-left: 65%;
  margin-bottom: 140px;
}
</style>
