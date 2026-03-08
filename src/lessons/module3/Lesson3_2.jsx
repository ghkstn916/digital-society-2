import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import FlipReveal from '../../components/interactive/FlipReveal'
import SortCards from '../../components/interactive/SortCards'
import { usePersistentState } from '../../hooks/usePersistentState'

const COLOR = '#8a5ca8'

const attackTypes = [
  {
    name: '스팸(Spam)',
    icon: '📧',
    desc: '수신자의 의사와 무관하게 대량으로 보내는 광고성 메일·문자',
    example: '대출 광고 문자, 무작위 이메일 광고',
    danger: '악성 코드가 숨어있을 수 있고, 피싱·파밍으로 이어질 수 있어요.',
    color: 'bg-yellow-50 border-yellow-300',
  },
  {
    name: '피싱(Phishing)',
    icon: '🎣',
    desc: '공식 기관을 사칭해 개인 정보나 금융 정보를 빼내는 사기',
    example: '가짜 은행 문자 "계좌 이상, 지금 확인하세요" + 가짜 사이트 링크',
    danger: '클릭 한 번으로 개인 정보나 금융 정보가 탈취될 수 있어요.',
    color: 'bg-orange-50 border-orange-300',
  },
  {
    name: '파밍(Pharming)',
    icon: '🌾',
    desc: '가짜 사이트로 사용자를 유도해 정보를 빼내는 방법',
    example: '실제 은행과 똑같이 생긴 가짜 사이트를 만들어 로그인 정보 탈취',
    danger: '주소를 직접 입력해도 가짜 사이트로 연결될 수 있어 더 위험해요.',
    color: 'bg-red-50 border-red-300',
  },
  {
    name: '해킹(Hacking)',
    icon: '💻',
    desc: '허락 없이 타인의 시스템에 침입하여 정보를 탈취하거나 시스템을 손상',
    example: '기업 서버 해킹, 개인 계정 탈취, 비밀번호 무차별 대입',
    danger: '개인·기업·국가 기밀 정보 모두 위협받을 수 있어요.',
    color: 'bg-purple-50 border-purple-300',
  },
  {
    name: '랜섬웨어(Ransomware)',
    icon: '🔒',
    desc: '파일을 암호화한 뒤 복구 대가로 금전(몸값)을 요구하는 악성 소프트웨어',
    example: '이메일 첨부파일 실행 → 모든 파일 암호화 → "비트코인으로 결제하면 해제"',
    danger: '파일을 복구하지 못하면 중요 데이터를 영원히 잃을 수 있어요.',
    color: 'bg-rose-50 border-rose-300',
  },
]

const securityChecklist = [
  { icon: '🔄', label: '주기적인 비밀번호 변경', detail: '6개월에 한 번 이상 교체하고, 사이트마다 다른 비밀번호를 사용하세요.' },
  { icon: '💻', label: '운영체제·앱 업데이트', detail: '업데이트에는 보안 취약점을 막는 패치가 포함돼 있어요.' },
  { icon: '🛡️', label: '바이러스 백신 설치 및 자동 업데이트', detail: '최신 악성 코드를 탐지하려면 자동 업데이트가 켜져 있어야 해요.' },
  { icon: '🔐', label: '2단계 인증(2FA) 설정', detail: '비밀번호 외 추가 인증(OTP, 지문 등)으로 계정을 이중 보호해요.' },
  { icon: '📱', label: '앱 권한 관리', detail: '위치·카메라·마이크 등 불필요한 권한은 거부하거나 제한하세요.' },
  { icon: '🌐', label: '웹 브라우저 보호 모드 활성화', detail: '크롬 등 브라우저의 향상된 보호 모드를 설정해두세요.' },
  { icon: '📁', label: '중요 파일 정기 백업', detail: '외장 하드나 클라우드에 주기적으로 백업하면 랜섬웨어 피해를 줄일 수 있어요.' },
]

