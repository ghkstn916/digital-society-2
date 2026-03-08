import FormativeQuiz from '../../components/interactive/FormativeQuiz'
import { useProgressStore } from '../../store/progressStore'
import { Link } from 'react-router-dom'

const questions = [
  {
    question: '정보 보호의 정의로 가장 알맞은 것은?',
    choices: [
      '자신의 정보를 다른 사람과 적극적으로 나누는 것',
      '컴퓨터나 네트워크의 위협으로부터 정보를 보호하는 것',
      '인터넷에 정보를 공개하는 것',
      '비밀번호를 종이에 적어 보관하는 것',
    ],
    answer: 1,
    explanation: '정보 보호는 외부 위협으로부터 정보를 지키는 것입니다.',
  },
  {
    question: '다음 중 보호해야 할 정보에 해당하는 것은?',
    choices: [
      '날씨 데이터',
      '재난 정보',
      '개인 의료 기록',
      '진로 진학 정보',
    ],
    answer: 2,
    explanation: '개인 의료 기록은 민감한 개인 정보로 반드시 보호해야 합니다. 날씨, 재난, 진로 정보는 공유해야 할 정보예요.',
  },
  {
    question: '초상권에 대한 설명으로 옳은 것은?',
    choices: [
      '연예인처럼 유명인에게만 인정된다',
      '공개된 장소에서는 동의 없이 촬영해도 된다',
      '모든 사람에게 인정되는 기본권이다',
      '촬영 동의만 받으면 공개도 할 수 있다',
    ],
    answer: 2,
    explanation: '초상권은 모든 사람의 기본권이에요. 공개 장소도 동의가 필요하고, 촬영·공개 동의는 별개입니다.',
  },
  {
    question: '다음 중 피싱(Phishing) 공격의 설명으로 옳은 것은?',
    choices: [
      '컴퓨팅 시스템에 불법 침입해 파일을 유출하는 것',
      '불특정 다수에게 광고성 메시지를 보내는 것',
      '개인 정보나 금융 정보를 요구해 피해를 주는 수법',
      '시스템을 마비시키고 금전을 요구하는 악성 프로그램',
    ],
    answer: 2,
    explanation: '피싱은 Private data(개인 정보) + Fishing(낚시)의 합성어로, 개인·금융 정보를 빼내는 수법이에요.',
  },
  {
    question: '올바른 비밀번호 설정 방법이 아닌 것은?',
    choices: [
      '최소 12자 이상으로 설정한다',
      '문자·숫자·특수문자를 조합한다',
      '생년월일이나 전화번호를 그대로 사용한다',
      '사이트마다 다른 비밀번호를 사용한다',
    ],
    answer: 2,
    explanation: '생년월일·전화번호처럼 개인 정보가 포함된 비밀번호는 추측하기 쉬워 위험해요. 절대 사용하지 마세요!',
  },
]

export default function Quiz2() {
  const markComplete = useProgressStore(s => s.markComplete)
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1" style={{ color: '#4a72a8' }}>2차시 형성평가</h1>
        <p className="text-sm text-gray-400">정보 보호와 정보 공유 · 5문항</p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        📝 정보 보호와 공유에 대해 얼마나 이해했는지 확인해봐요.
      </div>
      <FormativeQuiz questions={questions} color="#4a72a8" />
      <div className="mt-8 text-center">
        <button
          onClick={() => markComplete('module2', 'quiz')}
          className="px-6 py-2.5 text-white rounded-lg text-sm font-semibold hover:opacity-90 mr-3"
          style={{ backgroundColor: '#4a72a8' }}
        >
          완료 표시하기
        </button>
        <Link
          to="/lesson/module3/lesson1"
          className="px-6 py-2.5 border rounded-lg text-sm font-semibold hover:bg-purple-50 inline-block"
          style={{ borderColor: '#8a5ca8', color: '#8a5ca8' }}
        >
          3차시 시작하기 →
        </Link>
      </div>
    </div>
  )
}
