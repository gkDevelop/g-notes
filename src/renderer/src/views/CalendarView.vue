<template>
  <div class="mainContainer">
    <h2 class="headerTitle">日历选择记录</h2>

    <div class="mainGrid">
      <div class="calendarSection">
        <el-calendar v-model="calendarDate">
          <template #date-cell="{ data }">
            <div class="calendarDayCell">
              <p :class="getDayClass(data)">
                {{ data.day.split('-').slice(2).join('') }}
              </p>
              <div class="dayNotesContainer">
                <div v-for="note in getNotesForDate(data.day)" :key="note.id" class="noteIndicator"
                  :style="{ backgroundColor: note.color }"></div>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>

      <div class="notesSection">
        <h3 class="notesHeader">
          <el-icon class="headerIcon">
            <List />
          </el-icon>
          {{ store.selectedDate }} 的便签
        </h3>

        <div v-if="store.filteredNotes.length === 0" class="noNotesMessage">
          <p>该日期暂无记录</p>
          <el-button type="text" @click="goToHome">去创建</el-button>
        </div>

        <div class="notesList">
          <div v-for="note in store.filteredNotes" :key="note.id" class="noteItem" :style="getNoteStyle(note)">
            <h4 class="noteTitle">{{ note.title }}</h4>
            <p class="noteContent">{{ note.content }}</p>
          </div>
        </div>

        <el-button class="manageButton" type="primary" plain @click="goToHome">
          查看详情 / 管理
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '../store';
import { List } from '@element-plus/icons-vue';

const store = useAppStore();
const router = useRouter();
const calendarDate = ref(new Date(store.selectedDate as string));

watch(calendarDate, (newVal) => {
  const dateStr = newVal.toISOString().split('T')[0];
  if (dateStr) store.setSelectedDate(dateStr);
});

const getNotesForDate = (dateStr: string) => {
  return store.notes.filter(note => note.date === dateStr);
};

const goToHome = () => {
  router.push('/');
};

const getDayClass = (data: any) => {
  return data.isSelected ? 'selectedDay' : 'normalDay';
};

const getNoteStyle = (note: any) => {
  return {
    borderLeftColor: note.color === '#ffffff' ? '#dcdfe6' : note.color
  };
};
</script>

<style scoped>
.mainContainer {
  height: 100%;
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.headerTitle {
  font-size: 1.25rem;
  font-weight: bold;
  color: rgb(55 65 81);
  margin-bottom: 24px;
}

.mainGrid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 32px;
  flex-grow: 1;
}

@media (min-width: 1024px) {
  .mainGrid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.calendarSection {
  grid-column: span 2 / span 2;
}

.calendarDayCell {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.selectedDay {
  color: rgb(37 99 235);
  font-weight: bold;
}

.normalDay {
  /* 未选中日期的默认样式 */
}

.dayNotesContainer {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
  overflow: hidden;
}

.noteIndicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.notesSection {
  background-color: rgb(249 250 251);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 250px);
}

.notesHeader {
  font-weight: bold;
  color: rgb(55 65 81);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.headerIcon {
  margin-right: 8px;
  color: rgb(59 130 246);
}

.noNotesMessage {
  text-align: center;
  padding: 48px 0;
  color: rgb(156 163 175);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.notesList {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  overflow-y: auto;
  padding-right: 8px;
}

.noteItem {
  padding: 12px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-left-width: 4px;
  border-left-style: solid;
}

.noteTitle {
  font-weight: bold;
  font-size: 0.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.noteContent {
  font-size: 0.75rem;
  color: rgb(107 114 128);
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.manageButton {
  width: 100%;
  margin-top: 24px;
}

/* 深度选择器用于Element Plus组件 */
:deep(.el-calendar-table .el-calendar-day) {
  height: 80px;
  padding: 8px;
}
</style>