const sortCards = [
  { label: '가짜 은행 사이트 링크가 담긴 문자를 받았다 → 클릭하지 않고 삭제했다', group: 'A' },
  { label: '무료 게임 파일을 출처 불명의 사이트에서 다운로드해 실행했다', group: 'B' },
  { label: '컴퓨터 백신을 6개월째 업데이트하지 않았다', group: 'B' },
  { label: '중요한 파일을 외장 하드에 정기적으로 백업하고 있다', group: 'A' },
  { label: '공용 PC에서 로그인 후 종료할 때 로그아웃하지 않았다', group: 'B' },
  { label: '앱이 요청한 마이크 권한이 불필요하다고 생각해 거부했다', group: 'A' },
]

export default function Lesson3_2() {
  const [checked, setChecked] = usePersistentState('dc-m3l2-checked', Array(securityChecklist.length).fill(false))
  const [openAttack, setOpenAttack] = useState(null)
  const [scenario, setScenario] = usePersistentState('dc-m3l2-scenario', null)

  const toggle = (i) => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v))
  const score = checked.filter(Boolean).length

  return (
    <article className="prose">
      <h1 className="text-2xl font-black mb-1" style={{ color: COLOR }}>정보 보안 위협과 대응</h1>
      <p className="text-sm text-gray-400 mb-8">Module 3 · Lesson 2 · 15분</p>

      <div className="rounded-xl p-4 mb-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>스팸·피싱·파밍·해킹·랜섬웨어의 차이를 설명할 수 있다.</li>
          <li>각 위협에 어떻게 대응해야 하는지 판단한다.</li>
          <li>보안 실천 방법 7가지를 내 기기에 적용할 수 있다.</li>
          <li>접근 제어의 개념과 필요성을 이해한다.</li>
        </ul>
      </div>

      <h2>정보 보안 위협이 왜 더 심각해졌을까?</h2>
      <p>
        스마트 기기의 보편화로 인터넷에 연결된 기기가 폭발적으로 증가했어요.
        우리의 개인 정보, 금융 정보, 의료 기록이 모두 디지털화되면서
        이를 노리는 사이버 공격도 함께 늘었습니다.
      </p>
      <p>
        악의적으로 사용되는 정보는 개인의 정신적·경제적 피해는 물론
        <strong>기업, 공공기관, 국가 안보</strong>까지 위협할 수 있어요.
      </p>

      {/* 5대 위협 */}
      <h2>정보 보안의 주요 위협 유형</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">각 항목을 클릭해 사례와 위험성을 확인해보세요.</p>
      <div className="not-prose flex flex-col gap-2 mb-6">
        {attackTypes.map((a, idx) => (
          <div key={a.name}>
            <button
              onClick={() => setOpenAttack(openAttack === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openAttack === idx ? 'border-[#8a5ca8] bg-[#8a5ca8]/5' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{a.icon}</span>
              <div className="flex-1">
                <span className="font-bold text-sm text-gray-800">{a.name}</span>
                <p className="text-xs text-gray-500 mt-0.5">{a.desc}</p>
              </div>
              <span className="text-gray-400 text-sm">{openAttack === idx ? '▲' : '▼'}</span>
            </button>
            {openAttack === idx && (
              <div className={`border-2 border-t-0 border-[#8a5ca8] rounded-b-xl px-4 py-3 ${a.color}`}>
                <p className="text-xs font-bold text-gray-500 mb-1">실제 사례</p>
                <p className="text-sm text-gray-700 mb-2">{a.example}</p>
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700">
                  ⚠️ {a.danger}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 피싱 시나리오 */}
      <h2>사례: 겨울이의 당첨 문자</h2>
      <div className="not-prose bg-white rounded-xl border border-gray-200 p-4 shadow-sm mb-4">
        <div className="bg-gray-800 rounded-lg p-3 mb-3 text-sm text-green-300 font-mono">
          <p className="text-gray-400 text-xs mb-1">[광고] 스마트폰 당첨</p>
          <p>고객님 당첨되셨습니다!</p>
          <p>아래 URL을 통해 이름·전화번호·주소를</p>
          <p>입력하시면 택배로 보내드립니다.</p>
          <p className="text-blue-400 underline">http://www.prize-event-kr.***</p>
        </div>
        <p className="text-sm text-gray-700">
          겨울이는 이 메시지를 보고 약간 찜찜했지만, 별일 없겠지 하고 이름·전화번호·주소를 입력해 보냈습니다.
        </p>
      </div>

      <FlipReveal
        color={COLOR}
        storageKey="dc-m3l2-flip-0"
        prompt="겨울이는 올바르게 행동했을까요? 이 메시지의 어떤 점이 의심스러울까요?"
        reveal="잘못된 행동이에요. 이것은 피싱 공격입니다. 의심해야 할 점: ① 갑자기 당첨 통보를 받는 이벤트에 참여한 적이 없음 ② 출처를 알 수 없는 URL ③ 개인 정보(이름·전화번호·주소)를 요구함. 올바른 대처: ① 의심스러운 URL은 절대 클릭하지 않는다 ② 공식 채널로 직접 확인한다 ③ 개인 정보를 절대 입력하지 않는다 ④ 피싱 문자는 바로 삭제하고 신고한다."
      />

      {/* 보안 실천 방법 체크리스트 */}
      <h2>보안 실천 체크리스트</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">현재 내 기기에서 실천하고 있는 것을 체크해보세요.</p>

      <div className="not-prose bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex flex-col gap-2 mb-4">
          {securityChecklist.map((item, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                checked[i] ? 'bg-purple-50 text-purple-800' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">{checked[i] ? '☑️' : '☐'}</span>
              <div>
                <span className="font-medium mr-2">{item.icon}</span>
                <span>{item.label}</span>
                <p className="text-xs text-gray-400 mt-0.5">{item.detail}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-gray-700">현재 보안 실천 점수</span>
            <span className="font-bold" style={{ color: COLOR }}>{score}/{securityChecklist.length}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full rounded-full transition-all" style={{ width: `${(score / securityChecklist.length) * 100}%`, backgroundColor: COLOR }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {score >= 6 ? '훌륭해요! 보안 의식이 매우 높습니다.' : score >= 4 ? '양호해요. 체크하지 못한 항목도 실천해봐요.' : '아직 실천이 부족해요. 하나씩 적용해봐요!'}
          </p>
        </div>
      </div>

      {/* 올바른 행동 분류 활동 */}
      <h2>활동: 올바른 보안 습관 분류하기</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">
        다음 상황들이 올바른 보안 습관(A)인지, 위험한 보안 습관(B)인지 분류해보세요.
      </p>
      <SortCards
        cards={sortCards}
        groupA={{ label: '올바른 보안 습관', color: '#8a5ca8' }}
        groupB={{ label: '위험한 보안 습관', color: '#e05c5c' }}
        storageKey="dc-m3l2-sort-0"
      />

      {/* 접근 제어 */}
      <h2>접근 제어(Access Control)란?</h2>
      <p>
        <strong>접근 제어</strong>는 적절한 권한을 가진 사람만 특정 시스템이나 정보에 접근할 수 있도록 통제하는 것이에요.
        시스템 보안의 가장 기본적인 수단으로, 신분을 확인한 후 권한에 맞게 서비스를 제공하는 방식입니다.
      </p>
      <div className="not-prose bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-4">
        <p className="text-xs font-bold text-gray-500 mb-2">접근 제어의 구체적인 방법들</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '🔑', method: '비밀번호·PIN', desc: '가장 기본적인 접근 제어 방법' },
            { icon: '👆', method: '지문·얼굴 인식', desc: '생체 정보를 이용한 인증' },
            { icon: '🔐', method: '2단계 인증(2FA)', desc: '비밀번호 + 추가 인증 조합' },
            { icon: '🔒', method: '암호화', desc: '허락된 키가 있어야 내용 확인 가능' },
          ].map(m => (
            <div key={m.method} className="flex gap-2 items-start text-sm">
              <span className="text-xl">{m.icon}</span>
              <div>
                <p className="font-bold text-xs text-gray-700">{m.method}</p>
                <p className="text-xs text-gray-500">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>시나리오: 내 계정이 로그인된 채로 자리를 비우면?</h2>
      <div className="not-prose flex flex-col gap-2 mb-4">
        {[
          { id: 'a', text: '괜찮다. 잠깐 자리를 비우는 거니까 로그아웃 안 해도 된다.' },
          { id: 'b', text: '위험하다. 다른 사람이 내 계정에 접근할 수 있으니 반드시 로그아웃하거나 화면을 잠가야 한다.' },
          { id: 'c', text: '괜찮다. 다른 사람이 내 것인 걸 알면 건드리지 않는다.' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setScenario(opt.id)}
            className={`text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${
              scenario === opt.id ? 'border-[#8a5ca8] bg-[#8a5ca8]/10 font-medium' : 'border-gray-200 bg-white hover:border-gray-400'
            }`}
          >
            {opt.text}
          </button>
        ))}
        {scenario === 'b' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
            ✅ 정답! 계정이 열려있으면 접근 제어가 없는 상태예요. 자리를 비울 땐 반드시 로그아웃하거나 화면을 잠가야 합니다. 학교 컴퓨터, 도서관 PC 등 공용 기기에서는 더욱 중요해요.
          </div>
        )}
        {scenario && scenario !== 'b' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            ❌ 다시 생각해봐요. 로그인된 채로 자리를 비우면 누구든 내 계정에 접근할 수 있어요. 잠깐이라도 반드시 로그아웃하거나 화면을 잠가야 합니다.
          </div>
        )}
      </div>

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m3l2-quiz-0"
        question="피싱(Phishing) 공격에 대한 설명으로 가장 알맞은 것은?"
        choices={[
          { label: '파일을 암호화해 금전을 요구하는 악성 소프트웨어', correct: false, explanation: '그것은 랜섬웨어(Ransomware)에 대한 설명이에요.' },
          { label: '수신자 의사와 무관하게 대량 발송하는 광고성 메일', correct: false, explanation: '그것은 스팸(Spam)에 대한 설명이에요.' },
          { label: '공식 기관을 사칭해 개인 정보나 금융 정보를 빼내는 사기', correct: true, explanation: '맞아요! 피싱은 신뢰할 수 있는 기관(은행, 정부 등)처럼 위장해 개인 정보를 탈취하는 공격이에요.' },
          { label: '허락 없이 타인의 시스템에 침입하는 행위', correct: false, explanation: '그것은 해킹(Hacking)에 대한 설명이에요.' },
        ]}
      />

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m3l2-quiz-1"
        question="정보 보안 실천 방법으로 옳지 않은 것은?"
        choices={[
          { label: '모든 사이트에 같은 비밀번호를 사용해 관리를 편리하게 한다', correct: true, explanation: '틀렸어요! 같은 비밀번호를 여러 사이트에 사용하면 하나가 해킹됐을 때 모두 뚫릴 수 있어요. 이를 크리덴셜 스터핑 공격이라 합니다. 사이트마다 다른 비밀번호를 써야 해요.' },
          { label: '운영체제와 앱을 최신 버전으로 유지한다', correct: false, explanation: '맞아요. 업데이트에는 보안 취약점 패치가 포함돼 있어서 항상 최신 버전을 유지하는 것이 중요해요.' },
          { label: '중요한 파일은 정기적으로 백업해둔다', correct: false, explanation: '맞아요. 랜섬웨어 등의 공격에 대비해 중요 파일은 백업해두면 피해를 최소화할 수 있어요.' },
          { label: '2단계 인증을 설정해 계정을 이중으로 보호한다', correct: false, explanation: '맞아요. 2단계 인증은 비밀번호가 유출되더라도 추가 인증이 필요하므로 계정을 더 안전하게 보호해요.' },
        ]}
      />

      <div className="rounded-xl p-4 mt-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 스팸 = 무단 대량 발송, 피싱 = 사칭 개인정보 탈취, 파밍 = 가짜 사이트 유도</li>
          <li>✅ 해킹 = 무단 시스템 침입, 랜섬웨어 = 파일 암호화 후 금전 요구</li>
          <li>✅ 보안 실천 = 비번 관리, 업데이트, 백신, 2단계 인증, 백업</li>
          <li>✅ 접근 제어 = 권한 있는 사람만 시스템에 접근 가능하도록 통제</li>
        </ul>
      </div>
    </article>
  )
}
