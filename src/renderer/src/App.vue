<template>
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </template>
  
  <script setup lang="ts">
  import { ElConfigProvider } from 'element-plus';
  // @ts-ignore
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  </script>
  
  <style>
  html, body, #app {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #dcdfe6;
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #c0c4cc;
  }
  </style>
  