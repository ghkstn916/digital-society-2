import { create } from 'zustand'

const STORAGE_KEY = 'digital-culture-progress'

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function saveProgress(completed) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  } catch {}
}

export const useProgressStore = create((set, get) => ({
  completed: loadProgress(),

  markComplete(moduleId, lessonId) {
    const key = `${moduleId}/${lessonId}`
    const next = { ...get().completed, [key]: true }
    saveProgress(next)
    set({ completed: next })
  },

  isComplete(moduleId, lessonId) {
    return !!get().completed[`${moduleId}/${lessonId}`]
  },

  resetAll() {
    saveProgress({})
    set({ completed: {} })
  },
}))
