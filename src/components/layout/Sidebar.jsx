import { Link, useParams } from 'react-router-dom'
import { modules } from '../../data/lessonRegistry'
import { useProgressStore } from '../../store/progressStore'

export default function Sidebar({ onClose }) {
  const { moduleId, lessonId } = useParams()
  const isComplete = useProgressStore(s => s.isComplete)

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 overflow-y-auto flex flex-col">
      {/* 헤더 */}
      <div className="p-4 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2 text-[#4f7c5a] font-bold text-lg">
          <span>🌿</span>
          <span>디지털 문화</span>
        </Link>
        <p className="text-xs text-gray-400 mt-1">고등학교 정보 · V단원</p>
      </div>

      {/* 모듈 목록 */}
      <nav className="p-3 flex-1">
        {modules.map((mod, mIdx) => (
          <div key={mod.id} className="mb-4">
            <div
              className="flex items-center gap-2 px-2 py-1.5 mb-1"
              style={{ color: mod.color }}
            >
              <span className="text-xs font-bold bg-gray-100 rounded px-1.5 py-0.5 text-gray-500">
                {mIdx + 1}차시
              </span>
              <span className="text-sm font-bold truncate">{mod.title}</span>
            </div>

            {mod.lessons.map(lesson => {
              const isActive = mod.id === moduleId && lesson.id === lessonId
              const done = isComplete(mod.id, lesson.id)

              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${mod.id}/${lesson.id}`}
                  onClick={() => { onClose?.(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 text-sm transition-colors
                    ${isActive
                      ? 'font-semibold text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                  style={isActive ? { backgroundColor: mod.color } : {}}
                >
                  <span className="text-base flex-shrink-0">
                    {lesson.isQuiz ? '📝' : done ? '✅' : '○'}
                  </span>
                  <span className="truncate">{lesson.title}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
