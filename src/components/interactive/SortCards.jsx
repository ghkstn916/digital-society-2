import { useState } from 'react'

/**
 * SortCards - 카드를 두 그룹 중 하나로 분류하는 활동
 * props:
 *   cards: [{ label, group }]  group: 'A' | 'B'
 *   groupA: { label, color }
 *   groupB: { label, color }
 */
export default function SortCards({ cards, groupA, groupB }) {
  const [answers, setAnswers] = useState({}) // { idx: 'A' | 'B' }
  const [checked, setChecked] = useState(false)

  const select = (idx, group) => {
    if (checked) return
    setAnswers(prev => ({ ...prev, [idx]: group }))
  }

  const allAnswered = Object.keys(answers).length === cards.length
  const score = cards.filter((c, i) => answers[i] === c.group).length

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 my-4">
      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-lg border-2 p-3 text-center text-sm font-bold" style={{ borderColor: groupA.color, color: groupA.color }}>
          {groupA.label}
        </div>
        <div className="flex-1 rounded-lg border-2 p-3 text-center text-sm font-bold" style={{ borderColor: groupB.color, color: groupB.color }}>
          {groupB.label}
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        {cards.map((card, idx) => {
          const ans = answers[idx]
          const correct = card.group
          const isWrong = checked && ans && ans !== correct

          return (
            <div key={idx} className="flex items-center gap-2">
              <span className={`flex-1 px-3 py-2 rounded-lg text-sm border ${
                checked
                  ? (ans === correct ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50')
                  : 'border-gray-200 bg-gray-50'
              }`}>
                {card.label}
                {isWrong && <span className="text-red-500 ml-2 text-xs">(→ {correct === 'A' ? groupA.label : groupB.label})</span>}
              </span>
              <button
                onClick={() => select(idx, 'A')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  ans === 'A'
                    ? 'text-white'
                    : 'border border-gray-300 text-gray-500 hover:bg-gray-100'
                }`}
                style={ans === 'A' ? { backgroundColor: groupA.color } : {}}
              >A</button>
              <button
                onClick={() => select(idx, 'B')}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  ans === 'B'
                    ? 'text-white'
                    : 'border border-gray-300 text-gray-500 hover:bg-gray-100'
                }`}
                style={ans === 'B' ? { backgroundColor: groupB.color } : {}}
              >B</button>
            </div>
          )
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          disabled={!allAnswered}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            allAnswered
              ? 'bg-[#4f7c5a] text-white hover:bg-[#3a5e43]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          정답 확인
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">
            {score}/{cards.length} 정답!
          </div>
          <button
            onClick={() => { setAnswers({}); setChecked(false) }}
            className="text-xs text-gray-400 underline"
          >
            다시 하기
          </button>
        </div>
      )}
    </div>
  )
}
