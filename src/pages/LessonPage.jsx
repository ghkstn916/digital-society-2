import { useState, lazy, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLesson } from '../data/lessonRegistry'
import Sidebar from '../components/layout/Sidebar'
import LessonNav from '../components/layout/LessonNav'

const lessonComponents = {
  'module1/lesson1': lazy(() => import('../lessons/module1/Lesson1_1')),
  'module1/lesson2': lazy(() => import('../lessons/module1/Lesson1_2')),
  'module1/lesson3': lazy(() => import('../lessons/module1/Lesson1_3')),
  'module1/quiz':    lazy(() => import('../lessons/module1/Quiz1')),
  'module2/lesson1': lazy(() => import('../lessons/module2/Lesson2_1')),
  'module2/lesson2': lazy(() => import('../lessons/module2/Lesson2_2')),
  'module2/lesson3': lazy(() => import('../lessons/module2/Lesson2_3')),
  'module2/quiz':    lazy(() => import('../lessons/module2/Quiz2')),
  'module3/lesson1': lazy(() => import('../lessons/module3/Lesson3_1')),
  'module3/lesson2': lazy(() => import('../lessons/module3/Lesson3_2')),
  'module3/lesson3': lazy(() => import('../lessons/module3/Lesson3_3')),
  'module3/quiz':    lazy(() => import('../lessons/module3/Quiz3')),
}

export default function LessonPage() {
  const { moduleId, lessonId } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const info = getLesson(moduleId, lessonId)
  if (!info) {
    return <div className="p-8 text-center text-gray-500">레슨을 찾을 수 없어요.</div>
  }

  const { module: mod, lesson } = info
  const LessonContent = lessonComponents[`${moduleId}/${lessonId}`]

  return (
    <div className="flex min-h-screen bg-[#f8faf7]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        {/* 상단 바 */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            ☰
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
            <Link to="/" className="hover:text-[#4f7c5a] flex-shrink-0">홈</Link>
            <span>/</span>
            <span className="flex-shrink-0" style={{ color: mod.color }}>{mod.title}</span>
            <span>/</span>
            <span className="truncate font-medium text-gray-700">{lesson.title}</span>
          </div>
          <div className="ml-auto flex-shrink-0 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            ⏱ {lesson.duration}
          </div>
        </div>

        {/* 본문 */}
        <main className="max-w-2xl mx-auto px-6 py-8">
          <Suspense fallback={
            <div className="flex items-center justify-center h-40 text-gray-400">
              <span>로딩 중...</span>
            </div>
          }>
            {LessonContent ? <LessonContent /> : (
              <div className="text-gray-400 text-center py-10">레슨 콘텐츠를 준비 중이에요.</div>
            )}
          </Suspense>

          <LessonNav moduleId={moduleId} lessonId={lessonId} />
        </main>
      </div>
    </div>
  )
}
