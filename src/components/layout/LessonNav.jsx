import { Link } from 'react-router-dom'
import { useProgressStore } from '../../store/progressStore'
import { getAdjacentLessons, getLesson } from '../../data/lessonRegistry'

export default function LessonNav({ moduleId, lessonId }) {
  const { prev, next } = getAdjacentLessons(moduleId, lessonId)
  const markComplete = useProgressStore(s => s.markComplete)
  const isComplete = useProgressStore(s => s.isComplete)
  const done = isComplete(moduleId, lessonId)
  const info = getLesson(moduleId, lessonId)
  const color = info?.module?.color || '#4f7c5a'

  return (
    <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
      {/* 이전 */}
      {prev ? (
        <Link
          to={`/lesson/${prev.moduleId}/${prev.lessonId}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          ← 이전
        </Link>
      ) : (
        <div />
      )}

      {/* 완료 버튼 */}
      <button
        onClick={() => markComplete(moduleId, lessonId)}
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
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          다음 →
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
