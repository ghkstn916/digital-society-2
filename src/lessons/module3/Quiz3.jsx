import FormativeQuiz from '../../components/interactive/FormativeQuiz'
import { useProgressStore } from '../../store/progressStore'
import { Link } from 'react-router-dom'

const questions = [
  {
    question: '정보 보안의 3대 요소가 올바르게 나열된 것은?',
    choices: [
      '기밀성, 무결성, 가용성',
      '암호화, 백신, 방화벽',
      '기밀성, 투명성, 가용성',
      '보호성, 무결성, 안전성',
    ],
    answer: 0,
    explanation: '정보 보안의 3대 요소는 기밀성(Confidentiality), 무결성(Integrity), 가용성(Availability)이에요.',
  },
  {
    question: '허락된 사용자만 정보에 접근할 수 있도록 하는 정보 보안 요소는?',
    choices: [
      '가용성',
      '무결성',
      '기밀성',
      '투명성',
    ],
    answer: 2,
    explanation: '기밀성(Confidentiality)은 허락된 사용자만 정보에 접근할 수 있도록 하는 특성이에요.',
  },
  {
    question: '랜섬웨어(Ransomware)에 대한 설명으로 옳은 것은?',
    choices: [
      '불특정 다수에게 광고 메시지를 보내는 것',
      '개인 정보를 요구해 빼내는 수법',
      '시스템을 마비시키고 금전을 요구하는 악성 프로그램',
      '타인의 시스템에 침입해 파일을 열람하는 것',
    ],
    answer: 2,
    explanation: '랜섬웨어는 몸값(Ransom)+소프트웨어(Software)의 합성어로, 시스템을 인질로 삼아 금전을 요구하는 악성 프로그램이에요.',
  },
  {
    question: '디지털 윤리에서 저작권(Copyright)과 공유 저작권(Copyleft)의 설명으로 옳은 것은?',
    choices: [
      '저작권은 창작물을 모든 사람이 자유롭게 쓸 수 있게 허용한다',
      '공유 저작권은 창작자만 독점적으로 사용할 수 있다',
      '저작권은 창작자의 권리, 공유 저작권은 자유 사용 허용',
      '둘 다 같은 의미이다',
    ],
    answer: 2,
    explanation: '저작권(카피라이트)은 창작자의 권리를 보호하고, 공유 저작권(카피레프트)은 모든 사람이 자유롭게 쓸 수 있도록 허용하는 것이에요.',
  },
  {
    question: '정보 보안을 위해 올바르지 않은 행동은?',
    choices: [
      '운영체제를 최신 버전으로 업데이트한다',
      '바이러스 백신을 설치하고 자동 업데이트를 켠다',
      '수상한 메시지의 링크를 눌러 확인해본다',
      '2단계 인증을 설정한다',
    ],
    answer: 2,
    explanation: '수상한 메시지의 링크는 절대 클릭하면 안 돼요. 피싱 사이트나 악성 프로그램으로 연결될 수 있어요.',
  },
]

export default function Quiz3() {
  const markComplete = useProgressStore(s => s.markComplete)
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: '#8a5ca8' }}>3차시 형성평가</h1>
        <p className="text-sm text-gray-400">정보 보안 · 5문항</p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        📝 정보 보안과 디지털 윤리를 잘 이해했는지 확인해봐요.
      </div>
      <FormativeQuiz questions={questions} color="#8a5ca8" storageKey="dc-quiz3-form" />
      <div className="mt-8 text-center">
        <button
          onClick={() => markComplete('module3', 'quiz')}
          className="px-6 py-2.5 text-white rounded-lg text-sm font-semibold hover:opacity-90 mr-3"
          style={{ backgroundColor: '#8a5ca8' }}
        >
          완료 표시하기
        </button>
        <Link
          to="/"
          className="px-6 py-2.5 border border-[#4f7c5a] text-[#4f7c5a] rounded-lg text-sm font-semibold hover:bg-green-50 inline-block"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
