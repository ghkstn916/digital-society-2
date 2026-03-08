import { useState } from 'react'
import ChoiceQuiz from '../../components/interactive/ChoiceQuiz'
import SortCards from '../../components/interactive/SortCards'
import FlipReveal from '../../components/interactive/FlipReveal'

const COLOR = '#4f7c5a'

const sectors = [
  { icon: '🏥', name: '의료', past: 'X선 필름, 종이 진료 차트, 의사의 경험에 의존한 진단', present: 'AI가 의료 영상을 분석해 더 정확한 진단, 전자 의료 기록으로 어디서든 확인 가능' },
  { icon: '🏫', name: '교육', past: '칠판, 종이 교과서, 종이 가정통신문, 학원 직접 방문', present: '디지털 교과서, 온라인 수업, 가정통신문 앱, AI 맞춤형 학습' },
  { icon: '🌾', name: '농업', past: '사람이 직접 논밭을 돌아다니며 날씨·상태 확인', present: 'IoT 센서로 토양·온도·날씨를 원격 모니터링, 드론으로 농약 살포' },
  { icon: '🏪', name: '유통', past: '직원이 직접 계산하고 재고를 수작업으로 관리', present: '키오스크 주문, AI 재고 관리, 온라인 쇼핑·새벽 배송' },
  { icon: '⚖️', name: '법률', past: '변호사가 직접 법 조항·판례를 일일이 찾아야 함', present: '생성형 AI가 법 조항·판례 검색 대행, 변호사는 의뢰인 상담에 더 집중' },
  { icon: '🏦', name: '금융', past: '은행 창구 방문, 종이 통장 관리, 복잡한 대출 서류', present: '스마트폰 뱅킹, 간편 결제(카카오페이 등), AI 자산 관리 서비스' },
]

const kioskCases = [
  { label: '단순 주문 업무를 기계가 대신해 인건비를 절약한다', group: 'A' },
  { label: '손님이 줄 서지 않고 빠르게 주문할 수 있다', group: 'A' },
  { label: '24시간 운영이 가능해 야간에도 이용할 수 있다', group: 'A' },
  { label: '음료 선택 시간제한 때문에 어르신이 급하게 잘못 주문했다', group: 'B' },
  { label: '화면이 너무 높아 휠체어 이용자가 불편을 겪었다', group: 'B' },
  { label: '작은 글씨와 화면 빛 반사로 노안인 사람이 읽기 어렵다', group: 'B' },
]

const digitalDivideGroups = [
  { icon: '👴👵', label: '고령자', desc: '스마트폰·키오스크 등 디지털 기기 사용에 익숙하지 않아요.' },
  { icon: '💸', label: '저소득층', desc: '스마트 기기 구입이나 인터넷 요금 부담이 클 수 있어요.' },
  { icon: '🌏', label: '농어촌 주민', desc: '도시보다 디지털 인프라(5G, 초고속 인터넷)가 부족해요.' },
  { icon: '♿', label: '장애인', desc: '일반적인 디지털 기기가 장애 유형에 맞지 않는 경우가 많아요.' },
]

