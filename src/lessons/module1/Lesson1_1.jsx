import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import FlipReveal from '../../components/interactive/FlipReveal'
import { usePersistentState } from '../../hooks/usePersistentState'

const COLOR = '#4f7c5a'

const societies = [
  {
    era: '농경 사회',
    icon: '🌾',
    key: '땅과 식량',
    desc: '자연에서 식량을 얻고, 토지가 핵심 자원이었어요. 정보는 주로 입에서 입으로 전달됐고, 생산·유통 속도가 매우 느렸습니다.',
    tech: '쟁기, 관개 시설, 수레',
    power: '토지 소유자, 지주',
    flipIcon: '🤖🌾',
    flipTitle: '스마트 농업으로 변화',
    flipDesc: 'IoT 센서가 토양·온도·습도를 실시간 모니터링하고, 드론으로 농약을 살포해요. GPS 기반 자율주행 트랙터로 넓은 농장을 혼자서도 관리할 수 있어요.',
    flipTech: 'IoT, 드론, AI, 빅데이터',
  },
  {
    era: '산업 사회',
    icon: '🏭',
    key: '기계와 생산',
    desc: '18세기 증기기관·전기 발명 이후 공장에서 대량 생산이 시작됐어요. 노동력과 기계가 핵심 자원이고, 도시화가 급속도로 진행됐습니다.',
    tech: '증기기관, 전기, 자동차, 라디오',
    power: '자본가, 기업',
    flipIcon: '🤖🏭',
    flipTitle: '스마트 팩토리로 변화',
    flipDesc: 'AI 로봇이 생산 라인을 24시간 자동화하고, 디지털 트윈으로 공장 전체를 가상 시뮬레이션해요. 실시간 데이터로 불량품을 즉시 감지합니다.',
    flipTech: 'AI, 로봇, 디지털 트윈, IoT',
  },
  {
    era: '디지털 사회',
    icon: '💻',
    key: '데이터와 연결',
    desc: '컴퓨터와 인터넷이 중심이에요. 데이터와 정보가 핵심 자원이고, 모든 것이 연결됩니다. 물리적 거리 없이도 전 세계와 소통·협업이 가능해요.',
    tech: '인터넷, 스마트폰, AI, IoT, 클라우드',
    power: '정보·기술 보유자, 플랫폼 기업',
    flipIcon: '🚀',
    flipTitle: '앞으로는?',
    flipDesc: '디지털 사회는 계속 진화 중이에요. AI, 메타버스, 양자 컴퓨팅 등 새로운 기술이 또 다른 혁명을 만들어가고 있습니다. 우리는 그 변화의 한가운데 있어요.',
    flipTech: 'AI, 메타버스, 양자 컴퓨팅, 로봇',
  },
]

const characteristics = [
  {
    title: '온·오프라인 경계가 사라진다',
    icon: '🔗',
    examples: [
      '편의점 키오스크로 현장에서 바로 주문·결제',
      '온라인 수업으로 집에서도 학교 수업 참여',
      '배달 앱으로 음식 주문, 택배 실시간 추적',
      '스마트폰으로 은행 업무, 관공서 증명서 발급',
    ],
    desc: '현실 세계와 디지털 세계의 경계가 점점 없어지고 있어요. 물건을 직접 사지 않아도 되고, 멀리 이동하지 않아도 많은 일을 처리할 수 있어요.',
  },
  {
    title: '사람과 사물이 네트워크로 연결된다 (IoT)',
    icon: '📡',
    examples: [
      '스마트 냉장고가 유통기한 임박 식품을 알려줌',
      '스마트 농장이 토양·온도·습도를 자동 모니터링',
      '커넥티드 카가 신호등·다른 차량과 통신',
      '스마트워치가 심박수·수면 패턴을 분석해 건강 알림',
    ],
    desc: '사물 인터넷(IoT, Internet of Things)으로 모든 것이 인터넷에 연결돼 서로 데이터를 주고받아요. 사람이 직접 확인하지 않아도 기기끼리 알아서 소통합니다.',
  },
  {
    title: '빅데이터가 생성되고 분석에 활용된다',
    icon: '📊',
    examples: [
      '유튜브 시청 기록 → 맞춤 영상 추천',
      '쇼핑 구매 기록 → 관심 상품 광고 노출',
      '이동 경로 데이터 → 교통 흐름 분석·예측',
      '날씨·재난 데이터 → 재해 발생 예측 및 대응',
    ],
    desc: '우리의 모든 디지털 행동이 데이터가 돼요. 이 방대한 빅데이터를 AI가 분석해 새로운 가치를 만들어냅니다.',
  },
]

