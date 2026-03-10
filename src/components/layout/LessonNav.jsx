import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgressStore } from '../../store/progressStore'
import { getAdjacentLessons, getLesson } from '../../data/lessonRegistry'
import { collectSubmission, saveSubmission } from '../../data/quizAnswers'

export default function LessonNav({ moduleId, lessonId }) {
  const { prev, next } = getAdjacentLessons(moduleId, lessonId)
  const markComplete = useProgressStore(s => s.markComplete)
  const isComplete = useProgressStore(s => s.isComplete)
  const done = isComplete(moduleId, lessonId)
  const info = getLesson(moduleId, lessonId)
  const color = info?.module?.color || '#4f7c5a'

  const [modalOpen, setModalOpen] = useState(false)
  const [studentName, setStudentName] = useState('')
  const [nameError, setNameError] = useState(false)

  const handleCompleteClick = () => {
    if (done) return
    setModalOpen(true)
    setStudentName('')
    setNameError(false)
  }

  const handleConfirm = async () => {
    if (!studentName.trim()) { setNameError(true); return }
    const submission = collectSubmission(moduleId, lessonId, studentName.trim(), info)
    await saveSubmission(submission)
    markComplete(moduleId, lessonId)
    setModalOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleConfirm()
    if (e.key === 'Escape') setModalOpen(false)
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
        ) : (
          <div />
        )}

        {/* 완료 버튼 */}
        <button
          onClick={handleCompleteClick}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
            done
              ? 'bg-green-100 text-green-700 cursor-default'
              : 'text-white hover:opacity-90'
          }`}
          style={done ? {} : { backgroundColor: color }}
          disabled={done}
        >
          {done ? '✅ 완료!' : '완료 표시하기'}
        </button>

        {/* 다음 */}
        {next ? (
          <Link
            to={`/lesson/${next.moduleId}/${next.lessonId}`}
            onClick={scrollTop}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            다음 →
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* 학생 이름 입력 모달 */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={e => { if (e.target === e.currentTarget) setModalOpen(false) }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 mx-4">
            <h3 className="font-bold text-gray-800 text-base mb-1">레슨 완료</h3>
            <p className="text-sm text-gray-500 mb-4">이름 또는 학번을 입력하면 선생님께 결과가 저장돼요.</p>
            <input
              autoFocus
              type="text"
              value={studentName}
              onChange={e => { setStudentName(e.target.value); setNameError(false) }}
              onKeyDown={handleKeyDown}
              placeholder="예) 홍길동 / 3반 15번"
              className={`w-full border-2 rounded-lg px-3 py-2 text-sm mb-1 focus:outline-none transition-colors ${
                nameError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-gray-400'
              }`}
              style={{ borderColor: nameError ? undefined : undefined }}
            />
            {nameError && <p className="text-xs text-red-500 mb-3">이름 또는 학번을 입력해주세요.</p>}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                완료하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
