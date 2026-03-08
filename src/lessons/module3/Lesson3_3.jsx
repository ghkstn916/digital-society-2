import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import FlipReveal from '../../components/interactive/FlipReveal'
import { usePersistentState } from '../../hooks/usePersistentState'

const COLOR = '#8a5ca8'

const ethicsIssues = [
  {
    title: '사이버 폭력 (Cyberbullying)',
    icon: '😔',
    desc: '디지털 기기와 인터넷을 이용해 타인에게 정신적 피해를 주는 모든 행위',
    types: ['악성 댓글·욕설', '개인 정보 무단 공개', '따돌림·왕따', '허위 사실 유포', '불법 촬영물 유포'],
    fact: '사이버 폭력은 익명성 뒤에 숨어 24시간 365일 피해자를 괴롭힐 수 있어요. 피해자는 오프라인보다 더 심각한 정신적 충격을 받을 수 있습니다.',
    solution: '가해자는 형사처벌 대상이 될 수 있어요. 피해 사실은 증거(캡처)를 남기고 신뢰할 수 있는 어른이나 학교·경찰에 신고해야 해요.',
    color: 'bg-red-50 border-red-200',
  },
  {
    title: '가짜 뉴스 (Fake News)',
    icon: '📰',
    desc: '사실처럼 보이게 만들어진 허위 정보·거짓 뉴스',
    types: ['근거 없는 건강 정보', '정치적 목적의 조작 영상', '자극적인 제목의 낚시성 기사', 'SNS 공유를 통한 빠른 확산'],
    fact: '가짜 뉴스는 진짜 뉴스보다 6배 빠르게 퍼진다는 연구 결과가 있어요. 공유 전에 반드시 출처를 확인해야 해요.',
    solution: '출처 확인 → 공신력 있는 매체 여부 확인 → 다른 뉴스와 비교 → 날짜 확인(오래된 기사가 재공유되기도 함)',
    color: 'bg-orange-50 border-orange-200',
  },
  {
    title: '디지털 중독',
    icon: '📱',
    desc: '스마트폰·게임·SNS 등 디지털 기기에 지나치게 의존하는 현상',
    types: ['수업 중 무의식적으로 스마트폰 확인', '잠들기 전 1시간 이상 영상 시청', '게임을 그만두지 못해 수면 부족', 'SNS 좋아요 수에 기분이 좌우됨'],
    fact: '우리 뇌는 알림·좋아요 등 즉각적인 보상에 도파민을 분비해요. 이 패턴이 반복되면 더 많은 자극을 원하게 되어 중독으로 이어질 수 있어요.',
    solution: '하루 스크린 타임 목표 설정, 알림 끄기, 잠들기 1시간 전 스마트폰 멀리 두기, 규칙적인 오프라인 활동 늘리기',
    color: 'bg-blue-50 border-blue-200',
  },
]

const issues = [
  {
    title: '소셜 미디어의 두 얼굴',
    pros: ['사회적 상호 작용이 활발해진다', '정보가 빠르게 공유된다', '멀리 있는 사람과 쉽게 소통', '개인이 직접 콘텐츠를 만들고 공유 가능'],
    cons: ['가짜 뉴스가 빠르게 전파된다', '타인에게 상처를 주는 악성 댓글', '사생활 침해', '과도한 사용으로 현실 관계 약화'],
    icon: '📱',
  },
  {
    title: '생체 인증의 두 얼굴',
    pros: ['서비스 이용이 편리하다', '비밀번호보다 도용하기 어렵다', '빠른 인증', '분실·망각 걱정 없음'],
    cons: ['지문·얼굴 정보는 변경 불가능', '유출 시 영구적 피해', '해킹 및 스푸핑 위험', '개인 정보 침해 우려'],
    icon: '🤳',
  },
]

