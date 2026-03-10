import { useState, useEffect } from 'react'
import { fetchAllProgress } from '../lib/supabase.js'
import { modules } from '../data/lessonRegistry.js'

const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || 'teacher2024').trim()
const SESSION_KEY = 'dc-admin-auth'

// 전체 레슨 flat 배열
const allLessons = modules.flatMap(m => m.lessons.map(l => ({
  id: `${m.id}/${l.id}`,
  moduleId: m.id,
  lessonId: l.id,
  title: l.title,
  moduleTitle: m.title,
  isQuiz: !!l.isQuiz,
  color: m.color,
})))

const QUIZ_KEY_LABELS = {
  'dc-m1l1-quiz-0': '[1-1] 퀴즈 1', 'dc-m1l1-quiz-1': '[1-1] 퀴즈 2', 'dc-m1l1-quiz-2': '[1-1] 퀴즈 3',
  'dc-m1l2-quiz-0': '[1-2] 퀴즈 1', 'dc-m1l2-quiz-1': '[1-2] 퀴즈 2',
  'dc-m1l3-quiz-0': '[1-3] 퀴즈 1', 'dc-m1l3-quiz-1': '[1-3] 퀴즈 2',
  'dc-m2l1-quiz-0': '[2-1] 퀴즈 1', 'dc-m2l1-quiz-1': '[2-1] 퀴즈 2',
  'dc-m2l2-quiz-0': '[2-2] 퀴즈 1', 'dc-m2l2-quiz-1': '[2-2] 퀴즈 2',
  'dc-m2l3-quiz-0': '[2-3] 퀴즈 1',
  'dc-m3l1-quiz-0': '[3-1] 퀴즈 1', 'dc-m3l1-quiz-1': '[3-1] 퀴즈 2',
  'dc-m3l2-quiz-0': '[3-2] 퀴즈 1', 'dc-m3l2-quiz-1': '[3-2] 퀴즈 2',
  'dc-m3l3-quiz-0': '[3-3] 퀴즈 1', 'dc-m3l3-quiz-1': '[3-3] 퀴즈 2',
}

const FORMATIVE_LABELS = {
  'module1/quiz': '1차시 형성평가',
  'module2/quiz': '2차시 형성평가',
  'module3/quiz': '3차시 형성평가',
}

function dateStr() {
  return new Date().toLocaleDateString('ko-KR').replace(/\./g, '').replace(/ /g, '')
}

function triggerDownload(content, filename) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function processProgress(raw) {
  const map = {}
  for (const row of raw) {
    const key = row.student_name
    if (!map[key]) map[key] = { studentName: row.student_name, completed: [] }
    map[key].completed.push(`${row.module_id}/${row.lesson_id}`)
  }
  return Object.values(map).sort((a, b) => a.studentName.localeCompare(b.studentName))
}

