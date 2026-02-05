// 简单的本地存储封装，模拟数据库操作
export interface Note {
  id: string;
  title: string;
  content: string;
  date: string; // YYYY-MM-DD
  color: string;
  isPinned: boolean;
  createdAt: number;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

const NOTES_KEY = 'local_notes_data';
const USER_KEY = 'local_notes_user';

export const storage = {
  getNotes(): Note[] {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  saveNotes(notes: Note[]) {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },
  
  getUser(): User | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  
  setUser(user: User | null) {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }
};
