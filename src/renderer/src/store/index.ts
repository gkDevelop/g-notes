import { defineStore } from 'pinia';
import { storage } from '../utils/storage';
import type { Note } from '../utils/storage';

export const useAppStore = defineStore('app', {
  state: () => ({
    notes: storage.getNotes(),
    user: storage.getUser(),
    selectedDate: new Date().toISOString().split('T')[0] as string,
  }),
  
  actions: {
    login(username: string) {
      this.user = { username, isLoggedIn: true };
      storage.setUser(this.user);
    },
    
    logout() {
      this.user = null;
      storage.setUser(null);
    },
    
    addNote(note: Omit<Note, 'id' | 'createdAt'>) {
      const newNote: Note = {
        ...note,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      this.notes.push(newNote);
      storage.saveNotes(this.notes);
    },
    
    updateNote(updatedNote: Note) {
      const index = this.notes.findIndex(n => n.id === updatedNote.id);
      if (index !== -1) {
        this.notes[index] = updatedNote;
        storage.saveNotes(this.notes);
      }
    },
    
    deleteNote(id: string) {
      this.notes = this.notes.filter(n => n.id !== id);
      storage.saveNotes(this.notes);
    },
    
    togglePin(id: string) {
      const note = this.notes.find(n => n.id === id);
      if (note) {
        note.isPinned = !note.isPinned;
        storage.saveNotes(this.notes);
      }
    },
    
    setSelectedDate(date: string) {
      this.selectedDate = date;
    }
  },
  
  getters: {
    filteredNotes: (state) => {
      return state.notes.filter(note => note.date === state.selectedDate)
        .sort((a, b) => {
          if (a.isPinned === b.isPinned) {
            return b.createdAt - a.createdAt;
          }
          return a.isPinned ? -1 : 1;
        });
    }
  }
});
