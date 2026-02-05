<template>
  <div class="app-container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <el-icon class="header-icon">
          <Notebook />
        </el-icon>
        My-Tools
      </div>

      <nav class="sidebar-nav">
        <router-link to="/" class="nav-item" :class="{ 'nav-item-active': $route.path === '/' }">
          <el-icon class="nav-icon">
            <HomeFilled />
          </el-icon>
          首页
        </router-link>

        <router-link to="/calendar" class="nav-item" :class="{ 'nav-item-active': $route.path === '/calendar' }">
          <el-icon class="nav-icon">
            <Calendar />
          </el-icon>
          日历记录
        </router-link>

        <div class="nav-section-title">
          工具箱
        </div>

        <div class="nav-item-disabled">
          <el-icon class="nav-icon">
            <ChatDotRound />
          </el-icon>
          微信 (开发中)
        </div>

        <div class="nav-item-disabled">
          <el-icon class="nav-icon">
            <FolderOpened />
          </el-icon>
          文件管理
        </div>

        <div class="nav-item-static">
          <el-icon class="nav-icon">
            <EditPen />
          </el-icon>
          便签随记
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-profile">
            <el-avatar :size="32" class="avatar">{{ store.user?.username.charAt(0).toUpperCase() }}</el-avatar>
            <span class="username">{{ store.user?.username }}</span>
          </div>
          <el-button type="text" @click="handleLogout" class="logout-btn">
            <el-icon>
              <SwitchButton />
            </el-icon>
          </el-button>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- 顶部栏 -->
      <header class="top-bar">
        <div class="top-bar-left">
          <el-button type="primary" circle size="small" class="menu-btn">
            <el-icon>
              <Menu />
            </el-icon>
          </el-button>
          <span class="current-time">{{ currentTime }}</span>
        </div>
        <div class="top-bar-right">
          <!-- <el-badge is-dot class="notification-badge">
            <el-icon :size="20" class="notification-icon">
              <Bell />
            </el-icon>
          </el-badge> -->
          <!-- <el-avatar :src="avaratar" /> -->
          <!-- <el-avatar icon="UserFilled" /> -->
        </div>
      </header>

      <!-- 内容视图 -->
      <main class="content-view">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store';
import {
  HomeFilled, Calendar, Notebook, EditPen,
  ChatDotRound, FolderOpened, Menu,
  SwitchButton
} from '@element-plus/icons-vue';

const store = useAppStore();
const router = useRouter();
const currentTime = ref('');
// const avaratar = ref('../static/image/touxiang.png');

const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const week = weekDays[now.getDay()];
  const time = now.toTimeString().split(' ')[0];
  currentTime.value = `${year}年${month}月${day}日 ${week} ${time}`;
};

let timer: any;
onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const handleLogout = () => {
  store.logout();
  router.push('/login');
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  background-color: rgb(249 250 251);
  /* bg-gray-50 */
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 180px;
  /* w-64 */
  background-color: #001529;
  color: white;
}

.sidebar-header {
  padding: 24px;
  /* p-6 */
  font-size: 1.25rem;
  /* text-xl */
  font-weight: bold;
  /* font-bold */
  border-bottom: 1px solid rgb(55 65 81);
  /* border-b border-gray-700 */
  display: flex;
  align-items: center;
  /* flex items-center */
}

.header-icon {
  margin-right: 8px;
  /* mr-2 */
}

.sidebar-nav {
  flex: 1;
  /* flex-1 */
  margin-top: 16px;
  /* mt-4 */
}

.nav-item {
  display: flex;
  /* flex */
  align-items: center;
  /* items-center */
  padding-left: 24px;
  /* px-6 */
  padding-top: 12px;
  /* py-3 */
  padding-bottom: 12px;
  /* py-3 */
  padding-right: 24px;
  /* px-6 */
  transition-property: colors;
  /* transition-colors */
  color: white;
}

.nav-item:hover {
  background-color: rgb(37 99 235);
  /* hover:bg-blue-600 */
}

.nav-item.nav-item-active {
  background-color: rgb(37 99 235);
  /* bg-blue-600 */
}

.nav-icon {
  margin-right: 12px;
  /* mr-3 */
}

.nav-section-title {
  padding-left: 24px;
  /* px-6 */
  padding-top: 12px;
  /* py-3 */
  padding-bottom: 12px;
  /* py-3 */
  margin-top: 16px;
  /* mt-4 */
  font-size: 0.75rem;
  /* text-xs */
  font-weight: 600;
  /* font-semibold */
  color: rgb(156 163 175);
  /* text-gray-400 */
  text-transform: uppercase;
  /* uppercase */
}

.nav-item-disabled {
  display: flex;
  /* flex */
  align-items: center;
  /* items-center */
  padding-left: 24px;
  /* px-6 */
  padding-top: 12px;
  /* py-3 */
  padding-bottom: 12px;
  /* py-3 */
  padding-right: 24px;
  /* px-6 */
  color: rgb(209 213 219);
  /* text-gray-300 */
  cursor: not-allowed;
  /* cursor-not-allowed */
}

.nav-item-static {
  display: flex;
  /* flex */
  align-items: center;
  /* items-center */
  padding-left: 24px;
  /* px-6 */
  padding-top: 12px;
  /* py-3 */
  padding-bottom: 12px;
  /* py-3 */
  padding-right: 24px;
  /* px-6 */
  background-color: rgb(37 99 235);
  /* bg-blue-600 */
}

.sidebar-footer {
  padding: 16px;
  /* p-4 */
  border-top: 1px solid rgb(55 65 81);
  /* border-t border-gray-700 */
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-profile {
  display: flex;
  align-items: center;
}

.avatar {
  margin-right: 8px;
  /* mr-2 */
}

.username {
  font-size: 0.875rem;
  /* text-sm */
  width: 96px;
  /* w-24 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.logout-btn {
  color: rgb(156 163 175);
  /* text-gray-400 */
}

.logout-btn:hover {
  color: white;
  /* hover:text-white */
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* flex-1 */
  overflow: hidden;
  /* overflow-hidden */
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 24px;
  /* px-6 */
  padding-right: 24px;
  /* px-6 */
  padding-top: 16px;
  /* py-4 */
  padding-bottom: 16px;
  /* py-4 */
  background-color: white;
  /* bg-white */
  border-bottom: 1px solid #e5e7eb;
  /* border-b */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  /* shadow-sm */
}

.top-bar-left {
  display: flex;
  align-items: center;
}

.menu-btn {
  /* 通过 element-plus 属性设置样式 */
}

.current-time {
  margin-left: 16px;
  /* ml-4 */
  font-size: 1.125rem;
  /* text-lg */
  font-weight: 500;
  /* font-medium */
  color: rgb(55 65 81);
  /* text-gray-700 */
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 16px;
  /* space-x-4 */
}

.notification-badge {
  /* el-badge 样式由组件本身处理 */
}

.notification-icon {
  font-size: 20px;
  /* :size="20" */
  color: rgb(107 114 128);
  /* text-gray-500 */
  cursor: pointer;
  /* cursor-pointer */
}

.user-avatar {
  /* 通过 src 属性设置头像图片 */
}

.content-view {
  flex: 1;
  /* flex-1 */
  padding: 24px;
  /* overflow-y-auto */
  margin-bottom: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>