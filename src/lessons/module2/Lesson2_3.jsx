import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import FlipReveal from '../../components/interactive/FlipReveal'
import { usePersistentState } from '../../hooks/usePersistentState'

const COLOR = '#4a72a8'

const threats = [
  { name: '스팸(Spam)', icon: '📩', color: 'bg-gray-100', desc: '불특정 다수에게 보내는 광고성 메시지', example: '카카오톡·이메일로 오는 대출 광고, 쇼핑 홍보 메시지' },
  { name: '피싱(Phishing)', icon: '🎣', color: 'bg-orange-50', desc: 'Private data(개인정보)+Fishing(낚시)의 합성어. 개인 정보·금융 정보를 요구하거나 금전 이체를 유도하는 수법', example: '"당첨됐습니다! 이름·번호 입력하세요" 같은 문자' },
  { name: '해킹(Hacking)', icon: '🔓', color: 'bg-red-50', desc: '다른 사람의 컴퓨팅 시스템에 불법 침입해 파일을 열람·유출·변경·삭제하는 행위', example: '기업 서버 침입, 개인 계정 무단 접속' },
  { name: '랜섬웨어(Ransomware)', icon: '💰', color: 'bg-purple-50', desc: 'Ransom(몸값)+Software 합성어. 시스템을 사용하지 못하게 만든 뒤 이를 인질로 금전을 요구하는 악성 프로그램', example: '파일 암호화 후 "복호화 대가로 비트코인 요구"' },
]

const userMethods = [
  { num: 1, text: '운영체제와 소프트웨어는 최신 버전의 정품을 사용한다', icon: '💻' },
  { num: 2, text: '"12345678" 등 단순한 비밀번호는 사용하지 않는다', icon: '🔑' },
  { num: 3, text: '2단계 인증 절차를 설정한다', icon: '📱' },
  { num: 4, text: '수상한 메시지·이메일은 바로 삭제한다', icon: '🗑️' },
  { num: 5, text: '유사 웹사이트·쇼핑몰 이용을 주의한다', icon: '🌐' },
  { num: 6, text: '모든 앱은 공식 마켓에서만 다운로드한다', icon: '📲' },
  { num: 7, text: '비밀번호 없는 공개형 Wi-Fi 사용을 조심한다', icon: '📡' },
  { num: 8, text: '공용 환경에서 스마트폰 충전 시 데이터 유출을 조심한다', icon: '🔌' },
  { num: 9, text: '보안 업데이트를 지원하는 기기를 사용한다', icon: '🛡️' },
  { num: 10, text: '백신 프로그램을 설치하고 자동 업데이트를 반드시 켠다', icon: '💉' },
]

const pwChecklist = [
  '비밀번호는 최소 12자 이상이다',
  '6개월 이내에 비밀번호를 변경했다',
  '사이트마다 다른 비밀번호를 사용한다',
  '문자·숫자·특수문자를 조합해 사용한다',
  '비밀번호에 주소·생일 등 개인 정보를 넣지 않았다',
  '비밀번호를 메모지·노트에 적어두지 않았다',
  '비밀번호에 연속된 문자나 숫자(abc, 123)를 쓰지 않았다',
]