export default function Lesson1_2() {
  const [openSector, setOpenSector] = useState(null)
  const [solChoice, setSolChoice] = useState(null)

  return (
    <article className="prose">
      <h1 className="text-2xl font-black text-[#4f7c5a] mb-1">디지털 기술의 두 얼굴</h1>
      <p className="text-sm text-gray-400 mb-8">Module 1 · Lesson 2 · 15분</p>

      <div className="bg-[#4f7c5a]/10 rounded-xl p-4 mb-6 text-sm not-prose">
        <p className="font-bold text-[#4f7c5a] mb-2">이 레슨에서 배우는 것</p>
        <ul className="space-y-1 text-gray-700">
          <li>디지털 기술의 긍정적 영향과 부정적 영향을 구분해 설명한다.</li>
          <li>키오스크 사례를 통해 디지털 격차(Digital Divide)를 이해한다.</li>
          <li>디지털 격차의 취약 계층과 해결 방안을 생각해본다.</li>
          <li>기술로 인한 사회 문제를 다양한 관점에서 바라본다.</li>
        </ul>
      </div>

      <FlipReveal
        color={COLOR}
        prompt="편의점 키오스크 앞에서 할머니가 당황하고 계신다. 왜 그럴까? 이 상황에서 어떤 문제가 보이나?"
        reveal="시간제한, 작은 글씨, 높은 화면 위치, 화면 빛 반사 등이 어르신에게 장벽이 돼요. 디지털 기술은 어떤 사람에게는 편리하지만, 어떤 사람에게는 오히려 더 불편함을 줄 수 있습니다. 이것이 바로 디지털 격차예요."
      />

      {/* 긍정 vs 부정 */}
      <h2>디지털 기술이 가져온 변화</h2>
      <p>
        디지털 기술은 빠르게 발전하며 일상생활, 사회, 경제 등 다양한 분야에 활용되면서
        많은 긍정적 변화를 가져왔어요. 동시에 새로운 문제도 생겨났습니다.
      </p>
      <div className="not-prose grid grid-cols-2 gap-3 my-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="font-bold text-green-700 mb-2.5">긍정적 영향 ✅</p>
          <ul className="text-sm text-green-800 space-y-2">
            <li>🗺️ 교통량 분석으로 최단 경로 안내</li>
            <li>🎵 개인 취향 맞춤 콘텐츠 추천</li>
            <li>🚨 재난 상황 즉각 알림·대응</li>
            <li>🤝 시공간 제약 없는 소통·협업</li>
            <li>🤖 단순·반복 업무 자동화로 효율 증가</li>
            <li>📱 스마트폰으로 다양한 정보 접근</li>
            <li>🏥 원격 진료로 의료 접근성 향상</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="font-bold text-red-700 mb-2.5">부정적 영향 ⚠️</p>
          <ul className="text-sm text-red-800 space-y-2">
            <li>🔓 개인 정보 유출 위험 증가</li>
            <li>📋 저작권 침해 문제</li>
            <li>📵 디지털 격차 심화</li>
            <li>📰 가짜 뉴스 빠른 전파</li>
            <li>😔 사이버 폭력·악성 댓글</li>
            <li>📱 디지털 중독</li>
            <li>💼 자동화로 인한 일자리 감소</li>
          </ul>
        </div>
      </div>

      {/* 분야별 변화 */}
      <h2>분야별로 살펴보는 디지털 변화</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">분야를 클릭해 디지털 기술 도입 전후를 비교해봐요.</p>
      <div className="not-prose flex flex-col gap-2 mb-6">
        {sectors.map((s, idx) => (
          <div key={s.name}>
            <button
              onClick={() => setOpenSector(openSector === idx ? null : idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                openSector === idx ? 'border-[#4f7c5a] bg-[#4f7c5a]/5' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="font-bold text-sm text-gray-800">{s.name}</span>
              <span className="ml-auto text-gray-400 text-sm">{openSector === idx ? '▲' : '▼'}</span>
            </button>
            {openSector === idx && (
              <div className="border-2 border-t-0 border-[#4f7c5a] rounded-b-xl bg-white px-4 py-3 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-gray-500 mb-1">디지털 이전</p>
                  <p className="text-sm text-gray-700">{s.past}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-green-600 mb-1">디지털 이후</p>
                  <p className="text-sm text-gray-700">{s.present}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 디지털 격차 */}
      <h2>디지털 격차(Digital Divide)란?</h2>
      <p>
        <strong>디지털 격차(Digital Divide)</strong>는 디지털 기술을 사용할 수 있는 능력을 갖춘 사람과
        그렇지 않은 사람들 사이의 경제적·사회적 격차가 심화되는 현상이에요.
        단순히 기기가 있고 없고의 문제가 아니라, <strong>활용 능력의 차이</strong>로도 발생합니다.
      </p>
      <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm">
        <p className="font-bold text-amber-800 mb-1">💡 키오스크(Kiosk)란?</p>
        <p className="text-amber-900">공공장소에 설치된 무인 정보 단말기로, 음식 주문, 요금 정산, 민원 발급 등에 활용돼요. 편리하지만 디지털 취약 계층에게는 높은 장벽이 됩니다.</p>
      </div>

      {/* 디지털 격차 취약 계층 */}
      <h2>디지털 격차는 누구에게 더 심각할까?</h2>
      <div className="not-prose grid grid-cols-2 gap-3 mb-6">
        {digitalDivideGroups.map(g => (
          <div key={g.label} className="bg-white border border-gray-100 shadow-sm rounded-xl p-3">
            <div className="text-2xl mb-1">{g.icon}</div>
            <p className="font-bold text-sm text-gray-800 mb-1">{g.label}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{g.desc}</p>
          </div>
        ))}
      </div>

      {/* 키오스크 활동 */}
      <h2>활동: 키오스크 사례 분류하기</h2>
      <p className="text-sm text-gray-500 not-prose mb-3">
        다음 상황들이 편리한 점(A)인지, 디지털 격차로 인한 불편한 점(B)인지 분류해보세요.
      </p>
      <SortCards
        cards={kioskCases}
        groupA={{ label: '편리한 점', color: '#4f7c5a' }}
        groupB={{ label: '디지털 격차 문제', color: '#e05c5c' }}
      />

      {/* 해결 방안 */}
      <h2>디지털 격차, 어떻게 해결할 수 있을까?</h2>
      <p>기술로 인한 사회 문제를 해결하는 방법을 다양한 관점에서 생각해봐요.</p>
      <div className="not-prose flex flex-col gap-2 mb-4">
        {[
          { id: 'a', text: '어르신·장애인 대상 디지털 기기 무료 교육 프로그램을 운영한다.' },
          { id: 'b', text: '키오스크 옆에 도움을 주는 안내 직원을 배치한다.' },
          { id: 'c', text: '키오스크 설계 시 고령자·장애인 접근성(글자 크기, 화면 높이, 시간제한 완화 등)을 반드시 반영한다.' },
          { id: 'd', text: '기술을 사용해본 사람들의 피드백을 수집해 꾸준히 개선한다.' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setSolChoice(opt.id)}
            className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm mb-1 transition-all ${
              solChoice === opt.id ? 'border-[#4f7c5a] bg-[#4f7c5a]/10 text-[#3a5e43] font-medium' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
            }`}
          >
            {opt.text}
          </button>
        ))}
        {solChoice && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 mt-1">
            좋은 선택이에요! 정답은 하나가 아니에요. 디지털 격차는 <strong>교육, 설계 개선, 제도적 지원</strong> 등 여러 방향에서 함께 해결해야 합니다.
          </div>
        )}
      </div>

      <div className="not-prose bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-sm text-green-900">
        💡 <strong>디지털 포용(Digital Inclusion)</strong>이란? 모든 사람이 디지털 기술의 혜택을 받을 수 있도록 격차를 줄이는 노력이에요. 정부, 기업, 개인 모두가 함께 만들어가야 합니다.
      </div>

      <ChoiceQuiz
        color={COLOR}
        question="디지털 격차(Digital Divide)에 대한 설명으로 옳은 것은?"
        choices={[
          { label: '스마트폰의 가격 차이를 의미한다', correct: false, explanation: '디지털 격차는 기기 가격보다 활용 능력의 차이로 발생하는 사회적 문제예요.' },
          { label: '디지털 기술 활용 능력 차이로 인한 사회·경제적 격차', correct: true, explanation: '맞아요! 특히 고령자·저소득층·인프라 부족 지역에서 두드러집니다.' },
          { label: '디지털 기술이 발전하면 자연스럽게 없어진다', correct: false, explanation: '오히려 기술이 발전할수록 격차가 더 커질 수 있어요. 교육·제도적 지원이 필요합니다.' },
          { label: '선진국에서만 나타나는 현상이다', correct: false, explanation: '디지털 격차는 전 세계적으로, 국가 안에서도 계층 간에 나타나는 현상이에요.' },
        ]}
      />

      <ChoiceQuiz
        color={COLOR}
        question="다음 중 디지털 기술의 부정적 영향에 해당하지 않는 것은?"
        choices={[
          { label: '개인 정보 유출 위험이 증가한다', correct: false, explanation: '개인 정보 유출은 디지털 기술의 대표적인 부정적 영향이에요.' },
          { label: '가짜 뉴스가 빠르게 퍼질 수 있다', correct: false, explanation: '가짜 뉴스의 빠른 전파는 디지털 사회의 심각한 문제 중 하나예요.' },
          { label: '재난 상황에서 즉각적인 알림과 대응이 가능하다', correct: true, explanation: '맞아요! 재난 알림 시스템은 디지털 기술의 긍정적 활용 사례예요.' },
          { label: '디지털 기기에 과도하게 의존하는 중독이 생길 수 있다', correct: false, explanation: '디지털 중독은 디지털 기술의 부정적 영향이에요.' },
        ]}
      />

      <div className="bg-[#4f7c5a]/10 rounded-xl p-4 mt-8 text-sm not-prose">
        <p className="font-bold text-[#4f7c5a] mb-2">이번 레슨에서 배운 것</p>
        <ul className="space-y-1.5 text-gray-700">
          <li>✅ 디지털 기술 = 긍정적 변화(편리함, 효율) + 부정적 문제(격차, 유출, 중독) 동시 발생</li>
          <li>✅ 의료·교육·농업·유통·법률·금융 모든 분야에서 디지털 기술이 변화를 가져옴</li>
          <li>✅ 디지털 격차 = 기술 활용 능력 차이로 인한 경제·사회적 불평등</li>
          <li>✅ 취약 계층: 고령자, 저소득층, 농어촌 주민, 장애인</li>
          <li>✅ 해결책: 교육 지원 + 접근성 개선 + 사용자 피드백 반영</li>
        </ul>
      </div>
    </article>
  )
}
