import { Link } from 'react-router-dom'
import { modules } from '../data/lessonRegistry'
import { useProgressStore } from '../store/progressStore'

export default function Home() {
  const isComplete = useProgressStore(s => s.isComplete)

  return (
    <div className="min-h-screen bg-[#f8faf7]">
      {/* Hero */}
      <div className="bg-[#4f7c5a] text-white py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold tracking-wider uppercase opacity-80 mb-3">고등학교 정보 · V단원</p>
          <h1 className="text-4xl font-black mb-4">🌿 디지털 문화</h1>
          <p className="text-lg opacity-90 leading-relaxed">
            디지털 기술의 발전이 사회에 미치는 영향을 이해하고,<br />
            정보 보호와 디지털 윤리를 실천하는 능력을 기릅니다.
          </p>
        </div>
      </div>

      {/* 통계 배지 */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { num: '3', label: '차시' },
            { num: '9', label: '레슨' },
            { num: '3', label: '형성평가' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-black text-[#4f7c5a]">{item.num}</div>
              <div className="text-sm text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 모듈 카드 */}
        <h2 className="text-lg font-bold text-gray-700 mb-4">수업 구성</h2>
        <div className="flex flex-col gap-5">
          {modules.map((mod, mIdx) => {
            const completed = mod.lessons.filter(l => isComplete(mod.id, l.id)).length
            const total = mod.lessons.length
            const pct = Math.round((completed / total) * 100)

            return (
              <div key={mod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-2" style={{ backgroundColor: mod.color }} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{mIdx + 1}차시</span>
                      <h3 className="text-lg font-bold mt-0.5" style={{ color: mod.color }}>{mod.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{mod.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-black" style={{ color: mod.color }}>{pct}%</span>
                      <p className="text-xs text-gray-400">{completed}/{total}</p>
                    </div>
                  </div>

                  {/* 진행 바 */}
                  <div className="h-1.5 bg-gray-100 rounded-full mb-4">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: mod.color }}
                    />
                  </div>

                  {/* 레슨 목록 */}
                  <div className="grid grid-cols-2 gap-2">
                    {mod.lessons.map(lesson => (
                      <Link
                        key={lesson.id}
                        to={`/lesson/${mod.id}/${lesson.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 hover:border-gray-300 text-sm text-gray-700 transition-colors"
                      >
                        <span>{lesson.isQuiz ? '📝' : isComplete(mod.id, lesson.id) ? '✅' : '○'}</span>
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to={`/lesson/${mod.id}/lesson1`}
                    className="mt-4 inline-block px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: mod.color }}
                  >
                    {completed > 0 ? '이어하기 →' : '시작하기 →'}
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
