import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import FlipReveal from '../../components/interactive/FlipReveal'
import { usePersistentState } from '../../hooks/usePersistentState'

const COLOR = '#8a5ca8'

const elements = [
  {
    id: 'conf',
    name: '기밀성',
    eng: 'Confidentiality',
    icon: '🔐',
    desc: '허락된 사용자만 정보에 접근할 수 있도록 하는 것',
    detail: '인가된 사람만 볼 수 있어야 한다는 원칙이에요. 예를 들어 병원 의료 기록, 기업의 설계 도면, 국가 기밀 문서는 담당자 외에는 볼 수 없어야 해요.',
    methods: ['비밀번호 잠금', '접근 권한 설정', '암호화', '2단계 인증'],
    threat: '기밀성 침해: 허락 없이 타인의 정보를 열람하거나 외부로 유출하는 것',
    color: 'bg-blue-50 border-blue-300',
  },
  {
    id: 'integ',
    name: '무결성',
    eng: 'Integrity',
    icon: '🛡️',
    desc: '정보를 함부로 변경할 수 없도록 하는 것',
    detail: '정보가 원본 그대로 유지되어야 한다는 원칙이에요. 누군가 몰래 은행 거래 금액을 바꾸거나, 시험 성적을 조작하거나, 문서 내용을 바꾼다면 무결성을 침해하는 거예요.',
    methods: ['해시 함수', '디지털 서명', '접근 권한 제한', '변경 이력 관리'],
    threat: '무결성 침해: 정보의 내용을 허락 없이 수정하거나 위조하는 것',
    color: 'bg-green-50 border-green-300',
  },
  {
    id: 'avail',
    name: '가용성',
    eng: 'Availability',
    icon: '✅',
    desc: '사용자가 원할 때 언제든지 정보에 접근 가능한 것',
    detail: '필요할 때 정보와 시스템을 사용할 수 있어야 한다는 원칙이에요. 랜섬웨어로 시스템이 마비되거나, 디도스(DDoS) 공격으로 사이트가 접속 불능이 되면 가용성이 침해된 거예요.',
    methods: ['백업 및 복구 시스템', '서버 이중화', '디도스 방어', '정기적 유지보수'],
    threat: '가용성 침해: 시스템을 마비시켜 정상적인 서비스를 방해하는 것',
    color: 'bg-amber-50 border-amber-300',
  },
]

const threats = [
  { label: '해커가 데이터베이스에서 고객 이름·연락처를 몰래 복사해 외부에 팔았다', answer: '기밀성 침해' },
  { label: '랜섬웨어로 회사 서버가 암호화되어 직원들이 업무를 할 수 없게 됐다', answer: '가용성 침해' },
  { label: '해커가 은행 계좌이체 금액을 100만원에서 1,000만원으로 몰래 바꿨다', answer: '무결성 침해' },
  { label: '허락 없이 타인의 이메일 계정에 로그인해 메시지를 읽었다', answer: '기밀성 침해' },
  { label: '디도스(DDoS) 공격으로 쇼핑몰 서버가 다운되어 고객이 구매를 못 했다', answer: '가용성 침해' },
  { label: '해킹으로 성적 데이터베이스의 점수가 임의로 변경됐다', answer: '무결성 침해' },
]

const threatTypes = [
  { icon: '💥', name: '훼손', desc: '정보나 시스템을 파괴해 사용 불가 상태로 만드는 것', example: '랜섬웨어로 파일 암호화, 바이러스로 운영체제 손상' },
  { icon: '✏️', name: '변조', desc: '허락 없이 정보 내용을 다른 것으로 바꾸는 것', example: '금융 거래 금액 변경, 성적 데이터 조작, 계약서 내용 수정' },
  { icon: '👁️', name: '접근·유출', desc: '허락 없이 정보를 확인하거나 외부에 내보내는 것', example: '비밀번호 탈취, 고객 DB 해킹, 내부자 정보 유출' },
  { icon: '🎭', name: '위조', desc: '없는 정보를 실제처럼 만들어내는 것', example: '가짜 신분증 제작, 피싱 사이트 제작, 이메일 발신자 위장' },
]

