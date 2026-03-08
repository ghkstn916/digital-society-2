import { usePersistentState } from '../../hooks/usePersistentState'

/**
 * FormativeQuiz - 형성평가용 5문제 퀴즈
 * props:
 *   questions: [{ question, choices: [string], answer: number(0-based), explanation: string }]
 *   color: string
 *   storageKey: string | null  (localStorage 키, null이면 비저장)
 */
export default function FormativeQuiz({ questions, color = '#4f7c5a', storageKey = null }) {
  const [answers, setAnswers] = usePersistentState(storageKey, Array(questions.length).fill(null))
  const [submitted, setSubmitted] = usePersistentState(storageKey ? storageKey + '-s' : null, false)

  const select = (qIdx, cIdx) => {
    if (submitted) return
    setAnswers(prev => prev.map((a, i) => i === qIdx ? cIdx : a))
  }

  const allAnswered = answers.every(a => a !== null)
  const score = questions.filter((q, i) => answers[i] === q.answer).length

  return (
    <div className="space-y-6">
      {questions.map((q, qIdx) => (
        <div key={qIdx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="font-semibold text-gray-800 mb-3">
            <span className="inline-block mr-2 text-white text-xs px-2 py-0.5 rounded font-bold" style={{ backgroundColor: color }}>
              Q{qIdx + 1}
            </span>
            {q.question}
          </p>
          <div className="flex flex-col gap-2">
            {q.choices.map((c, cIdx) => {
              const selected = answers[qIdx] === cIdx
              const isCorrect = q.answer === cIdx
              let cls = 'border-gray-200 bg-white text-gray-700 hover:border-gray-400 cursor-pointer'
              if (submitted) {
                if (isCorrect) cls = 'border-green-500 bg-green-50 text-green-800'
                else if (selected && !isCorrect) cls = 'border-red-400 bg-red-50 text-red-700'
                else cls = 'border-gray-200 bg-gray-50 text-gray-400'
              } else if (selected) {
                cls = 'border-2 text-white'
              }

              return (
                <button
                  key={cIdx}
                  onClick={() => select(qIdx, cIdx)}
                  className={`text-left px-4 py-2.5 rounded-lg border-2 text-sm transition-all ${cls}`}
                  style={(!submitted && selected) ? { borderColor: color, backgroundColor: color } : {}}
                >
                  <span className="font-medium mr-2">{cIdx + 1}.</span>{c}
                </button>
              )
            })}
          </div>
          {submitted && (
            <div className={`mt-3 text-sm p-3 rounded-lg ${
              answers[qIdx] === q.answer ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'
            }`}>
              {answers[qIdx] === q.answer ? '✅ 정답!' : `❌ 정답은 ${q.answer + 1}번.`} {q.explanation}
            </div>
          )}
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className={`w-full py-3 rounded-xl font-bold text-base transition-colors ${
            allAnswered ? 'text-white hover:opacity-90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          style={allAnswered ? { backgroundColor: color } : {}}
        >
          제출하기 ({answers.filter(a => a !== null).length}/{questions.length} 답변)
        </button>
      ) : (
        <div className="text-center bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="text-5xl mb-3">{score === questions.length ? '🎉' : score >= 3 ? '👍' : '📖'}</div>
          <div className="text-2xl font-bold mb-1" style={{ color }}>
            {score} / {questions.length} 점
          </div>
          <p className="text-gray-500 text-sm">
            {score === questions.length
              ? '완벽해요! 모두 맞혔어요.'
              : score >= 3
              ? '잘했어요! 틀린 부분을 다시 확인해봐요.'
              : '조금 더 복습이 필요해요.'}
          </p>
          <button
            onClick={() => { setAnswers(Array(questions.length).fill(null)); setSubmitted(false) }}
            className="mt-4 text-sm text-gray-400 underline"
          >
            다시 풀기
          </button>
        </div>
      )}
    </div>
  )
}
