import { useState, useEffect } from 'react'
import { fetchAllProgress } from '../lib/supabase.js'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'teacher2024'
const SESSION_KEY = 'dc-admin-auth'

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  } catch { return iso }
}

function exportCSV(rows) {
  const headers = ['이름/학번', '모듈', '레슨', '완료시각', '레슨퀴즈(정답/전체)', '형성평가(점수/전체)']
  const csvRows = [headers, ...rows.map(r => [
    r.student_name,
    r.module_title || r.module_id,
    r.lesson_title || r.lesson_id,
    formatDate(r.completed_at),
    r.quiz_scores?.length
      ? `${r.quiz_scores.filter(q => q.isCorrect).length}/${r.quiz_scores.length}`
      : '-',
    r.formative_data
      ? `${r.formative_data.score}/${r.formative_data.total}`
      : '-',
  ])]
  const csv = csvRows.map(r => r.map(c => `"${c ?? ''}"`).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `학습결과_${new Date().toLocaleDateString('ko-KR')}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// ── 비밀번호 화면 ──────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (pw.trim() === ADMIN_PASSWORD.trim()) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth()
    } else {
      setError(true)
      setPw('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-80">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🔐</div>
          <h1 className="text-lg font-bold text-gray-800">어드민 로그인</h1>
          <p className="text-xs text-gray-400 mt-1">선생님 전용 페이지입니다</p>
        </div>
        <input
          autoFocus
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="비밀번호 입력"
          className={`w-full border-2 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none ${
            error ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'
          }`}
        />
        {error && <p className="text-xs text-red-500 mb-2">비밀번호가 틀렸습니다.</p>}
        <button
          onClick={submit}
          className="w-full py-2 rounded-lg text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700"
        >
          로그인
        </button>
      </div>
    </div>
  )
}

// ── 메인 대시보드 ──────────────────────────────────────
function Dashboard({ onLogout }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterModule, setFilterModule] = useState('all')
  const [filterStudent, setFilterStudent] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const load = async () => {
    setLoading(true)
    const data = await fetchAllProgress()
    setRecords(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const filtered = records.filter(r => {
    const moduleOk = filterModule === 'all' || r.module_id === filterModule
    const nameOk = !filterStudent || r.student_name?.includes(filterStudent)
    return moduleOk && nameOk
  })

  const uniqueStudents = new Set(records.map(r => r.student_name)).size
  const moduleLabels = { module1: '1차시', module2: '2차시', module3: '3차시' }
  const moduleColors = {
    module1: 'bg-green-100 text-green-700',
    module2: 'bg-blue-100 text-blue-700',
    module3: 'bg-purple-100 text-purple-700',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold text-gray-800">학습 결과 어드민</h1>
          <p className="text-xs text-gray-400">디지털 문화 수업 · 선생님 전용</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            새로고침
          </button>
          <button
            onClick={() => exportCSV(filtered)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-600 text-white hover:bg-green-700"
          >
            CSV 내보내기
          </button>
          <button
            onClick={onLogout}
            className="px-3 py-1.5 rounded-lg text-xs border border-gray-200 text-gray-500 hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 요약 카드 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: '전체 완료 기록', value: records.length, color: 'bg-blue-50 text-blue-700' },
            { label: '참여 학생 수', value: uniqueStudents, color: 'bg-green-50 text-green-700' },
            { label: '현재 필터 결과', value: filtered.length, color: 'bg-purple-50 text-purple-700' },
          ].map(c => (
            <div key={c.label} className={`rounded-xl p-4 text-center ${c.color}`}>
              <div className="text-2xl font-black">{c.value}</div>
              <div className="text-xs mt-0.5">{c.label}</div>
            </div>
          ))}
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center">
          <div className="flex gap-1">
            {[['all', '전체'], ['module1', '1차시'], ['module2', '2차시'], ['module3', '3차시']].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setFilterModule(val)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterModule === val ? 'bg-gray-800 text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={filterStudent}
            onChange={e => setFilterStudent(e.target.value)}
            placeholder="이름/학번 검색"
            className="border border-gray-200 rounded-lg px-3 py-1 text-xs focus:outline-none focus:border-gray-400 w-36"
          />
        </div>

        {/* 목록 */}
        {loading ? (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-xl border border-gray-100">
            데이터를 불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-xl border border-gray-100">
            {records.length === 0
              ? '아직 완료된 레슨이 없어요. 학생들이 레슨을 완료하면 여기에 표시됩니다.'
              : '필터 조건에 맞는 결과가 없어요.'}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(r => {
              const quizScores = r.quiz_scores || []
              const correctCount = quizScores.filter(q => q.isCorrect).length
              const isExpanded = expandedId === r.id

              return (
                <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* 요약 행 */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : r.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                      {r.student_name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-800 truncate">{r.student_name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${moduleColors[r.module_id] || 'bg-gray-100 text-gray-600'}`}>
                          {moduleLabels[r.module_id] || r.module_id}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{r.lesson_title}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {quizScores.length > 0 && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          correctCount === quizScores.length ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          퀴즈 {correctCount}/{quizScores.length}
                        </span>
                      )}
                      {r.formative_data && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          r.formative_data.score >= 4 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          형성평가 {r.formative_data.score}/{r.formative_data.total}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{formatDate(r.completed_at)}</span>
                      <span className="text-gray-300 text-sm">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </button>

                  {/* 상세 */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                      {/* 레슨 퀴즈 */}
                      {quizScores.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-gray-500 mb-1.5">레슨 퀴즈</p>
                          <div className="flex flex-wrap gap-2">
                            {quizScores.map((q, i) => (
                              <div key={q.key || i} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                q.selected === null || q.selected === undefined
                                  ? 'bg-gray-100 border-gray-200 text-gray-400'
                                  : q.isCorrect
                                  ? 'bg-green-50 border-green-300 text-green-700'
                                  : 'bg-red-50 border-red-300 text-red-700'
                              }`}>
                                Q{i + 1}: {q.selected == null ? '미답' : q.isCorrect ? '✅ 정답' : `❌ (${String.fromCharCode(65 + q.selected)}번 선택)`}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 형성평가 */}
                      {r.formative_data && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-gray-500 mb-1.5">형성평가 결과</p>
                          <div className="flex flex-wrap gap-2">
                            {r.formative_data.answers?.map((ans, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded bg-white border border-gray-200 text-gray-600">
                                Q{i + 1}: {ans + 1}번
                              </span>
                            ))}
                            <span className={`text-xs px-2 py-1 rounded font-bold ${
                              r.formative_data.score >= 4 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              총 {r.formative_data.score}점 / {r.formative_data.total}점
                            </span>
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-400">
                        완료: {new Date(r.completed_at).toLocaleString('ko-KR')}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ── 최상위 컴포넌트 ──────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <Dashboard onLogout={handleLogout} />
}
