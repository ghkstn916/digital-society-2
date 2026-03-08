import { usePersistentState } from '../../hooks/usePersistentState'

/**
 * FlipReveal - "먼저 생각한 뒤 답 공개하기" 컴포넌트
 * props:
 *   prompt: string  (생각해볼 질문)
 *   reveal: string  (공개할 답/해설)
 *   color: string
 *   storageKey: string | null  (localStorage 키, null이면 비저장)
 */
export default function FlipReveal({ prompt, reveal, color = '#4f7c5a', storageKey = null }) {
  const [shown, setShown] = usePersistentState(storageKey, false)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 my-4">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-xl">🤔</span>
        <p className="text-gray-800 font-medium leading-relaxed">{prompt}</p>
      </div>
      {!shown ? (
        <button
          onClick={() => setShown(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: color }}
        >
          답 확인하기
        </button>
      ) : (
        <div className="rounded-lg p-4 text-sm leading-relaxed animate-pulse-once"
          style={{ backgroundColor: color + '15', borderLeft: `4px solid ${color}` }}>
          <p className="text-gray-700">{reveal}</p>
        </div>
      )}
    </div>
  )
}