const scenarios = [
  {
    situation: '중요한 문서를 친구에게 공유할 때',
    answer: '문서를 암호화하여 공유하고, 비밀번호는 별도 채널(문자, 전화)로 전달한다.',
  },
  {
    situation: '소셜 미디어 앱이 스마트폰의 모든 사진에 접근 권한을 요청할 때',
    answer: '불필요한 권한은 거부한다. 앱이 정말 모든 사진에 접근할 필요가 있는지 생각해보자. 필요한 권한만 허용하는 것이 원칙이다.',
  },
  {
    situation: '새로운 포털 사이트에 가입할 때',
    answer: '다른 사이트와 다른 비밀번호를 사용하고, 2단계 인증을 설정한다. 주민번호 등 민감한 정보는 꼭 필요한 경우에만 입력한다.',
  },
  {
    situation: '친구가 SNS에 나와 함께 찍은 사진을 올리겠다고 한다',
    answer: '내 사진을 올리는 것은 내 초상권과 관련돼 있다. 친구에게 사전에 동의를 요청한 것은 올바른 행동이다. 불편하다면 거절할 권리가 있다.',
  },
]

const copyrightConcepts = [
  {
    name: '저작권(Copyright)',
    icon: '©️',
    desc: '창작자가 자신의 창작물에 대해 갖는 독점적 권리',
    detail: '허락 없이 사용하면 법적 책임이 생겨요. 음악, 영상, 글, 그림, 소프트웨어 모두 해당합니다.',
    example: '무단으로 음원 다운로드 → 저작권법 위반',
    color: 'bg-blue-50 border-blue-300',
  },
  {
    name: '공유 저작권(Copyleft)',
    icon: '🔓',
    desc: '창작물을 자유롭게 사용·수정·배포할 수 있도록 허용한 것',
    detail: '단, 수정 시 동일한 조건으로 다시 공유해야 하는 경우도 있어요.',
    example: 'Linux 운영체제, 위키피디아 내용 - 자유롭게 사용·수정 가능',
    color: 'bg-green-50 border-green-300',
  },
]

