import { useState, useEffect } from 'react'
import { loadSubmissions, clearSubmissions, deleteSubmission } from '../data/quizAnswers'

// ────────────────────────────────────────────
// 비밀번호를 바꾸고 싶으면 아래 값을 수정하세요
const ADMIN_PASSWORD = 'teacher2024'
// ────────────────────────────────────────────

const SESSION_KEY = 'dc-admin-auth'

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  } catch { return iso }
}

function quizBadge(quizScores) {
  if (!quizScores || quizScores.length === 0) return null
  const answered = quizScores.filter(q => q.selected !== null).length
  const correct = quizScores.filter(q => q.isCorrect).length
  return { answered, correct, total: quizScores.length }
}

function exportCSV(submissions) {
  const rows = [['이름/학번', '모듈', '레슨', '완료시각', '레슨퀴즈(정답/전체)', '형성평가(점수/전체)']]
  submissions.forEach(s => {
    const qb = quizBadge(s.quizScores)
    const quizCol = qb ? `${qb.correct}/${qb.total}` : '-'
    const formCol = s.formativeData ? `${s.formativeData.score}/${s.formativeData.total}` : '-'
    rows.push([s.studentName, s.moduleTitle, s.lessonTitle, formatDate(s.completedAt), quizCol, formCol])
  })
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
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
    if (pw === ADMIN_PASSWORD) {
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
  const [submissions, setSubmissions] = useState([])
  const [filterModule, setFilterModule] = useState('all')
  const [filterStudent, setFilterStudent] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    setSubmissions(loadSubmissions().sort((a, b) => b.id - a.id))
  }, [])

  const refresh = () => setSubmissions(loadSubmissions().sort((a, b) => b.id - a.id))

  const handleDelete = (id) => {
    deleteSubmission(id)
    refresh()
    if (expandedId === id) setExpandedId(null)
  }

  const handleClearAll = () => {
    clearSubmissions()
    setSubmissions([])
    setConfirmClear(false)
  }

  const filtered = submissions.filter(s => {
    const moduleOk = filterModule === 'all' || s.moduleId === filterModule
    const nameOk = !filterStudent || s.studentName.includes(filterStudent)
    return moduleOk && nameOk
  })

  const uniqueStudents = [...new Set(submissions.map(s => s.studentName))].length
  const moduleLabels = { module1: '1차시', module2: '2차시', module3: '3차시' }

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
            { label: '전체 완료 기록', value: submissions.length, color: 'bg-blue-50 text-blue-700' },
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
          {!confirmClear ? (
            <button
              onClick={() => setConfirmClear(true)}
              className="ml-auto text-xs text-red-400 hover:text-red-600 underline"
            >
              전체 삭제
            </button>
          ) : (
            <div className="ml-auto flex items-center gap-2 text-xs">
              <span className="text-red-600 font-semibold">정말 삭제할까요?</span>
              <button onClick={handleClearAll} className="text-red-600 font-bold hover:underline">삭제</button>
              <button onClick={() => setConfirmClear(false)} className="text-gray-400 hover:underline">취소</button>
            </div>
          )}
        </div>

        {/* 목록 */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm bg-white rounded-xl border border-gray-100">
            {submissions.length === 0
              ? '아직 완료된 레슨이 없어요. 학생들이 레슨을 완료하면 여기에 표시됩니다.'
              : '필터 조건에 맞는 결과가 없어요.'}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map(s => {
              const qb = quizBadge(s.quizScores)
              const isExpanded = expandedId === s.id
              return (
                <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* 요약 행 */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : s.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                      {s.studentName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-800 truncate">{s.studentName}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${
                          s.moduleId === 'module1' ? 'bg-green-100 text-green-700'
                          : s.moduleId === 'module2' ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                        }`}>
                          {moduleLabels[s.moduleId]}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{s.lessonTitle}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {qb && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          qb.correct === qb.total ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          퀴즈 {qb.correct}/{qb.total}
                        </span>
                      )}
                      {s.formativeData && (
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          s.formativeData.score >= 4 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          형성평가 {s.formativeData.score}/{s.formativeData.total}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">{formatDate(s.completedAt)}</span>
                      <span className="text-gray-300 text-sm">{isExpanded ? '▲' : '▼'}</span>
                    </div>
                  </button>

                  {/* 상세 */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                      {/* 레슨 퀴즈 */}
                      {s.quizScores && s.quizScores.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-gray-500 mb-1.5">레슨 퀴즈</p>
                          <div className="flex flex-wrap gap-2">
                            {s.quizScores.map((q, i) => (
                              <div key={q.key} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${
                                q.selected === null
                                  ? 'bg-gray-100 border-gray-200 text-gray-400'
                                  : q.isCorrect
                                  ? 'bg-green-50 border-green-300 text-green-700'
                                  : 'bg-red-50 border-red-300 text-red-700'
                              }`}>
                                Q{i + 1}: {q.selected === null ? '미답' : q.isCorrect ? '✅ 정답' : `❌ (${String.fromCharCode(65 + q.selected)}번 선택)`}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 형성평가 */}
                      {s.formativeData && (
                        <div className="mb-3">
                          <p className="text-xs font-bold text-gray-500 mb-1.5">형성평가 결과</p>
                          <div className="flex flex-wrap gap-2">
                            {s.formativeData.answers.map((ans, i) => {
                              const isCorrect = ans === s.formativeData.answers[i] // 항상 true (이미 제출된 것)
                              return (
                                <span key={i} className="text-xs px-2 py-1 rounded bg-white border border-gray-200 text-gray-600">
                                  Q{i + 1}: {ans + 1}번
                                </span>
                              )
                            })}
                            <span className={`text-xs px-2 py-1 rounded font-bold ${
                              s.formativeData.score >= 4 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              총 {s.formativeData.score}점 / {s.formativeData.total}점
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-400">
                          완료: {new Date(s.completedAt).toLocaleString('ko-KR')}
                        </p>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="text-xs text-red-400 hover:text-red-600 underline"
                        >
                          이 기록 삭제
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* 안내 */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
          <p className="font-bold mb-1">📌 어드민 페이지 안내</p>
          <ul className="space-y-1 text-amber-700">
            <li>• 이 페이지는 <strong>이 기기의 브라우저</strong>에 저장된 데이터만 보여줘요.</li>
            <li>• 학생마다 기기가 다르면 각 기기에서 따로 확인하거나, 학생이 <strong>CSV 내보내기</strong>로 파일을 제출하게 해주세요.</li>
            <li>• 비밀번호는 소스코드 <code>src/pages/AdminPage.jsx</code> 상단의 <code>ADMIN_PASSWORD</code>에서 변경 가능합니다.</li>
          </ul>
        </div>
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