const techExamples = [
  { icon: '🗺️', name: '내비게이션', desc: '단순 경로 안내를 넘어 실시간 교통량을 분석해 최단 시간 경로를 알려줍니다.' },
  { icon: '🎵', name: '스트리밍 플랫폼', desc: '사용자의 취향·패턴을 분석해 맞춤형 음악·영상을 추천해요.' },
  { icon: '🚨', name: '재난 알림 문자', desc: '감염병, 지진, 장마 등 위기 상황에서 국민에게 즉각 정보를 전달합니다.' },
  { icon: '☁️', name: '클라우드 서비스', desc: '파일을 온라인에 저장해 어디서든 접근하고 친구와 공유할 수 있어요.' },
  { icon: '🤖', name: '생성형 AI', desc: '문자·이미지·코드를 자동으로 생성해주는 AI. ChatGPT, 코파일럿 등이 대표적이에요.' },
  { icon: '🏥', name: 'AI 의료 진단', desc: 'AI가 X레이·MRI 영상을 분석해 암 등을 조기 발견하고 의사의 진단을 지원해요.' },
]

const digitalScenarios = [
  { situation: '스마트폰으로 학교 알림장을 받아본다', isDigital: true },
  { situation: '도서관에서 종이책을 빌린다', isDigital: false },
  { situation: '온라인으로 급식 메뉴를 미리 확인한다', isDigital: true },
  { situation: '칠판에 분필로 글씨를 쓴다', isDigital: false },
  { situation: 'AI 번역 앱으로 영어 문장을 해석한다', isDigital: true },
  { situation: '공책에 손으로 일기를 쓴다', isDigital: false },
]