export default function Lesson2_3() {
  const [openThreat, setOpenThreat] = useState(null)
  const [checked, setChecked] = usePersistentState('dc-m2l3-checked', Array(pwChecklist.length).fill(false))
  const score = checked.filter(Boolean).length
  const toggle = i => setChecked(prev => prev.map((v, idx) => idx === i ? !v : v))

  return (
    <article className="prose">
      <h1 className="text-2xl font-black mb-1" style={{ color: COLOR }}>올바른 정보 보호 방법 실천</h1>
      <p className="text-sm text-gray-400 mb-8">Module 2 · Lesson 3 · 15분</p>

      <div className="rounded-xl p-4 mb-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>스팸·피싱·해킹·랜섬웨어의 개념을 사례로 구분한다.</li>
          <li>사용자 측면의 정보 보호 방법 10가지를 설명한다.</li>
          <li>비밀번호 체크리스트로 나의 보안 수준을 자가 진단한다.</li>
          <li>시크릿 모드와 화면 보호기 등 실제 보호 기능을 이해한다.</li>
        </ul>
      </div>

      <FlipReveal
        color={COLOR}
        storageKey="dc-m2l3-flip-0"
        prompt="스마트폰을 잃어버렸을 때, 암호를 설정해 둔 경우와 설정하지 않은 경우의 차이는?"
        reveal="암호를 설정했을 때: 타인이 내 개인 정보, 사진, 연락처 등에 접근할 수 없어요. 원격 잠금이나 초기화도 가능합니다. // 암호를 설정하지 않았을 때: 누구든 내 폰을 열어 개인 정보 열람, 계정 도용, 사기 등에 악용할 수 있어요. 이처럼 접근 제어 설정 하나가 큰 차이를 만들어요!"
      />

      {/* 위협 종류 */}
      <h2>디지털 위협의 종류</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">각 위협을 클릭해 자세한 내용을 확인하세요.</p>
      <div className="not-prose flex flex-col gap-2 mb-6">
        {threats.map((t, idx) => (
          <div key={t.name}>
            <button
              onClick={() => setOpenThreat(openThreat === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openThreat === idx ? 'border-[#4a72a8]' : 'border-gray-200 bg-white hover:border-gray-300'
              } ${t.color}`}
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="font-bold text-sm text-gray-800">{t.name}</span>
              <span className="ml-auto text-gray-400 text-sm">{openThreat === idx ? '▲' : '▼'}</span>
            </button>
            {openThreat === idx && (
              <div className={`border-2 border-t-0 border-[#4a72a8] rounded-b-xl px-4 py-3 bg-white`}>
                <p className="text-sm text-gray-700 mb-2">{t.desc}</p>
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs font-bold text-gray-500 mb-1">예시</p>
                  <p className="text-xs text-gray-600">{t.example}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 공급자 vs 사용자 */}
      <h2>정보 보호 방법: 공급자 vs 사용자</h2>
      <p>
        정보를 보호하려면 <strong>공급자(기업·기관)</strong>와 <strong>사용자(개인)</strong> 양쪽 모두의 노력이 필요해요.
      </p>
      <div className="not-prose grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
          <p className="font-bold text-sm text-gray-700 mb-2">🏢 공급자 측면</p>
          <ul className="text-xs text-gray-600 space-y-1.5">
            <li>• 정기적인 정보 보호 교육 실시</li>
            <li>• 정보 보호 정책·지침 수립, 담당자 지정</li>
            <li>• 중요 정보 정기 백업 및 안전 보관</li>
            <li>• 보안 관련 법적 요구 사항 준수</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 p-4" style={{ backgroundColor: COLOR + '08', borderColor: COLOR }}>
          <p className="font-bold text-sm mb-2" style={{ color: COLOR }}>👤 사용자 측면</p>
          <ul className="text-xs text-gray-600 space-y-1.5">
            <li>• 최신 정품 소프트웨어 사용</li>
            <li>• 강한 비밀번호 + 주기적 변경</li>
            <li>• 2단계 인증 설정</li>
            <li>• 수상한 메시지 즉시 삭제</li>
            <li>• 백신 프로그램 설치·업데이트</li>
          </ul>
        </div>
      </div>

      {/* 10가지 방법 */}
      <h2>사용자 정보 보호 방법 10가지</h2>
      <div className="not-prose flex flex-col gap-2 mb-6">
        {userMethods.map(m => (
          <div key={m.num} className="flex items-start gap-3 bg-white rounded-lg border border-gray-100 px-4 py-2.5 text-sm shadow-sm">
            <span className="font-bold flex-shrink-0 text-base">{m.icon}</span>
            <div>
              <span className="font-bold mr-1.5" style={{ color: COLOR }}>{m.num}.</span>
              <span className="text-gray-700">{m.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 실용 기능 */}
      <h2>실제로 사용할 수 있는 보호 기능들</h2>
      <div className="not-prose flex flex-col gap-3 mb-6">
        {[
          {
            title: '🕶️ 시크릿 모드',
            when: '공용 컴퓨터를 사용할 때',
            how: '크롬 → 오른쪽 상단 [더 보기] → [새 시크릿 창]',
            effect: '방문 기록, 쿠키, 입력 정보가 저장되지 않아요.',
          },
          {
            title: '🖥️ 화면 보호기',
            when: '자리를 자주 비울 때',
            how: '[시작] → [제어판] → [개인 설정] → [화면 보호기] → 대기 시간 설정',
            effect: '자리를 비운 사이 타인이 화면을 볼 수 없어요.',
          },
          {
            title: '🛡️ 웹 브라우저 보호 모드',
            when: '인터넷 서핑할 때',
            how: '크롬 [설정] → [개인 정보 보호 및 보안] → [보안] → [향상된 보호 모드]',
            effect: '위험한 사이트·다운로드·피싱 시도를 즉각 경고해요.',
          },
          {
            title: '📱 앱 권한 관리',
            when: '스마트폰 앱 사용 시',
            how: 'iOS: [설정] → 앱 선택 → 권한 관리 / 안드로이드: [설정] → [앱] → 권한',
            effect: '위치, 카메라, 마이크 등 불필요한 권한을 거부할 수 있어요.',
          },
        ].map(f => (
          <div key={f.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="font-bold text-sm text-gray-800 mb-2">{f.title}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-blue-50 rounded p-2">
                <p className="font-bold text-blue-600 mb-0.5">언제</p>
                <p className="text-gray-600">{f.when}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="font-bold text-gray-600 mb-0.5">설정 방법</p>
                <p className="text-gray-600">{f.how}</p>
              </div>
              <div className="bg-green-50 rounded p-2">
                <p className="font-bold text-green-600 mb-0.5">효과</p>
                <p className="text-gray-600">{f.effect}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 비밀번호 체크리스트 */}
      <h2>내 비밀번호 보안 자가 진단</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">해당하는 항목을 체크해보세요.</p>
      <div className="not-prose bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
        <div className="flex flex-col gap-2 mb-4">
          {pwChecklist.map((item, idx) => (
            <button
              key={idx}
              onClick={() => toggle(idx)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                checked[idx] ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg flex-shrink-0">{checked[idx] ? '☑️' : '☐'}</span>
              {item}
            </button>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-gray-700">나의 비밀번호 보안 점수</span>
            <span className="font-bold text-lg" style={{ color: COLOR }}>{score}/{pwChecklist.length}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full rounded-full transition-all" style={{ width: `${(score / pwChecklist.length) * 100}%`, backgroundColor: COLOR }} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {score === pwChecklist.length ? '완벽해요! 아주 안전한 비밀번호를 사용하고 있어요.' :
              score >= 5 ? '양호해요. 체크 안 된 항목을 개선해봐요.' : '개선이 필요해요. 비밀번호 관리 습관을 바꿔봐요!'}
          </p>
        </div>
      </div>

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m2l3-quiz-0"
        question="다음 중 사용자 측면의 정보 보호 방법이 아닌 것은?"
        choices={[
          { label: '비밀번호 없는 공개형 Wi-Fi 사용을 피한다', correct: false, explanation: '올바른 사용자 측면 방법이에요.' },
          { label: '정기적인 정보 보호 교육을 직원들에게 실시한다', correct: true, explanation: '이것은 기업(공급자) 측면의 정보 보호 방법이에요. 사용자 개인이 할 수 있는 방법이 아닙니다.' },
          { label: '모든 앱은 공식 마켓에서만 다운로드한다', correct: false, explanation: '올바른 사용자 측면 방법이에요.' },
          { label: '2단계 인증을 설정한다', correct: false, explanation: '올바른 사용자 측면 방법이에요. 아이디·비밀번호 외 추가 인증으로 보안을 강화합니다.' },
        ]}
      />

      <div className="rounded-xl p-4 mt-8 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 스팸·피싱·해킹·랜섬웨어 = 디지털 위협 4종류</li>
          <li>✅ 공급자(기업)와 사용자(개인) 모두 정보 보호 책임이 있음</li>
          <li>✅ 사용자 보호 방법: 정품 소프트웨어, 강한 비밀번호, 2단계 인증, 백신</li>
          <li>✅ 실용 기능: 시크릿 모드, 화면 보호기, 웹 보호 모드, 앱 권한 관리</li>
        </ul>
      </div>
    </article>
  )
}
