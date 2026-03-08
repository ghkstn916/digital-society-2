import { useState, useEffect } from 'react'

/**
 * usePersistentState - localStorage 연동 커스텀 훅
 * key가 null이면 일반 useState처럼 동작 (기존 컴포넌트 호환 유지)
 */
export function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    if (!key) return initialValue
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (!key) return
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch {}
  }, [key, state])

  return [state, setState]
}
