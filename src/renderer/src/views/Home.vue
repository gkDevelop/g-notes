<template>
  <div class="main-container">
    <div class="header-section">
      <h2 class="page-title">便签随记 - {{ store.selectedDate }}</h2>
      <el-button type="primary" @click="showAddDialog = true" class="add-btn">
        <el-icon class="btn-icon">
          <Plus />
        </el-icon> 新建便签
      </el-button>
    </div>

    <div v-if="store.filteredNotes.length === 0" class="empty-state">
      <el-icon :size="48" class="empty-icon">
        <Edit />
      </el-icon>
      <p class="empty-text">今天还没有便签，点击右上角新建一个吧</p>
    </div>

    <div class="notes-grid">
      <div v-for="note in store.filteredNotes" :key="note.id" class="note-card"
        :style="{ backgroundColor: note.color }">
        <div class="card-header">
          <h3 class="note-title">{{ note.title }}</h3>
          <div class="action-buttons">
            <el-button type="text" size="small" class="pin-btn" :class="note.isPinned ? 'pinned' : 'not-pinned'"
              @click="store.togglePin(note.id)">
              <el-icon :size="18">
                <PriceTag v-if="note.isPinned" />
                <CollectionTag v-else />
              </el-icon>
            </el-button>
            <el-button type="text" size="small" class="delete-btn" @click="handleDelete(note.id)">
              <el-icon :size="18">
                <CircleClose />
              </el-icon>
            </el-button>
          </div>
        </div>

        <div class="note-content">
          {{ note.content }}
          <!-- <el-input v-model="note.content" type="textarea" :rows="8" placeholder="请输入内容..." disabled="true" /> -->
        </div>

        <div class="note-date">
          {{ formatTime(note.createdAt) }}
        </div>
      </div>
    </div>

    <!-- 新增便签对话框 -->
    <el-dialog v-model="showAddDialog" title="新建便签" width="500px">
      <el-form :model="newNote" label-width="60px">
        <el-form-item label="标题">
          <el-input v-model="newNote.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="newNote.content" type="textarea" :rows="5" placeholder="请输入内容..."
            class="note-content-input" />
        </el-form-item>
        <el-form-item label="颜色">
          <div class="color-options">
            <div v-for="color in colors" :key="color" class="color-option" :style="{ backgroundColor: color }"
              :class="newNote.color === color ? 'selected-color' : ''" @click="newNote.color = color"></div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false" class="dialog-cancel-btn">取消</el-button>
        <el-button type="primary" @click="handleAddNote" class="dialog-confirm-btn">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAppStore } from '../store';
import { Plus, Edit, CircleClose, PriceTag, CollectionTag } from '@element-plus/icons-vue';
import { ElMessageBox, ElMessage } from 'element-plus';

const store = useAppStore();
const showAddDialog = ref(false);

const colors = [
  '#93d2ff', // 蓝色
  '#eddd52', // 黄色
  '#8cf594', // 绿色
  '#f797b7', // 粉色
  '#e697f1', // 紫色
  '#f37878'  // 白色
];

const newNote = reactive({
  title: '',
  content: '',
  color: '#93d2ff',
  isPinned: false,
  date: (store.selectedDate as string)
});

const handleAddNote = () => {
  if (!newNote.title || !newNote.content) {
    ElMessage.warning('请填写完整标题和内容');
    return;
  }

  store.addNote({
    title: newNote.title,
    content: newNote.content,
    color: newNote.color,
    isPinned: newNote.isPinned,
    date: (store.selectedDate as string)
  });

  showAddDialog.value = false;
  newNote.title = '';
  newNote.content = '';
  newNote.color = '#fff9c4';
  ElMessage.success('便签已保存');
};

const handleDelete = (id: string) => {
  ElMessageBox.confirm('确定要删除这条便签吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.deleteNote(id);
    ElMessage.success('已删除');
  }).catch(() => { });
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};
</script>

<style scoped>
.main-container {
  height: 100%;
}

.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: rgb(55 65 81);
}

.add-btn {
  /* 通过 element-plus 的 type="primary" 属性控制样式 */
}

.btn-icon {
  margin-right: 4px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 256px;
  /* h-64 */
  color: rgb(156 163 175);
  /* text-gray-400 */
}