// ── 비밀번호 화면 ──────────────────────────────────────
function PasswordGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  const submit = () => {
    if (pw.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onAuth()
    } else { setError(true); setPw('') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="text-xl font-bold text-slate-800 mb-1">관리자 로그인</h1>
        <p className="text-sm text-slate-500 mb-6">수업 진행 현황을 확인합니다.</p>
        <input
          type="password" value={pw} autoFocus
          onChange={e => { setPw(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="비밀번호"
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition mb-3"
        />
        {error && <p className="text-xs text-red-500 mb-3">비밀번호가 틀렸습니다.</p>}
        <button onClick={submit}
          className="w-full bg-blue-600 text-white rounded-xl py-2.5 text-sm font-bold hover:bg-blue-700 transition-colors">
          로그인
        </button>
      </div>
    </div>
  )
}

// ── 메인 대시보드 ──────────────────────────────────────
function Dashboard({ onLogout }) {
  const [raw, setRaw] = useState([])
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastFetched, setLastFetched] = useState(null)
  const [tab, setTab] = useState('progress')

  const load = async () => {
    setLoading(true)
    const data = await fetchAllProgress()
    setRaw(data)
    setRows(processProgress(data))
    setLastFetched(new Date())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  // 레슨 퀴즈 결과: quiz_scores 있는 레코드 flat
  const quizRecords = raw.filter(r => r.quiz_scores?.length > 0)
    .flatMap(r => (r.quiz_scores || []).map(q => ({
      studentName: r.student_name,
      moduleId: r.module_id,
      lessonId: r.lesson_id,
      lessonTitle: r.lesson_title,
      key: q.key,
      selected: q.selected,
      correctIndex: q.correctIndex,
      isCorrect: q.isCorrect,
      completedAt: r.completed_at,
    })))

  // 형성평가 결과: formative_data 있는 레코드
  const formativeRecords = raw.filter(r => r.formative_data)

  // CSV 다운로드 - 진행현황
  const downloadProgress = () => {
    const headers = ['이름/학번', '완료 수', ...allLessons.map(l => l.title)]
    const lines = rows.map(r => [
      r.studentName, r.completed.length,
      ...allLessons.map(l => r.completed.includes(l.id) ? 'O' : ''),
    ])
    triggerDownload('\uFEFF' + [headers, ...lines].map(r => r.join(',')).join('\n'), `진행상황_${dateStr()}.csv`)
  }

  // CSV 다운로드 - 퀴즈
  const downloadQuiz = () => {
    const headers = ['이름/학번', '레슨', '퀴즈', '선택답', '정답여부']
    const lines = quizRecords.map(r => [
      r.studentName,
      r.lessonTitle,
      QUIZ_KEY_LABELS[r.key] || r.key,
      r.selected != null ? `${r.selected + 1}번` : '미답',
      r.isCorrect ? 'O' : 'X',
    ])
    triggerDownload('\uFEFF' + [headers, ...lines].map(r => r.join(',')).join('\n'), `퀴즈결과_${dateStr()}.csv`)
  }

  // CSV 다운로드 - 형성평가
  const downloadFormative = () => {
    const headers = ['이름/학번', '형성평가', '점수', '만점', ...Array.from({length: 5}, (_, i) => `Q${i+1}`)]
    const lines = formativeRecords.map(r => [
      r.student_name,
      FORMATIVE_LABELS[`${r.module_id}/${r.lesson_id}`] || r.lesson_title,
      r.formative_data.score,
      r.formative_data.total,
      ...(r.formative_data.answers || []).map((a, i) => `${a + 1}번`),
    ])
    triggerDownload('\uFEFF' + [headers, ...lines].map(r => r.join(',')).join('\n'), `형성평가_${dateStr()}.csv`)
  }

  const totalCompleted = rows.reduce((s, r) => s + r.completed.length, 0)

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">학생 현황 관리</h1>
            {lastFetched && (
              <p className="text-xs text-slate-400 mt-1">마지막 갱신: {lastFetched.toLocaleTimeString('ko-KR')}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={load} disabled={loading}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50">
              {loading ? '불러오는 중...' : '새로고침'}
            </button>
            {tab === 'progress' && (
              <button onClick={downloadProgress} disabled={rows.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
                CSV 다운로드
              </button>
            )}
            {tab === 'quiz' && (
              <button onClick={downloadQuiz} disabled={quizRecords.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
                CSV 다운로드
              </button>
            )}
            {tab === 'formative' && (
              <button onClick={downloadFormative} disabled={formativeRecords.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-50">
                CSV 다운로드
              </button>
            )}
            <button onClick={onLogout}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-500 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
              로그아웃
            </button>
          </div>
        </div>

        {/* 요약 카드 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '전체 학생', value: `${rows.length}명`, color: 'text-slate-800' },
            { label: '전체 레슨', value: `${allLessons.length}개`, color: 'text-slate-800' },
            { label: '전체 완료', value: `${totalCompleted}건`, color: 'text-blue-600' },
            { label: '형성평가 제출', value: `${formativeRecords.length}건`, color: 'text-violet-600' },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-2xl p-5 border border-slate-100">
              <p className="text-sm text-slate-500 mb-1">{c.label}</p>
              <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        {/* 탭 */}
        <div className="flex gap-1 mb-4 bg-white border border-slate-100 rounded-2xl p-1 w-fit">
          {[
            { id: 'progress', label: '진행 현황', active: 'bg-blue-600 text-white' },
            { id: 'quiz', label: '퀴즈 결과', active: 'bg-orange-500 text-white' },
            { id: 'formative', label: '형성평가', active: 'bg-violet-600 text-white' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === t.id ? t.active : 'text-slate-500 hover:text-slate-800'
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── 진행 현황 탭 ── */}
        {tab === 'progress' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-400 text-sm">데이터를 불러오는 중...</div>
            ) : rows.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-slate-400 text-sm">아직 완료 기록이 없습니다.</div>
            ) : (
              <table className="w-full text-sm min-w-max">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">이름/학번</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">완료</th>
                    {allLessons.map(l => (
                      <th key={l.id} className="text-center px-3 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">
                        <div className="truncate max-w-[72px]" title={l.title}>{l.title}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={r.studentName} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-5 py-3 text-slate-800 font-medium whitespace-nowrap">{r.studentName}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                          r.completed.length === allLessons.length ? 'bg-green-100 text-green-700'
                          : r.completed.length > 0 ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-500'
                        }`}>
                          {r.completed.length}/{allLessons.length}
                        </span>
                      </td>
                      {allLessons.map(l => (
                        <td key={l.id} className="px-3 py-3 text-center">
                          {r.completed.includes(l.id)
                            ? <span className="text-green-500 text-base">✓</span>
                            : <span className="text-slate-200 text-base">○</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── 퀴즈 결과 탭 ── */}
        {tab === 'quiz' && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20 text-slate-400 text-sm">데이터를 불러오는 중...</div>
            ) : quizRecords.length === 0 ? (
              <div className="flex items-center justify-center py-20 text-slate-400 text-sm">아직 퀴즈 기록이 없습니다.</div>
            ) : (
              <table className="w-full text-sm min-w-max">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">이름/학번</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">레슨</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">퀴즈</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">선택한 답</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">정오</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap">제출시각</th>
                  </tr>
                </thead>
                <tbody>
                  {quizRecords.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-5 py-3 text-slate-800 font-medium whitespace-nowrap">{r.studentName}</td>
                      <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{r.lessonTitle}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {QUIZ_KEY_LABELS[r.key] || r.key}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-600 whitespace-nowrap">
                        {r.selected != null ? `${r.selected + 1}번` : <span className="text-slate-300">미답</span>}
                      </td>
                      <td className="px-4 py-3 text-center text-lg">
                        {r.selected == null
                          ? <span className="text-slate-300 text-sm">-</span>
                          : r.isCorrect
                          ? <span className="text-green-500">✓</span>
                          : <span className="text-red-400">✗</span>}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                        {r.completedAt ? new Date(r.completedAt).toLocaleString('ko-KR') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ── 형성평가 탭 ── */}
        {tab === 'formative' && (
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white rounded-2xl border border-slate-100 flex items-center justify-center py-20 text-slate-400 text-sm">
                데이터를 불러오는 중...
              </div>
            ) : formativeRecords.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 flex items-center justify-center py-20 text-slate-400 text-sm">
                아직 제출된 형성평가가 없습니다.
              </div>
            ) : (
              Object.entries(
                formativeRecords.reduce((acc, r) => {
                  const key = `${r.module_id}/${r.lesson_id}`
                  if (!acc[key]) acc[key] = []
                  acc[key].push(r)
                  return acc
                }, {})
              ).map(([lessonKey, records]) => (
                <div key={lessonKey} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 bg-violet-50">
                    <h2 className="font-bold text-slate-800">{FORMATIVE_LABELS[lessonKey] || lessonKey}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{records.length}명 제출</p>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500">이름/학번</th>
                        <th className="text-center px-4 py-2.5 text-xs font-semibold text-slate-500">점수</th>
                        {Array.from({ length: 5 }, (_, i) => (
                          <th key={i} className="text-center px-3 py-2.5 text-xs font-semibold text-slate-500">Q{i + 1}</th>
                        ))}
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">제출시각</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((r, i) => {
                        const fd = r.formative_data
                        return (
                          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="px-5 py-3 text-slate-800 font-medium whitespace-nowrap">{r.student_name}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                                fd.score >= 4 ? 'bg-green-100 text-green-700'
                                : fd.score >= 2 ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-600'
                              }`}>
                                {fd.score}/{fd.total}
                              </span>
                            </td>
                            {Array.from({ length: 5 }, (_, qi) => {
                              const ans = fd.answers?.[qi]
                              return (
                                <td key={qi} className="px-3 py-3 text-center text-xs text-slate-600 whitespace-nowrap">
                                  {ans != null ? `${ans + 1}번` : '-'}
                                </td>
                              )
                            })}
                            <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                              {r.completed_at ? new Date(r.completed_at).toLocaleString('ko-KR') : '-'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              ))
            )}
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