export default function Lesson3_3() {
  const [openIssue, setOpenIssue] = useState(null)
  const [showPros, setShowPros] = useState({})
  const [showAns, setShowAns] = usePersistentState('dc-m3l3-showans', {})
  const [myRule, setMyRule] = usePersistentState('dc-m3l3-myrule', '')
  const [saved, setSaved] = usePersistentState('dc-m3l3-saved', false)
  const [openCopy, setOpenCopy] = useState(null)

  return (
    <article className="prose">
      <h1 className="text-2xl font-black mb-1" style={{ color: COLOR }}>디지털 윤리 실천</h1>
      <p className="text-sm text-gray-400 mb-8">Module 3 · Lesson 3 · 15분</p>

      <div className="rounded-xl p-4 mb-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>사이버 폭력·가짜 뉴스·디지털 중독의 특성을 설명할 수 있다.</li>
          <li>디지털 기술의 다양한 윤리적 문제와 관점을 정리한다.</li>
          <li>저작권과 공유 저작권(카피레프트)의 차이를 구분한다.</li>
          <li>디지털 환경에서 지켜야 할 나만의 규칙을 만든다.</li>
        </ul>
      </div>

      <FlipReveal
        color={COLOR}
        storageKey="dc-m3l3-flip-0"
        prompt="악성 댓글을 쓴 사람이 '그냥 내 의견을 표현한 것뿐인데 왜 문제가 되냐'고 한다. 이 주장이 맞을까?"
        reveal="틀렸어요. 표현의 자유는 타인에게 해를 끼치는 데까지 적용되지 않아요. 악성 댓글은 상대방에게 실질적인 정신적 피해를 주며, 사이버 모욕죄·명예훼손죄로 처벌받을 수 있어요. 온라인에서도 오프라인과 동일한 윤리적 책임이 있습니다."
      />

      <h2>디지털 사회의 주요 윤리 문제</h2>
      <p>
        디지털 사회는 편리함을 가져왔지만 동시에 새로운 윤리 문제들도 만들어냈어요.
        이런 문제들은 단순히 기술의 문제가 아니라, 사람들이 디지털 공간에서 어떻게 행동하느냐와 직접 관련돼 있어요.
      </p>
      <p className="text-sm text-gray-500 not-prose mb-3">각 항목을 클릭해 세부 내용을 확인해보세요.</p>

      <div className="not-prose flex flex-col gap-2 mb-6">
        {ethicsIssues.map((issue, idx) => (
          <div key={issue.title}>
            <button
              onClick={() => setOpenIssue(openIssue === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openIssue === idx ? 'border-[#8a5ca8] bg-[#8a5ca8]/5' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{issue.icon}</span>
              <div className="flex-1">
                <span className="font-bold text-sm text-gray-800">{issue.title}</span>
                <p className="text-xs text-gray-500 mt-0.5">{issue.desc}</p>
              </div>
              <span className="text-gray-400 text-sm">{openIssue === idx ? '▲' : '▼'}</span>
            </button>
            {openIssue === idx && (
              <div className={`border-2 border-t-0 border-[#8a5ca8] rounded-b-xl px-4 py-4 ${issue.color}`}>
                <p className="text-xs font-bold text-gray-600 mb-1.5">유형</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {issue.types.map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white rounded-full border border-gray-200 text-gray-600">{t}</span>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-900 mb-2">
                  💡 {issue.fact}
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-800">
                  ✅ 대처법: {issue.solution}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 두 얼굴 카드 */}
      <h2>활동: 디지털 기술의 두 관점</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">같은 기술도 장단점이 있어요. 두 가지 관점에서 함께 살펴봐요.</p>
      <div className="not-prose flex flex-col gap-4 mb-6">
        {issues.map((issue, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{issue.icon}</span>
              <span className="font-bold text-gray-800">{issue.title}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-bold text-green-600 mb-1.5">장점</p>
                <ul className="space-y-1">
                  {issue.pros.map((p, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-1">
                      <span className="text-green-500 flex-shrink-0">+</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-red-500 mb-1.5">단점 / 위험</p>
                <ul className="space-y-1">
                  {issue.cons.map((c, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-1">
                      <span className="text-red-400 flex-shrink-0">−</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 인터넷 실명제 vs 익명성 */}
      <h2>토론: 인터넷 실명제 vs 익명성 보호</h2>
      <p>
        악성 댓글 문제의 해결책으로 <strong>인터넷 실명제</strong>가 제안되기도 해요.
        하지만 이에 대해 다양한 입장이 있습니다.
      </p>
      <div className="not-prose grid grid-cols-2 gap-3 mb-3">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-700 text-sm mb-2">실명제 찬성 입장</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 실명이면 무책임한 발언을 줄일 수 있다</li>
            <li>• 사이버 폭력 가해자를 특정하기 쉬워진다</li>
            <li>• 건전한 온라인 문화를 만들 수 있다</li>
          </ul>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="font-bold text-orange-700 text-sm mb-2">익명성 보호 입장</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• 개인 정보·프라이버시 침해 우려</li>
            <li>• 소수 의견·약자의 표현의 자유 위축</li>
            <li>• 내부 고발·사회 비판이 어려워짐</li>
          </ul>
        </div>
      </div>
      <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-6">
        💡 한국에서 인터넷 실명제는 헌법재판소의 위헌 결정(2012년)으로 폐지됐어요.
        지금은 전화번호·공동 인증서 등 다양한 본인 인증 제도가 활용되고 있습니다.
      </div>

      {/* 저작권과 카피레프트 */}
      <h2>저작권과 공유 저작권(카피레프트)</h2>
      <p>
        디지털 콘텐츠를 사용할 때는 반드시 저작권을 확인해야 해요.
      </p>
      <div className="not-prose grid grid-cols-1 gap-3 mb-4">
        {copyrightConcepts.map((c, idx) => (
          <button
            key={c.name}
            onClick={() => setOpenCopy(openCopy === idx ? null : idx)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              openCopy === idx ? 'border-[#8a5ca8] bg-[#8a5ca8]/5' : `${c.color} hover:border-gray-400`
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{c.icon}</span>
              <span className="font-bold text-sm text-gray-800">{c.name}</span>
            </div>
            <p className="text-xs text-gray-600">{c.desc}</p>
            {openCopy === idx && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-gray-700">{c.detail}</p>
                <div className="bg-white rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600">
                  📌 예시: {c.example}
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* 상황별 규칙 만들기 */}
      <h2>활동: 상황별 올바른 규칙 확인하기</h2>
      <div className="not-prose flex flex-col gap-3 mb-6">
        {scenarios.map((s, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">📍 {s.situation}</p>
            {!showAns[idx] ? (
              <button
                onClick={() => setShowAns(prev => ({ ...prev, [idx]: true }))}
                className="text-xs px-3 py-1.5 rounded-lg text-white font-semibold"
                style={{ backgroundColor: COLOR }}
              >
                규칙 확인하기
              </button>
            ) : (
              <div className="text-sm text-gray-600 bg-purple-50 rounded-lg p-3 border border-purple-100">
                💡 {s.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 나만의 규칙 */}
      <h2>나만의 디지털 윤리 규칙 만들기</h2>
      <div className="not-prose bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-4">
        <p className="text-sm text-gray-600 mb-1">내가 디지털 환경에서 지킬 규칙을 하나 만들어보세요.</p>
        <p className="text-xs text-gray-400 mb-3">사이버 폭력, 개인 정보 보호, 저작권, SNS 사용 등 어떤 주제든 좋아요.</p>
        <textarea
          value={myRule}
          onChange={e => setMyRule(e.target.value)}
          placeholder="예) 소셜 미디어에 친구 사진을 올리기 전 반드시 동의를 구한다."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:border-[#8a5ca8] mb-3"
          disabled={saved}
        />
        {!saved ? (
          <button
            onClick={() => setSaved(true)}
            disabled={!myRule.trim()}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              myRule.trim() ? 'text-white hover:opacity-90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            style={myRule.trim() ? { backgroundColor: COLOR } : {}}
          >
            규칙 저장하기
          </button>
        ) : (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-800">
            ✅ 나만의 디지털 윤리 규칙을 만들었어요! 디지털 생활에서 꼭 실천해봐요.
          </div>
        )}
      </div>

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m3l3-quiz-0"
        question="사이버 폭력(Cyberbullying)에 해당하지 않는 것은?"
        choices={[
          { label: '타인의 사진을 무단으로 SNS에 올린다', correct: false, explanation: '동의 없는 사진 게시는 초상권 침해이자 사이버 폭력에 해당해요.' },
          { label: '온라인에서 특정 학생을 집단적으로 따돌린다', correct: false, explanation: '온라인 왕따도 사이버 폭력의 한 형태입니다.' },
          { label: '내가 만든 디지털 작품을 SNS에 공유한다', correct: true, explanation: '맞아요! 자신의 창작물을 공유하는 것은 사이버 폭력이 아니에요.' },
          { label: '상대방을 비하하는 악성 댓글을 단다', correct: false, explanation: '악성 댓글은 가장 일반적인 사이버 폭력의 형태로, 법적 처벌을 받을 수 있어요.' },
        ]}
      />

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m3l3-quiz-1"
        question="저작권(Copyright)과 공유 저작권(Copyleft)에 대한 설명으로 옳은 것은?"
        choices={[
          { label: '저작권이 있는 음악은 학교에서 사용하면 무조건 괜찮다', correct: false, explanation: '교육 목적이라도 저작권자의 허락이 필요한 경우가 많아요. 항상 저작권을 확인해야 합니다.' },
          { label: '공유 저작권(카피레프트)은 저작물을 자유롭게 사용·수정할 수 있도록 허용한다', correct: true, explanation: '맞아요! 카피레프트(공유 저작권)는 창작물을 자유롭게 사용·수정·배포할 수 있도록 허용하는 개념이에요. Linux, 위키피디아가 대표적인 예예요.' },
          { label: '저작권과 공유 저작권은 같은 의미다', correct: false, explanation: '저작권은 창작자의 독점적 권리를 보호하고, 공유 저작권은 자유로운 사용을 허용해요. 반대 방향의 개념이에요.' },
          { label: '인터넷에서 찾은 이미지는 출처를 밝히면 자유롭게 사용할 수 있다', correct: false, explanation: '출처를 밝혀도 저작권자의 허락 없이 사용하면 저작권 침해가 될 수 있어요. CCL 조건을 확인해야 해요.' },
        ]}
      />

      <div className="rounded-xl p-4 mt-6 text-sm not-prose" style={{ backgroundColor: COLOR + '15' }}>
        <p className="font-bold mb-2" style={{ color: COLOR }}>이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 사이버 폭력 = 악성 댓글, 개인정보 공개, 온라인 왕따 등 → 법적 처벌 가능</li>
          <li>✅ 가짜 뉴스 = 공유 전 출처·날짜·다른 매체와 비교 확인 필수</li>
          <li>✅ 디지털 중독 = 스크린 타임 관리, 알림 끄기, 오프라인 활동 중요</li>
          <li>✅ 저작권 vs 카피레프트 = 보호 vs 자유 공유, 사용 전 확인 필요</li>
          <li>✅ 디지털 윤리 = 온라인에서도 오프라인과 동일한 책임과 예의 필요</li>
        </ul>
      </div>
    </article>
  )
}