export default function Lesson3_1() {
  const [selected, setSelected] = useState(null)
  const [threatAnswers, setThreatAnswers] = usePersistentState('dc-m3l1-threats', {})
  const [showAll, setShowAll] = usePersistentState('dc-m3l1-showall', false)
  const [openThreat, setOpenThreat] = useState(null)

  return (
    <article className="prose">
      <h1 className="text-2xl font-black mb-1" style={{ color: COLOR }}>정보 보안의 3대 요소</h1>
      <p className="text-sm text-gray-400 mb-8">Module 3 · Lesson 1 · 15분</p>

      <div className="rounded-xl p-4 mb-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>정보 보안의 정의와 필요성을 설명할 수 있다.</li>
          <li>기밀성·무결성·가용성의 개념과 사례를 구분할 수 있다.</li>
          <li>정보 보안 4대 위협 요소를 이해한다.</li>
          <li>위협 사례가 어떤 요소를 침해하는지 분석할 수 있다.</li>
        </ul>
      </div>

      <FlipReveal
        color={COLOR}
        storageKey="dc-m3l1-flip-0"
        prompt="내가 오랫동안 작성한 과제 파일이 어느 날 갑자기 사라졌다. 혹은 내용이 몰래 바뀌어 있다. 이런 일이 왜 생길까?"
        reveal="악성 소프트웨어(바이러스, 랜섬웨어 등)나 해킹이 원인일 수 있어요. 디지털 정보는 눈에 보이지 않기 때문에 누군가 몰래 훔치거나, 바꾸거나, 삭제해도 바로 알기 어려워요. 그래서 정보 보안이 필요합니다."
      />

      <h2>정보 보안이란?</h2>
      <p>
        <strong>정보 보안(Information Security)</strong>이란 정보를 다양한 위협으로부터 보호하는 것이에요.
        정보를 송수신하는 과정에서 발생할 수 있는 훼손·변조·접근과 유출·위조 등을 방지하기 위한
        <strong>관리적·기술적 방법</strong>을 의미합니다.
      </p>
      <p>
        스마트 기기가 일상화되면서 우리가 다루는 정보의 양이 폭발적으로 늘었어요.
        병원 진료 기록, 금융 거래 내역, 학교 성적, 개인 연락처 등 중요한 정보들이 모두 디지털로 저장되기 때문에
        이를 보호하는 것이 그 어느 때보다 중요해졌습니다.
      </p>

      {/* 4대 위협 */}
      <h2>정보 보안의 4대 위협 요소</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">각 항목을 클릭해 자세한 사례를 확인해보세요.</p>
      <div className="not-prose flex flex-col gap-2 mb-6">
        {threatTypes.map((t, idx) => (
          <div key={t.name}>
            <button
              onClick={() => setOpenThreat(openThreat === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openThreat === idx ? 'border-[#8a5ca8] bg-[#8a5ca8]/5' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <div className="flex-1">
                <span className="font-bold text-sm text-gray-800">{t.name}</span>
                <span className="text-xs text-gray-500 ml-2">{t.desc}</span>
              </div>
              <span className="text-gray-400 text-sm">{openThreat === idx ? '▲' : '▼'}</span>
            </button>
            {openThreat === idx && (
              <div className="border-2 border-t-0 border-[#8a5ca8] rounded-b-xl bg-white px-4 py-3">
                <p className="text-xs text-gray-500 mb-1 font-semibold">실제 사례</p>
                <p className="text-sm text-gray-700">{t.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2>정보 보안의 3대 요소 (CIA)</h2>
      <p>
        정보 보안의 목표는 <strong>기밀성(C)·무결성(I)·가용성(A)</strong>, 즉 CIA 3요소를 지키는 것이에요.
        이 세 가지가 모두 유지될 때 정보가 안전하게 보호된다고 볼 수 있습니다.
      </p>
      <p className="text-sm text-gray-500 not-prose mb-3">카드를 클릭해 자세한 내용을 확인하세요.</p>

      <div className="not-prose grid grid-cols-3 gap-3 mb-4">
        {elements.map((el, idx) => (
          <button
            key={el.id}
            onClick={() => setSelected(selected === idx ? null : idx)}
            className={`rounded-xl border-2 p-4 text-center transition-all ${
              selected === idx ? 'border-[#8a5ca8] bg-[#8a5ca8]/10' : 'border-gray-200 bg-white hover:border-[#8a5ca8]/50'
            }`}
          >
            <div className="text-3xl mb-2">{el.icon}</div>
            <div className="font-bold text-sm text-gray-800">{el.name}</div>
            <div className="text-xs text-gray-400">{el.eng}</div>
          </button>
        ))}
      </div>

      {selected !== null && (
        <div className="not-prose rounded-xl border-2 p-5 mb-6" style={{ borderColor: COLOR, backgroundColor: COLOR + '08' }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{elements[selected].icon}</span>
            <span className="font-bold text-lg" style={{ color: COLOR }}>{elements[selected].name} ({elements[selected].eng})</span>
          </div>
          <p className="text-sm text-gray-700 mb-3">{elements[selected].detail}</p>
          <div className="mb-3">
            <p className="text-xs font-bold text-gray-500 mb-1.5">보호 방법</p>
            <div className="flex flex-wrap gap-1.5">
              {elements[selected].methods.map(m => (
                <span key={m} className="text-xs px-2 py-1 rounded-full font-medium border"
                  style={{ borderColor: COLOR, color: COLOR, backgroundColor: COLOR + '10' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
            ⚠️ {elements[selected].threat}
          </div>
        </div>
      )}

      {/* 3요소 한눈에 보기 */}
      <div className="not-prose bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-6">
        <p className="font-bold text-sm text-gray-700 mb-3">CIA 3요소 한눈에 비교하기</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-2 pr-3 text-left font-semibold text-gray-600">요소</th>
                <th className="py-2 pr-3 text-left font-semibold text-gray-600">핵심 질문</th>
                <th className="py-2 text-left font-semibold text-gray-600">침해 사례</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="py-2 pr-3 font-bold text-blue-700">🔐 기밀성</td>
                <td className="py-2 pr-3 text-gray-600">"허락된 사람만 볼 수 있나?"</td>
                <td className="py-2 text-gray-600">해킹으로 개인 정보 유출</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-bold text-green-700">🛡️ 무결성</td>
                <td className="py-2 pr-3 text-gray-600">"정보가 원본 그대로인가?"</td>
                <td className="py-2 text-gray-600">거래 금액 몰래 변경</td>
              </tr>
              <tr>
                <td className="py-2 pr-3 font-bold text-amber-700">✅ 가용성</td>
                <td className="py-2 text-gray-600">"필요할 때 쓸 수 있나?"</td>
                <td className="py-2 text-gray-600">랜섬웨어로 서버 마비</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 위협 분석 활동 */}
      <h2>활동: 위협 사례 분석하기</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">
        다음 사례가 기밀성·무결성·가용성 중 어느 것을 침해하는지 선택한 뒤 정답을 확인해보세요.
      </p>

      <div className="not-prose flex flex-col gap-3 mb-4">
        {threats.map((t, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-gray-700 mb-2 font-medium">{idx + 1}. {t.label}</p>
            <div className="flex gap-2 flex-wrap">
              {['기밀성 침해', '무결성 침해', '가용성 침해'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setThreatAnswers(prev => ({ ...prev, [idx]: opt }))}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    threatAnswers[idx] === opt
                      ? 'text-white border-transparent'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  style={threatAnswers[idx] === opt ? { backgroundColor: COLOR } : {}}
                >
                  {opt}
                </button>
              ))}
            </div>
            {showAll && (
              <div className={`mt-2 text-xs px-3 py-1.5 rounded-lg ${
                threatAnswers[idx] === t.answer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {threatAnswers[idx] === t.answer ? '✅' : '❌'} 정답: {t.answer}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => setShowAll(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: COLOR }}
        >
          정답 확인
        </button>
      </div>

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m3l1-quiz-0"
        question="허락된 사용자만 정보에 접근할 수 있도록 하는 정보 보안의 3대 요소는?"
        choices={[
          { label: '무결성(Integrity)', correct: false, explanation: '무결성은 정보가 임의로 변경되지 않도록 보장하는 것이에요.' },
          { label: '가용성(Availability)', correct: false, explanation: '가용성은 원할 때 언제든 정보에 접근 가능한 것이에요.' },
          { label: '기밀성(Confidentiality)', correct: true, explanation: '맞아요! 기밀성은 허락된 사람만 정보에 접근할 수 있도록 보장하는 것입니다.' },
          { label: '투명성(Transparency)', correct: false, explanation: '투명성은 정보 보안의 3대 요소에 해당하지 않아요.' },
        ]}
      />

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m3l1-quiz-1"
        question="랜섬웨어 공격으로 회사 서버가 암호화되어 직원들이 업무를 전혀 할 수 없게 됐다. 이는 CIA 3요소 중 어느 것을 침해한 것인가?"
        choices={[
          { label: '기밀성 침해', correct: false, explanation: '기밀성 침해는 허락 없이 정보를 열람하거나 유출하는 것이에요. 이 경우는 사용 자체가 불가능해진 거예요.' },
          { label: '무결성 침해', correct: false, explanation: '무결성 침해는 정보 내용이 변조되는 것이에요. 랜섬웨어로 서버가 마비된 것은 이와 달라요.' },
          { label: '가용성 침해', correct: true, explanation: '맞아요! 가용성 침해는 시스템이나 정보를 필요할 때 사용하지 못하게 만드는 것이에요. 랜섬웨어로 서버가 마비되면 정보를 아예 사용할 수 없게 되죠.' },
          { label: 'CIA 3요소 모두 침해', correct: false, explanation: '이 상황에서 가장 직접적으로 침해된 요소는 가용성이에요.' },
        ]}
      />

      <div className="rounded-xl p-4 mt-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 정보 보안 = 훼손·변조·접근유출·위조 등으로부터 정보를 보호하는 것</li>
          <li>✅ 기밀성(C) = 허락된 사람만 접근 가능</li>
          <li>✅ 무결성(I) = 정보를 함부로 변경 불가</li>
          <li>✅ 가용성(A) = 필요할 때 언제든 접근 가능</li>
          <li>✅ CIA 3요소가 모두 유지될 때 정보 보안이 실현됨</li>
        </ul>
      </div>
    </article>
  )
}