export default function Lesson1_1() {
  const [flippedCards, setFlippedCards] = usePersistentState('dc-m1l1-flipped', {})
  const [openChar, setOpenChar] = useState(null)
  const [scenarioAnswers, setScenarioAnswers] = usePersistentState('dc-m1l1-scenarios', {})
  const [showScenario, setShowScenario] = usePersistentState('dc-m1l1-showscenario', false)

  return (
    <article className="prose">
      <h1 className="text-2xl font-black text-[#4f7c5a] mb-1">디지털 사회란 무엇인가?</h1>
      <p className="text-sm text-gray-400 mb-8">Module 1 · Lesson 1 · 15분</p>

      <div className="bg-[#4f7c5a]/10 rounded-xl p-4 mb-6 text-sm not-prose">
        <p className="font-bold text-[#4f7c5a] mb-2">이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>디지털 기술의 정의를 설명할 수 있다.</li>
          <li>농경 → 산업 → 디지털 사회의 변화 흐름을 이해한다.</li>
          <li>디지털 사회의 특성 3가지(온오프라인 융합, IoT, 빅데이터)를 사례로 설명한다.</li>
          <li>일상 속 디지털 기술의 사례를 구분할 수 있다.</li>
        </ul>
      </div>

      <FlipReveal
        color={COLOR}
        storageKey="dc-m1l1-flip-0"
        prompt="2050년이 되면 자동차는 어떻게 변해 있을까? 지금 자동차와 무엇이 다를까?"
        reveal={`교과서 속 2050년 뉴스 내용: "지난 1년간 교통사고가 거의 없었습니다. 커넥티드 카(Connected Car)에 탑재된 센서가 주변 위험을 자동 감지하고, 졸음을 체크해 실내를 환기하거나 자율주행으로 전환합니다. 운전자의 사용 패턴을 분석해 더 나은 서비스도 제공합니다." 이미 자율주행 기술이 빠르게 개발되고 있어요!`}
      />

      <h2>디지털 기술이란?</h2>
      <p>
        <strong>디지털(Digital)</strong>이란 정보를 <strong>0과 1의 이진수</strong>로 표현하는 방식이에요.
        컴퓨터, 스마트폰, 인터넷이 모두 0과 1로 이루어진 데이터를 주고받습니다.
      </p>
      <p>
        <strong>디지털 기술(Digital Technology)</strong>은 이 이진 데이터를 처리·저장·전송하는 모든 기술을 말해요.
        단순히 컴퓨터를 사용하는 것을 넘어, 우리의 일상 거의 모든 부분에 디지털 기술이 스며들어 있습니다.
      </p>

      <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm text-amber-900">
        💡 <strong>아날로그 vs 디지털</strong>: 아날로그는 연속적인 값(예: 바늘시계, 레코드판), 디지털은 0과 1로 끊어진 값(예: 디지털 시계, MP3)이에요. 디지털 데이터는 복사해도 품질이 떨어지지 않아요.
      </div>

      {/* 디지털 기술 사례 */}
      <h2>일상 속 디지털 기술 사례</h2>
      <div className="not-prose grid grid-cols-2 gap-3 my-4">
        {techExamples.map(item => (
          <div key={item.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-3">
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="font-bold text-sm text-gray-800 mb-0.5">{item.name}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 사회 변화 */}
      <h2>시대에 따라 사회는 어떻게 변해왔을까?</h2>
      <p>
        인류 사회는 핵심 자원과 기술에 따라 크게 세 단계로 발전해왔어요.
        카드를 눌러서 디지털 사회에서 어떻게 변화했는지 확인해보세요.
      </p>
      <div className="not-prose flex flex-col gap-3 my-4">
        {societies.map((s, idx) => (
          <button
            key={s.era}
            onClick={() => setFlippedCards(prev => ({ ...prev, [idx]: !prev[idx] }))}
            className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
              flippedCards[idx]
                ? 'border-[#4f7c5a] bg-[#4f7c5a]/10'
                : 'border-gray-200 bg-white hover:border-[#4f7c5a]/50'
            }`}
          >
            {!flippedCards[idx] ? (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{s.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{s.era}</p>
                    <p className="text-xs text-gray-500">핵심 가치: {s.key}</p>
                  </div>
                  <span className="text-xs text-[#4f7c5a] font-medium whitespace-nowrap">눌러서 변화 보기 →</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{s.desc}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="font-bold text-gray-500 mb-1">주요 기술</p>
                    <p className="text-gray-700">{s.tech}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="font-bold text-gray-500 mb-1">핵심 권력</p>
                    <p className="text-gray-700">{s.power}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{s.flipIcon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-[#4f7c5a]">디지털 사회에서는?</p>
                    <p className="text-sm font-bold text-gray-800">{s.flipTitle}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">← 돌아가기</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{s.flipDesc}</p>
                <div className="bg-white rounded-lg p-2 text-xs text-gray-500">
                  활용 기술: <span className="font-medium text-gray-700">{s.flipTech}</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-3 mb-6 text-sm text-green-900">
        📌 <strong>정보화 사회</strong>란? 디지털 사회는 <strong>정보(데이터)</strong>가 가장 중요한 자원이 되는 사회예요.
        과거에는 땅이나 기계를 많이 가진 사람이 힘을 가졌다면, 지금은 <strong>데이터와 기술</strong>을 가진 사람·기업이 더 큰 영향력을 가집니다.
      </div>

      {/* 디지털 사회 특성 */}
      <h2>디지털 사회의 3가지 특성</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">각 특성을 클릭해 개념 설명과 실생활 사례를 확인해보세요.</p>
      <div className="not-prose flex flex-col gap-2 my-4">
        {characteristics.map((c, idx) => (
          <div key={c.title}>
            <button
              onClick={() => setOpenChar(openChar === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openChar === idx ? 'border-[#4f7c5a] bg-[#4f7c5a]/5' : 'border-gray-200 bg-white hover:border-[#4f7c5a]/50'
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-800">{c.title}</p>
              </div>
              <span className="text-gray-400 text-sm">{openChar === idx ? '▲' : '▼'}</span>
            </button>
            {openChar === idx && (
              <div className="border-2 border-t-0 border-[#4f7c5a] rounded-b-xl bg-white px-4 py-3">
                <p className="text-sm text-gray-600 mb-3">{c.desc}</p>
                <p className="text-xs font-bold text-[#4f7c5a] mb-1.5">실생활 사례</p>
                <ul className="space-y-1">
                  {c.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-gray-600 flex gap-1.5">
                      <span className="text-[#4f7c5a] flex-shrink-0">•</span>{ex}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 활동: 디지털 기술인지 판단하기 */}
      <h2>활동: 디지털 기술인가, 아닌가?</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">
        다음 상황이 디지털 기술을 활용한 것인지 판단해보세요. 선택 후 정답을 확인하세요.
      </p>
      <div className="not-prose flex flex-col gap-3 mb-4">
        {digitalScenarios.map((s, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-sm text-gray-700 mb-2">{s.situation}</p>
            <div className="flex gap-2">
              {['디지털 기술 ✓', '아날로그 ✓'].map((opt, oi) => {
                const chosen = scenarioAnswers[idx]
                const isThis = oi === 0 ? 'digital' : 'analog'
                return (
                  <button
                    key={opt}
                    onClick={() => setScenarioAnswers(prev => ({ ...prev, [idx]: isThis }))}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                      chosen === isThis ? 'text-white border-transparent' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                    style={chosen === isThis ? { backgroundColor: COLOR } : {}}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            {showScenario && scenarioAnswers[idx] && (
              <div className={`mt-2 text-xs px-3 py-1.5 rounded-lg ${
                (scenarioAnswers[idx] === 'digital') === s.isDigital ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {(scenarioAnswers[idx] === 'digital') === s.isDigital ? '✅' : '❌'} 정답: {s.isDigital ? '디지털 기술 활용' : '아날로그 방식'}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => setShowScenario(true)}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white w-fit"
          style={{ backgroundColor: COLOR }}
        >
          정답 확인
        </button>
      </div>

      {/* 디지털 사회의 모습 */}
      <h2>디지털 사회는 어떤 모습일까?</h2>
      <p>
        오늘날 우리는 스마트폰으로 점심 메뉴를 확인하고, 클라우드로 친구와 데이터를 공유하며,
        AI 추천 서비스로 좋아할 만한 콘텐츠를 바로 만나요.
        로봇이 음식을 서빙하고, 의사는 AI가 분석한 의료 데이터를 바탕으로 더 정확한 진단을 내립니다.
      </p>
      <p>
        이처럼 디지털 기술은 단순히 편의를 높이는 것을 넘어, <strong>우리의 삶의 방식과 사회 구조 자체를 바꾸고</strong> 있어요.
      </p>
      <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-4 my-4 text-sm text-blue-800">
        <p className="font-bold mb-1">🔑 핵심 정리</p>
        <p><strong>디지털 사회</strong> = 디지털 기술이 개인과 사회 전반의 모든 영역에 영향을 미치는 사회</p>
      </div>

      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m1l1-quiz-0"
        question="다음 중 디지털 사회의 특성으로 옳지 않은 것은?"
        choices={[
          { label: '온·오프라인 경계가 점점 사라진다', correct: false, explanation: '이것은 디지털 사회의 대표적 특성이에요.' },
          { label: '사람과 사물이 네트워크(IoT)로 연결된다', correct: false, explanation: 'IoT는 디지털 사회의 핵심 특성입니다.' },
          { label: '정보가 오직 종이 문서로만 저장된다', correct: true, explanation: '디지털 사회에서는 정보가 디지털 형식으로 저장·처리돼요. 종이 문서만 사용하는 것은 산업·농경 시대의 방식에 가깝습니다.' },
          { label: '빅데이터가 생성되고 분석에 활용된다', correct: false, explanation: '빅데이터 생성과 활용은 디지털 사회의 중요한 특성이에요.' },
        ]}
      />
      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m1l1-quiz-1"
        question="내비게이션이 실시간 교통량을 분석해 최단 경로를 안내하는 것과 가장 관련 깊은 것은?"
        choices={[
          { label: '농경 기술', correct: false, explanation: '농경 기술은 식량 생산과 관련 있어요.' },
          { label: '디지털 기술과 빅데이터 분석', correct: true, explanation: '실시간 교통 데이터를 수집·분석해 최적 경로를 제공하는 것은 디지털 기술과 빅데이터의 활용 사례입니다!' },
          { label: '산업 기계 기술', correct: false, explanation: '산업 기계 기술은 제조·생산과 관련 있어요.' },
          { label: '아날로그 통신 기술', correct: false, explanation: '아날로그는 디지털의 반대 개념이에요. 실시간 데이터 분석은 디지털 기술이 필요합니다.' },
        ]}
      />
      <ChoiceQuiz
        color={COLOR}
        storageKey="dc-m1l1-quiz-2"
        question="스마트 냉장고가 유통기한 임박 식품을 알림으로 알려주는 것은 디지털 사회의 어떤 특성과 가장 관련이 있는가?"
        choices={[
          { label: '빅데이터 분석', correct: false, explanation: '방대한 데이터 분석은 빅데이터 특성이지만, 이 사례는 기기 간 연결이 핵심이에요.' },
          { label: '사물 인터넷(IoT)', correct: true, explanation: '맞아요! 냉장고(사물)가 인터넷에 연결돼 사용자와 소통하는 것이 IoT의 대표적 사례입니다.' },
          { label: '온·오프라인 경계 소멸', correct: false, explanation: '이 특성은 현실 공간과 디지털 공간의 융합에 관한 것이에요.' },
          { label: '클라우드 서비스', correct: false, explanation: '클라우드는 데이터를 온라인으로 저장·공유하는 것이에요.' },
        ]}
      />

      <div className="bg-[#4f7c5a]/10 rounded-xl p-4 mt-8 text-sm not-prose">
        <p className="font-bold text-[#4f7c5a] mb-2">이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 디지털 = 0과 1로 정보를 표현하는 방식, 디지털 기술 = 이를 처리·전송하는 기술</li>
          <li>✅ 농경 → 산업 → 디지털 사회 순서로 발전, 핵심 가치가 달라짐</li>
          <li>✅ 디지털 사회 3대 특성: ① 온오프라인 융합 ② IoT 연결 ③ 빅데이터 생성</li>
          <li>✅ 내비게이션, AI, 스마트워치 등이 디지털 기술의 실생활 사례</li>
        </ul>
      </div>
    </article>
  )
}