.empty-icon {
  /* 通过 :size 属性控制图标大小 */
}

.empty-text {
  margin-top: 8px;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  /* grid-cols-1 */
  gap: 24px;
  /* gap-6 */
}

@media (min-width: 768px) {
  .notes-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    /* md:grid-cols-2 */
  }
}

@media (min-width: 1024px) {
  .notes-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    /* lg:grid-cols-3 */
  }
}

.note-card {
  position: relative;
  /* relative */
  padding: 10px;
  /* p-5 */
  transition-property: all;
  /* transition-all */
  transform: translate(0, 0);
  /* transform */
  border-radius: 8px;
  /* rounded-lg */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  /* shadow-sm */
}

.note-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* hover:shadow-md */
  transform: translateY(-4px);
  /* hover:-translate-y-1 */
}

.card-header {
  display: flex;
  align-items: flex-start;
  /* items-start */
  justify-content: space-between;
}

.note-title {
  font-size: 1.125rem;
  /* text-lg */
  font-weight: bold;
  /* font-bold */
  color: rgb(55 65 81);
  /* text-gray-800 */
  flex: 1;
  /* 让标题占据剩余空间 */
  text-overflow: ellipsis;
  /* truncate */
  white-space: nowrap;
  /* truncate */
  overflow: hidden;
  /* truncate */
  padding-right: 48px;
  /* pr-12 */
}

.action-buttons {
  position: absolute;
  /* absolute 定位 */
  top: 16px;
  /* top-4 (转换为像素) */
  right: 4px;
  /* right-4 (转换为像素) */
  display: flex;
  /* space-x-1 (转换为像素) */
}

.pin-btn {
  /* 默认样式 */
}

.pin-btn.pinned {
  color: rgb(37 99 235);
  /* text-blue-600 */
}

.pin-btn.not-pinned {
  color: rgb(156 163 175);
  /* text-gray-400 */
}

.delete-btn {
  color: rgb(156 163 175);
  /* text-gray-400 */
}

.delete-btn:hover {
  color: rgb(239 68 68);
  /* hover:text-red-500 */
}

.note-content {
  /* mb-8 */
  color: rgb(55 65 81);
  /* text-gray-700 */
  white-space: pre-wrap;
  /* 保留换行符和空格，同时允许自动换行 */
  word-break: break-word;
  /* 长文本换行 */
  height: 205px;
  /* 固定高度 */
  min-height: 100px;
  overflow-y: auto;
  /* 垂直方向滚动 */
  overflow-x: hidden;
  /* 水平方向不显示滚动条，文本会自动换行 */
  padding-right: 8px;
  /* 为滚动条留出一些空间 */
  box-sizing: border-box;
  /* 包含padding和border在高度内 */
  margin-bottom: 1px;
}

.note-content-input {
  white-space: normal;
  /* 允许换行 */
  word-break: break-word;
  /* 长文本换行 */
  height: 140px;
  /* 固定高度 */
  min-height: 100px;
  overflow-y: auto;
  /* 垂直方向滚动 */
  overflow-x: hidden;
  /* 水平方向不显示滚动条，文本会自动换行 */
  padding-right: 8px;
  /* 为滚动条留出一些空间 */
  box-sizing: border-box;
  /* 包含padding和border在高度内 */
}

.note-date {
  /* absolute */
  bottom: 16px;
  /* bottom-4 (转换为像素) */
  right: 16px;
  /* right-4 (转换为像素) */
  font-size: 0.75rem;
  /* text-xs */
  color: rgb(107 114 128);
  /* text-gray-500 */
  margin-top: 10px;
  text-align: right;
}

.color-options {
  display: flex;
  gap: 8px;
  /* space-x-2 */
}

.color-option {
  width: 32px;
  /* w-8 */
  height: 32px;
  /* h-8 */
  border-radius: 9999px;
  /* rounded-full */
  cursor: pointer;
  /* cursor-pointer */
  border-width: 2px;
  /* border-2 */
  border-color: transparent;
  /* border-transparent */
}

.color-option.selected-color {
  border-color: rgb(59 130 246);
  /* border-blue-500 */
}

.dialog-cancel-btn {
  /* element-plus 默认样式 */
}

.dialog-confirm-btn {
  /* element-plus 默认样式 */
}
</style>