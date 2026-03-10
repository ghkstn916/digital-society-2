import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProgressStore } from '../../store/progressStore'
import { getAdjacentLessons, getLesson } from '../../data/lessonRegistry'
import { collectSubmission, saveSubmission } from '../../data/quizAnswers'

const STUDENT_KEY = 'dc-student-name'

function getSavedName() {
  try { return localStorage.getItem(STUDENT_KEY) || '' } catch { return '' }
}
function saveName(name) {
  try { localStorage.setItem(STUDENT_KEY, name) } catch {}
}

export default function LessonNav({ moduleId, lessonId }) {
  const { prev, next } = getAdjacentLessons(moduleId, lessonId)
  const info = getLesson(moduleId, lessonId)
  const color = info?.module?.color || '#4f7c5a'

  // completed 객체를 직접 구독 → markComplete 후 즉시 리렌더링
  const completed = useProgressStore(s => s.completed)
  const markComplete = useProgressStore(s => s.markComplete)
  const done = !!completed[`${moduleId}/${lessonId}`]

  // 완료 모달 (이름 없을 때 최초 입력)
  const [completeModal, setCompleteModal] = useState(false)
  const [completeName, setCompleteName] = useState('')
  const [completeError, setCompleteError] = useState(false)

  // 이름 변경 전용 모달 (제출 없음)
  const [nameModal, setNameModal] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [nameError, setNameError] = useState(false)
  const [nameSaved, setNameSaved] = useState(false)

  // 레슨 이동 시 모달 초기화
  useEffect(() => {
    setCompleteModal(false)
    setNameModal(false)
    setNameSaved(false)
  }, [moduleId, lessonId])

  const submitWithName = async (name) => {
    const submission = collectSubmission(moduleId, lessonId, name, info)
    await saveSubmission(submission)
    markComplete(moduleId, lessonId)
  }

  const handleCompleteClick = () => {
    const saved = getSavedName()
    if (saved) {
      submitWithName(saved)
    } else {
      setCompleteName('')
      setCompleteError(false)
      setCompleteModal(true)
    }
  }

  const handleCompleteConfirm = async () => {
    if (!completeName.trim()) { setCompleteError(true); return }
    saveName(completeName.trim())
    setCompleteModal(false)
    await submitWithName(completeName.trim())
  }

  const handleNameSave = () => {
    if (!nameInput.trim()) { setNameError(true); return }
    saveName(nameInput.trim())
    setNameModal(false)
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 2000)
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const savedName = getSavedName()

  return (
    <>
      <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
        {/* 이전 */}
        {prev ? (
          <Link
            to={`/lesson/${prev.moduleId}/${prev.lessonId}`}
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            ← 이전
          </Link>
        ) : <div />}

        {/* 완료 버튼 영역 */}
        <div className="flex flex-col items-center gap-2">
          {done ? (
            /* 완료된 상태 — 완료 표시 + 재제출 버튼 분리 */
            <div className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-lg text-sm font-semibold bg-green-100 text-green-700">
                ✅ 완료됨
              </span>
              <button
                onClick={handleCompleteClick}
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                다시 제출
              </button>
            </div>
          ) : (
            /* 미완료 상태 */
            <button
              onClick={handleCompleteClick}
              className="px-5 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: color }}
            >
              완료 표시하기
            </button>
          )}

          {/* 저장된 이름 + 이름 변경 (별도) */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {savedName && <span>{savedName}</span>}
            {nameSaved && <span className="text-green-500 font-medium">저장됨</span>}
            <button
              onClick={() => { setNameInput(savedName); setNameError(false); setNameModal(true) }}
              className="underline hover:text-gray-600"
            >
              {savedName ? '이름 변경' : '이름 입력'}
            </button>
          </div>
        </div>

        {/* 다음 */}
        {next ? (
          <Link
            to={`/lesson/${next.moduleId}/${next.lessonId}`}
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            다음 →
          </Link>
        ) : <div />}
      </div>

      {/* 완료 모달 — 최초 이름 입력 + 제출 */}
      {completeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={e => { if (e.target === e.currentTarget) setCompleteModal(false) }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 mx-4">
            <h3 className="font-bold text-gray-800 text-base mb-1">레슨 완료</h3>
            <p className="text-sm text-gray-500 mb-4">
              이름 또는 학번을 입력해주세요. 한 번 입력하면 다음부터 자동으로 사용돼요.
            </p>
            <input
              autoFocus
              type="text"
              value={completeName}
              onChange={e => { setCompleteName(e.target.value); setCompleteError(false) }}
              onKeyDown={e => { if (e.key === 'Enter') handleCompleteConfirm(); if (e.key === 'Escape') setCompleteModal(false) }}
              placeholder="예) 홍길동 / 3반 15번"
              className={`w-full border-2 rounded-lg px-3 py-2 text-sm mb-1 focus:outline-none transition-colors ${
                completeError ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'
              }`}
            />
            {completeError && <p className="text-xs text-red-500 mb-2">이름 또는 학번을 입력해주세요.</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setCompleteModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleCompleteConfirm}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                완료하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 이름 변경 모달 — 저장만, 제출 없음 */}
      {nameModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={e => { if (e.target === e.currentTarget) setNameModal(false) }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 mx-4">
            <h3 className="font-bold text-gray-800 text-base mb-1">이름/학번 변경</h3>
            <p className="text-sm text-gray-500 mb-4">
              변경 후에는 완료 버튼을 눌러야 제출돼요.
            </p>
            <input
              autoFocus
              type="text"
              value={nameInput}
              onChange={e => { setNameInput(e.target.value); setNameError(false) }}
              onKeyDown={e => { if (e.key === 'Enter') handleNameSave(); if (e.key === 'Escape') setNameModal(false) }}
              placeholder="예) 홍길동 / 3반 15번"
              className={`w-full border-2 rounded-lg px-3 py-2 text-sm mb-1 focus:outline-none transition-colors ${
                nameError ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'
              }`}
            />
            {nameError && <p className="text-xs text-red-500 mb-2">이름 또는 학번을 입력해주세요.</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setNameModal(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleNameSave}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-700 hover:bg-gray-800"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
