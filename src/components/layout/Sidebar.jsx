import { Link, useParams } from 'react-router-dom'
import { modules } from '../../data/lessonRegistry'
import { useProgressStore } from '../../store/progressStore'

export default function Sidebar({ isOpen, onClose }) {
  const { moduleId, lessonId } = useParams()
  const isComplete = useProgressStore(s => s.isComplete)

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 overflow-y-auto
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-auto lg:shadow-none lg:z-auto
        `}
      >
        {/* 헤더 */}
        <div className="p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 text-[#4f7c5a] font-bold text-lg">
            <span>🌿</span>
            <span>디지털 문화</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1">고등학교 정보 · V단원</p>
        </div>

        {/* 모듈 목록 */}
        <nav className="p-3">
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
                    onClick={onClose}
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
    </>
  )
}
