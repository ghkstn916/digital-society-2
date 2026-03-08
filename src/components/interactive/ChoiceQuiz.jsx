import { useState } from 'react'

/**
 * ChoiceQuiz - 선택지 클릭 → 정답/오답 피드백
 * props:
 *   question: string
 *   choices: [{ label, correct, explanation }]
 *   color: string (테마색)
 */
export default function ChoiceQuiz({ question, choices, color = '#4f7c5a' }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (idx) => {
    if (selected !== null) return
    setSelected(idx)
  }

  const getStyle = (idx) => {
    if (selected === null) return 'border-gray-200 bg-white hover:border-gray-400 cursor-pointer'
    if (idx === selected) {
      return choices[idx].correct
        ? 'border-green-500 bg-green-50 text-green-800'
        : 'border-red-400 bg-red-50 text-red-800'
    }
    if (choices[idx].correct) return 'border-green-400 bg-green-50 text-green-700'
    return 'border-gray-200 bg-gray-50 text-gray-400'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 my-4">
      <p className="font-semibold text-gray-800 mb-4">{question}</p>
      <div className="flex flex-col gap-2">
        {choices.map((c, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${getStyle(idx)}`}
          >
            <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
            {c.label}
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          choices[selected].correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {choices[selected].correct ? '✅ 정답!' : '❌ 오답!'}{' '}
          {choices[selected].explanation}
        </div>
      )}

      {selected !== null && (
        <button
          onClick={() => setSelected(null)}
          className="mt-3 text-xs text-gray-400 underline"
        >
          다시 풀기
        </button>
      )}
    </div>
  )
}
