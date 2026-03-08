import FormativeQuiz from '../../components/interactive/FormativeQuiz'
import { useProgressStore } from '../../store/progressStore'
import { Link } from 'react-router-dom'

const questions = [
  {
    question: '디지털 기술(Digital Technology)의 정의로 가장 알맞은 것은?',
    choices: [
      '종이와 펜으로 정보를 기록하는 기술',
      '정보를 디지털 형식으로 처리하고 다루는 기술',
      '공장에서 기계를 이용해 제품을 생산하는 기술',
      '농작물을 재배하고 수확하는 기술',
    ],
    answer: 1,
    explanation: '디지털 기술은 정보를 0과 1의 디지털 형식으로 처리하고 다루는 기술입니다.',
  },
  {
    question: '디지털 사회의 특성으로 옳지 않은 것은?',
    choices: [
      '온·오프라인 경계가 사라진다',
      '사람과 사물이 네트워크로 연결된다',
      '빅데이터가 생성된다',
      '정보를 오직 종이 문서로만 저장한다',
    ],
    answer: 3,
    explanation: '디지털 사회에서는 정보가 디지털 형식으로 저장·처리됩니다. 종이 문서만 사용하는 것은 디지털 사회의 특성이 아니에요.',
  },
  {
    question: '디지털 격차(Digital Divide)의 설명으로 옳은 것은?',
    choices: [
      '인터넷 속도의 차이를 의미한다',
      '스마트폰 가격의 차이를 의미한다',
      '디지털 기술 활용 능력 차이로 인한 경제적·사회적 격차',
      '디지털 기기의 화면 크기 차이를 의미한다',
    ],
    answer: 2,
    explanation: '디지털 격차는 기술 활용 능력의 차이로 인해 사회·경제적 불평등이 커지는 현상입니다. 특히 고령자, 저소득층에서 두드러져요.',
  },
  {
    question: '디지털 기술의 발전으로 새롭게 생겨난 직업이 아닌 것은?',
    choices: [
      '빅데이터 분석가',
      '동영상 크리에이터',
      '계산원',
      '환경 빅데이터 전문가',
    ],
    answer: 2,
    explanation: '계산원은 새로 생긴 직업이 아니라 오히려 키오스크와 온라인 쇼핑으로 역할이 줄어들고 있는 직업입니다.',
  },
  {
    question: '디지털 사회에서 진로를 준비하는 올바른 방법은?',
    choices: [
      '디지털 기술은 빠르게 변하니 무시하고 기존 능력만 키운다',
      '기존 직업의 핵심 능력과 함께 디지털 역량도 개발한다',
      '새 직업만 무조건 선택한다',
      '직업 세계가 변하지 않을 것이므로 현재에 집중한다',
    ],
    answer: 1,
    explanation: '디지털 사회에서는 기존 직업의 핵심 능력뿐 아니라 디지털 역량도 함께 키우는 것이 중요합니다.',
  },
]

export default function Quiz1() {
  const markComplete = useProgressStore(s => s.markComplete)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#4f7c5a] mb-1">1차시 형성평가</h1>
        <p className="text-sm text-gray-400">디지털 사회와 진로 · 5문항</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        📝 지금까지 배운 내용을 문제로 확인해봐요. 모든 문제에 답한 뒤 제출하세요.
      </div>

      <FormativeQuiz questions={questions} color="#4f7c5a" />

      <div className="mt-8 text-center">
        <button
          onClick={() => markComplete('module1', 'quiz')}
          className="px-6 py-2.5 bg-[#4f7c5a] text-white rounded-lg text-sm font-semibold hover:bg-[#3a5e43] mr-3"
        >
          완료 표시하기
        </button>
        <Link
          to="/lesson/module2/lesson1"
          className="px-6 py-2.5 border border-[#4a72a8] text-[#4a72a8] rounded-lg text-sm font-semibold hover:bg-blue-50 inline-block"
        >
          2차시 시작하기 →
        </Link>
      </div>
    </div>
  )
}
